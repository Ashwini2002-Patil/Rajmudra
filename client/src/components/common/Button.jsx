import { Link } from "react-router-dom"
import clsx from "clsx"

const VARIANTS = {
  primary:
    "bg-brand-600 text-white hover:bg-brand-700 shadow-sm shadow-brand-900/10",
  outline:
    "border-2 border-brand-600 text-brand-700 hover:bg-brand-600 hover:text-white dark:border-brand-300 dark:text-brand-100 dark:hover:bg-brand-300 dark:hover:text-brand-900",
  ghost: "text-brand-700 hover:text-brand-900 dark:text-brand-200 dark:hover:text-white",
  light: "bg-white text-brand-800 hover:bg-brand-50",
  accent:
    "bg-accent-500 text-brand-900 hover:bg-accent-400 shadow-sm shadow-black/10",
}

const Button = ({
  children,
  to,
  href,
  onClick,
  type = "button",
  variant = "primary",
  className,
  ...rest
}) => {
  const classes = clsx(
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold tracking-wide transition-all duration-200 cursor-pointer",
    VARIANTS[variant],
    className
  )

  if (to) {
    return (
      <Link to={to} onClick={onClick} className={classes} {...rest}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} onClick={onClick} className={classes} {...rest}>
        {children}
      </a>
    )
  }

  return (
    <button type={type} onClick={onClick} className={classes} {...rest}>
      {children}
    </button>
  )
}

export default Button
