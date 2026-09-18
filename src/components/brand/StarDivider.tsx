import { cn } from "@/lib/utils";
import { CrownMini } from "./CrownIcon";

interface StarDividerProps {
  className?: string;
  stars?: number;
  withLines?: boolean;
  withCrowns?: boolean;
  lineLength?: string;
}

/**
 * Reproduces the menu's "★ CROWN ★" divider motif:
 *   ─────  ★ ★ ★  ─────
 * Optionally flanked with tiny crowns instead of stars.
 */
export function StarDivider({
  className,
  stars = 3,
  withLines = true,
  withCrowns = false,
}: StarDividerProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center gap-3 text-[var(--white)]/70",
        className,
      )}
      aria-hidden="true"
    >
      {withLines && (
        <span className="h-px w-12 bg-[var(--white)]/30 sm:w-20" />
      )}
      {withCrowns && <CrownMini className="h-3.5 w-3.5 text-[var(--white)]" />}
      {Array.from({ length: stars }).map((_, i) => (
        <span
          key={i}
          className={cn(
            "text-base leading-none",
            i === Math.floor(stars / 2)
              ? "text-[var(--red)]"
              : "text-[var(--white)]/80",
          )}
        >
          ★
        </span>
      ))}
      {withCrowns && <CrownMini className="h-3.5 w-3.5 text-[var(--white)]" />}
      {withLines && <span className="h-px w-12 bg-[var(--white)]/30 sm:w-20" />}
    </div>
  );
}
