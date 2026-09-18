"use client";

import { cn } from "@/lib/utils";

interface MarqueeProps {
  items: React.ReactNode[];
  speed?: "slow" | "normal" | "fast";
  className?: string;
  separator?: React.ReactNode;
  direction?: "left" | "right";
}

/**
 * Infinite horizontal marquee — used for the order strip and footer ticker.
 * Uses two copies of the children to make a seamless loop.
 */
export function Marquee({
  items,
  speed = "normal",
  className,
  separator = (
    <span className="mx-6 inline-block h-1.5 w-1.5 rounded-full bg-[var(--red)]" />
  ),
  direction = "left",
}: MarqueeProps) {
  const durationMap = { slow: "40s", normal: "28s", fast: "18s" };

  const Row = () => (
    <div className="flex shrink-0 items-center">
      {items.map((item, i) => (
        <span key={i} className="flex shrink-0 items-center">
          <span className="whitespace-nowrap">{item}</span>
          {separator}
        </span>
      ))}
    </div>
  );

  return (
    <div className={cn("relative w-full overflow-hidden", className)}>
      <div
        className="flex w-max animate-marquee items-center"
        style={{
          animationDirection: direction === "right" ? "reverse" : "normal",
          animationDuration: durationMap[speed],
        }}
      >
        <Row />
        <Row />
      </div>
    </div>
  );
}
