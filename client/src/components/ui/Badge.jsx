import clsx from "clsx"

const VARIANTS = {
  brand: "bg-brand-100 text-brand-700",
  accent: "bg-accent-500/15 text-accent-600",
  white: "bg-white/15 text-white",
}

export const Badge = ({ variant = "brand", className, children }) => (
  <span
    className={clsx(
      "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide",
      VARIANTS[variant],
      className
    )}
  >
    {children}
  </span>
)
