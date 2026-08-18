import { useField } from "formik"

const baseClasses =
  "w-full rounded-xl border border-brand-200 bg-white px-4 py-3 text-sm text-brand-900 placeholder:text-brand-900/40 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-200 dark:border-white/15 dark:bg-white/5 dark:text-white dark:placeholder:text-brand-300/50 dark:focus:border-accent-500 dark:focus:ring-accent-500/20"

const FormField = ({ label, name, type = "text", as = "input", options, required, ...rest }) => {
  // useField wires this input's value/onChange/onBlur to Formik's state —
  // without it, the input renders but Formik never sees what the user types.
  const [field] = useField(name)

  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-brand-900 dark:text-white">
        {label} {required && <span className="text-accent-600 dark:text-accent-400">*</span>}
      </span>
      {as === "textarea" ? (
        <textarea {...field} required={required} rows={4} className={baseClasses} {...rest} />
      ) : as === "select" ? (
        <select {...field} required={required} className={baseClasses} {...rest}>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      ) : (
        <input {...field} type={type} required={required} className={baseClasses} {...rest} />
      )}
    </label>
  )
}

export default FormField
