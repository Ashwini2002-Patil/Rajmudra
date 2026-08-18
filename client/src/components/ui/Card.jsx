import clsx from "clsx"

// Lightweight shadcn-style Card primitive, built on the site's own Tailwind
// tokens (brand = navy, accent = gold) instead of pulling in a separate
// component library.
export const Card = ({ className, children, ...rest }) => (
  <div
    className={clsx(
      "rounded-2xl border border-brand-100 bg-white shadow-sm shadow-brand-900/5",
      className
    )}
    {...rest}
  >
    {children}
  </div>
)

export const CardHeader = ({ className, children, ...rest }) => (
  <div className={clsx("border-b border-brand-100 px-6 py-4", className)} {...rest}>
    {children}
  </div>
)

export const CardBody = ({ className, children, ...rest }) => (
  <div className={clsx("p-6", className)} {...rest}>
    {children}
  </div>
)
