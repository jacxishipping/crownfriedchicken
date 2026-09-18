import { cn } from "@/lib/utils";

interface BrushStrokeProps {
  children?: React.ReactNode;
  className?: string;
  /** Tilt the brush stroke a few degrees — feels more hand-painted. */
  tilt?: number;
  /** How aggressively the brush fills the wrap. */
  padding?: string;
  /** Use the bright red instead of the standard brand red. */
  bright?: boolean;
  /** Render the brush as a positioned background instead of inline wrapper. */
  as?: "span" | "div";
  /** Brush-stroke variant — "default" is the menu's compact stroke, "wide" is a more dramatic low/wide stroke for big section labels. */
  variant?: "default" | "wide";
}

/**
 * Recreates the menu's rough red brush-stroke behind labels.
 * Uses an SVG mask on a solid red block, with subtle rotation and uneven
 * padding to feel hand-painted rather than a clean rectangle.
 */
export function BrushStroke({
  children,
  className,
  tilt = -1.5,
  padding = "px-7 py-2",
  bright = false,
  as: Tag = "span",
  variant = "default",
}: BrushStrokeProps) {
  return (
    <Tag
      className={cn(
        "relative inline-flex items-center justify-center",
        variant === "wide" ? "brush-red-wide" : "brush-red",
        padding,
        className,
      )}
      style={{
        // The brush is the mask; the colored layer sits behind, slightly larger
        backgroundColor: bright ? "var(--red-bright)" : "var(--red)",
        transform: `rotate(${tilt}deg)`,
        // give the mask some breathing room so edges look rough
        // not clipped by parent
        // Allow children to render on top regardless of rotation
      }}
    >
      <span
        className="relative z-10 inline-flex items-center"
        style={{ transform: `rotate(${-tilt}deg)` }}
      >
        {children}
      </span>
    </Tag>
  );
}
