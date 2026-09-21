import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import Stripe from "stripe";
import { SITE_URL } from "@/lib/site-config";
import { MENU } from "@/components/crown/menu-data";

import { SALES_TAX_RATE } from "@/lib/constants";

const prisma = new PrismaClient();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_dummy", {
  apiVersion: "2024-12-18.acacia",
});

export async function POST(req: NextRequest) {
  try {
    const { items } = await req.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    const validatedItems = [];
    let subtotal = 0;

    for (const item of items) {
      const menuItem = MENU.find((m) => m.id === item.menuItemId);
      if (!menuItem) {
        return NextResponse.json({ error: `Item not found: ${item.menuItemId}` }, { status: 400 });
      }

      let price = 0;
      if (menuItem.tiers) {
        const tier = menuItem.tiers.find((t) => t.qty === item.tierLabel);
        if (tier) price = parseFloat(tier.price.replace(/[^0-9.-]+/g, ""));
      } else if (menuItem.single) {
        const single = menuItem.single.find((s) => s.label === item.tierLabel);
        if (single) price = parseFloat(single.price.replace(/[^0-9.-]+/g, ""));
      }

      if (price === 0) {
        return NextResponse.json({ error: `Invalid tier/price for item: ${item.name}` }, { status: 400 });
      }

      validatedItems.push({
        ...item,
        price,
      });
      subtotal += price * item.qty;
    }

    const total = subtotal + subtotal * SALES_TAX_RATE;

    const order = await prisma.order.create({
      data: {
        total,
        items: {
          create: validatedItems.map((item: any) => ({
            menuItemId: item.menuItemId,
            name: item.name,
            tierLabel: item.tierLabel,
            price: item.price,
            qty: item.qty,
            image: item.image,
          })),
        },
      },
    });

    if (process.env.STRIPE_SECRET_KEY) {
      const lineItems = validatedItems.map((item: any) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: `${item.name} (${item.tierLabel})`,
            images: item.image ? [new URL(item.image, SITE_URL).toString()] : [],
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.qty,
      }));

      // Add tax as a separate line item if you want, or better:
      // Stripe handles tax natively but for this we'll add a generic tax item to match exactly
      if (SALES_TAX_RATE > 0) {
          lineItems.push({
              price_data: {
                  currency: "usd",
                  product_data: { name: "Sales Tax (8.875%)" },
                  unit_amount: Math.round((subtotal * SALES_TAX_RATE) * 100),
              },
              quantity: 1,
          })
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "payment",
        success_url: `${SITE_URL}/order/${order.id}?success=true`,
        cancel_url: `${SITE_URL}/`,
        metadata: {
          orderId: order.id,
        },
      });

      await prisma.order.update({
        where: { id: order.id },
        data: { stripeSession: session.id },
      });

      return NextResponse.json({ url: session.url });
    } else {
      // Mock mode
      await prisma.order.update({
        where: { id: order.id },
        data: { status: "PAID" },
      });
      return NextResponse.json({ url: `/order/${order.id}` });
    }
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
