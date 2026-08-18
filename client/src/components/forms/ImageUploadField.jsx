import { useField } from "formik"
import { FiUploadCloud, FiCheckCircle, FiX } from "react-icons/fi"
import { useUploadImageMutation } from "../../redux/api/uploadApi"

// Formik-aware image field: uploads the chosen file straight to Cloudinary
// (via POST /api/upload) and stores the returned secure URL in the field.
const ImageUploadField = ({ label, name, folder, required }) => {
  const [field, , helpers] = useField(name)
  const [uploadImage, { isLoading, error }] = useUploadImageMutation()

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    try {
      const res = await uploadImage({ file, folder }).unwrap()
      helpers.setValue(res.url)
    } catch {
      // error is surfaced below via the `error` object
    }
  }

  return (
    <div>
      <span className="mb-2 block text-sm font-semibold text-brand-900">
        {label} {required && <span className="text-accent-600">*</span>}
      </span>

      {field.value ? (
        <div className="flex items-center gap-3 rounded-xl border border-brand-200 bg-white p-3">
          <img src={field.value} alt="Uploaded" className="h-16 w-16 rounded-lg object-cover" />
          <div className="flex items-center gap-1.5 text-xs font-semibold text-brand-600">
            <FiCheckCircle /> Uploaded
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
          {isLoading ? "Uploading..." : "Click to choose an image"}
          <input type="file" accept="image/jpeg,image/png,image/webp" onChange={handleFileChange} className="hidden" disabled={isLoading} />
        </label>
      )}

      {error && (
        <p className="mt-1.5 text-xs font-semibold text-red-600">
          {error?.data?.message || "Image upload failed"}
        </p>
      )}
    </div>
  )
}

export default ImageUploadField
