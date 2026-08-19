import { useEffect, useState } from "react"
import { useField } from "formik"
import { FiUploadCloud, FiCheckCircle, FiX } from "react-icons/fi"

// Formik-aware image field. It does NOT upload anywhere by itself — it just
// keeps the picked File on the field's value and shows a local preview. The
// owning form sends that File as part of its own multipart submit, and the
// entity's controller (product/gallery/etc.) uploads it to Cloudinary as
// part of creating/updating that record.
const ImageUploadField = ({ label, name, required }) => {
  const [field, , helpers] = useField(name)
  const [preview, setPreview] = useState(null)

  const value = field.value
  const isFile = value instanceof File

  useEffect(() => {
    if (!isFile) {
      setPreview(null)
      return
    }
    const url = URL.createObjectURL(value)
    setPreview(url)
    return () => URL.revokeObjectURL(url)
  }, [value, isFile])

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    helpers.setValue(file)
  }

  // Existing string URL (editing an item that already has an image) or a
  // freshly picked File (previewed via object URL) both render the same way.
  const displaySrc = isFile ? preview : value

  return (
    <div>
      <span className="mb-2 block text-sm font-semibold text-brand-900">
        {label} {required && <span className="text-accent-600">*</span>}
      </span>

      {displaySrc ? (
        <div className="flex items-center gap-3 rounded-xl border border-brand-200 bg-white p-3">
          <img src={displaySrc} alt="Selected" className="h-16 w-16 rounded-lg object-cover" />
          <div className="flex items-center gap-1.5 text-xs font-semibold text-brand-600">
            <FiCheckCircle /> {isFile ? "Selected" : "Uploaded"}
          </div>
          <button
            type="button"
            onClick={() => helpers.setValue("")}
            className="ml-auto text-brand-900/40 hover:text-red-600"
            aria-label="Remove image"
          >
            <FiX />
          </button>
        </div>
      ) : (
        <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-brand-200 bg-white px-4 py-6 text-center text-sm text-brand-900/60 transition hover:border-brand-400 hover:bg-brand-50">
          <FiUploadCloud size={20} />
          Click to choose an image
          <input type="file" accept="image/jpeg,image/png,image/webp" onChange={handleFileChange} className="hidden" />
        </label>
      )}
    </div>
  )
}

export default ImageUploadField
