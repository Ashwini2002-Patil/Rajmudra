import clsx from "clsx"

const SectionHeading = ({ eyebrow, title, subtitle, align = "center", invert = false, className }) => (
  <div
    className={clsx(
      "mb-10 sm:mb-14 max-w-2xl",
      align === "center" ? "mx-auto text-center" : "text-left",
      className
    )}
  >
    {eyebrow && (
      <span
        className={clsx(
          "mb-3 inline-block rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest",
          invert
            ? "bg-white/10 text-brand-200 dark:bg-brand-100 dark:text-brand-700"
            : "bg-brand-100 text-brand-700 dark:bg-white/10 dark:text-brand-200"
        )}
      >
        {eyebrow}
      </span>
    )}
    <h2
      className={clsx(
        "text-3xl sm:text-4xl font-bold leading-tight",
        invert ? "text-white dark:text-brand-900" : "text-brand-900 dark:text-white"
      )}
    >
      {title}
    </h2>
    {subtitle && (
      <p
        className={clsx(
          "mt-4 text-base sm:text-lg",
          invert ? "text-brand-200 dark:text-brand-700" : "text-brand-900/70 dark:text-brand-100"
        )}
      >
        {subtitle}
      </p>
    )}
  </div>
)

export default SectionHeading
