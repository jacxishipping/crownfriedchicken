import { notFound } from "next/navigation";
import { PrismaClient } from "@prisma/client";
import { CrownIcon } from "@/components/brand/CrownIcon";
import { BrandButton } from "@/components/brand/BrandButton";
import Link from "next/link";
import { SALES_TAX_RATE } from "@/lib/constants";

const prisma = new PrismaClient();

const STATUS_MAP: Record<string, { label: string; description: string; progress: number }> = {
  PENDING: { label: "Pending", description: "Waiting for payment...", progress: 10 },
  PAID: { label: "Confirmed", description: "Your order has been received.", progress: 30 },
  PREPARING: { label: "Preparing", description: "We are preparing your feast.", progress: 60 },
  READY: { label: "Ready", description: "Your order is ready for pickup!", progress: 100 },
  DELIVERED: { label: "Delivered", description: "Enjoy your royal meal!", progress: 100 },
};

const fmt = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD" });

export default async function OrderPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const order = await prisma.order.findUnique({
    where: { id },
    include: { items: true },
  });

  if (!order) {
    return notFound();
  }

  const statusInfo = STATUS_MAP[order.status] || STATUS_MAP.PENDING;
  const subtotal = order.items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const tax = subtotal * SALES_TAX_RATE;

  return (
    <main className="min-h-screen bg-[var(--black)] pt-24 pb-12">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex justify-center mb-6">
            <CrownIcon className="h-10 w-10 text-[var(--red)]" />
          </Link>
          <h1 className="font-display text-4xl uppercase tracking-[0.08em] text-[var(--white)]">
            Order Status
          </h1>
          <p className="mt-2 text-[var(--white)]/60 font-mono text-sm">
            Order #{order.id.slice(-8).toUpperCase()}
          </p>
        </div>

        {/* Status Card */}
        <div className="mb-8 border border-[var(--border-soft)] bg-[var(--surface)] p-6 md:p-8">
          <div className="text-center">
            <h2 className="font-display text-2xl uppercase tracking-[0.08em] text-[var(--food-gold)]">
              {statusInfo.label}
            </h2>
            <p className="mt-2 text-sm text-[var(--white)]/70">{statusInfo.description}</p>
          </div>

          <div className="mt-8 relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-[var(--red)] bg-[var(--red)]/10">
                  Progress
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold inline-block text-[var(--red)]">
                  {statusInfo.progress}%
                </span>
              </div>
            </div>
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-[var(--border-soft)]">
              <div
                style={{ width: `${statusInfo.progress}%` }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-[var(--red)] transition-all duration-1000"
              />
            </div>
          </div>
        </div>

        {/* Order Details */}
        <div className="border border-[var(--border-soft)] bg-[var(--surface)] p-6 md:p-8">
          <h3 className="mb-6 font-display text-lg uppercase tracking-[0.08em] text-[var(--white)] border-b border-[var(--border-soft)] pb-4">
            Order Details
          </h3>
          <ul className="space-y-4 mb-6">
            {order.items.map((item) => (
              <li key={item.id} className="flex justify-between items-center gap-4">
                <div className="flex items-center gap-4">
                  {item.image && (
                    <div className="relative h-12 w-12 shrink-0 overflow-hidden bg-black rounded-sm hidden sm:block">
                      <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                    </div>
                  )}
                  <div>
                    <p className="font-display text-sm uppercase text-[var(--white)]">
                      {item.qty}x {item.name}
                    </p>
                    <p className="text-xs text-[var(--white)]/55 uppercase tracking-[0.1em]">
                      {item.tierLabel}
                    </p>
                  </div>
                </div>
                <div className="font-mono text-sm text-[var(--white)]">
                  {fmt(item.price * item.qty)}
                </div>
              </li>
            ))}
          </ul>

          <dl className="space-y-2 text-sm border-t border-[var(--border-soft)] pt-4">
            <div className="flex items-center justify-between">
              <dt className="text-[var(--white)]/60">Subtotal</dt>
              <dd className="font-display text-[var(--white)]">{fmt(subtotal)}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-[var(--white)]/60">Tax</dt>
              <dd className="font-display text-[var(--white)]">{fmt(tax)}</dd>
            </div>
            <div className="flex items-center justify-between border-t border-[var(--border-soft)] pt-3 mt-3">
              <dt className="font-display text-base uppercase tracking-[0.1em] text-[var(--white)]">
                Total
              </dt>
              <dd className="font-display text-xl text-[var(--red)]">{fmt(order.total)}</dd>
            </div>
          </dl>
        </div>

        <div className="mt-8 text-center">
            <BrandButton href="/" variant="outline" size="md">
                Return to Menu
            </BrandButton>
        </div>
      </div>
    </main>
  );
}
