import { cn } from "@/lib/utils";

interface CrownIconProps extends React.SVGProps<SVGSVGElement> {
  variant?: "filled" | "outline";
  /** When true, draws crown in currentColor (so you can color via Tailwind text-*). */
  filled?: boolean;
}

/**
 * Inline SVG crown — bold, slightly street-art inspired.
 * Uses currentColor so it inherits text color, with optional outline mode.
 */
export function CrownIcon({
  className,
  filled = true,
  variant,
  ...props
}: CrownIconProps) {
  const useOutline = variant === "outline" || (!filled && !variant);
  return (
    <svg
      viewBox="0 0 100 80"
      className={cn("inline-block", className)}
      fill={useOutline ? "none" : "currentColor"}
      stroke={useOutline ? "currentColor" : "none"}
      strokeWidth={useOutline ? 3 : 0}
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M6 22 L24 36 L34 8 L42 28 L50 4 L58 28 L66 8 L76 36 L94 22 L86 70 L14 70 Z" />
      {!useOutline && (
        <>
          <circle cx="50" cy="22" r="3.4" fill="#050505" />
          <circle cx="26" cy="50" r="3.2" fill="#050505" />
          <circle cx="74" cy="50" r="3.2" fill="#050505" />
        </>
      )}
      <rect
        x="14"
        y="70"
        width="72"
        height="6"
        fill={useOutline ? "none" : "currentColor"}
        stroke={useOutline ? "currentColor" : "none"}
        strokeWidth={useOutline ? 3 : 0}
      />
    </svg>
  );
}

/** Tiny crown for inline decorative use (e.g. next to headings). */
export function CrownMini({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={cn("inline-block", className)}
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path d="M4 18 L9 11 L13 16 L16 8 L19 16 L23 11 L28 18 L25 26 L7 26 Z" />
      <rect x="7" y="26" width="18" height="2.4" />
      <circle cx="16" cy="14" r="1.4" fill="#050505" />
    </svg>
  );
}
