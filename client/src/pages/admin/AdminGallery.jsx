import { useState } from "react"
import { Formik, Form } from "formik"
import { FiPlus, FiTrash2, FiX } from "react-icons/fi"
import FormField from "../../components/forms/FormField"
import ImageUploadField from "../../components/forms/ImageUploadField"
import Button from "../../components/common/Button"
import Loader from "../../components/common/Loader"
import {
  useGetAllGalleryItemsQuery,
  useCreateGalleryItemMutation,
  useDeleteGalleryItemMutation,
} from "../../redux/api/galleryApi"
import { toFormData } from "../../utils/toFormData"

const initialValues = { title: "", imageUrl: "", category: "" }

const AdminGallery = () => {
  const { data, isLoading } = useGetAllGalleryItemsQuery()
  const [createGalleryItem, { isLoading: isCreating, error }] = useCreateGalleryItemMutation()
  const [deleteGalleryItem] = useDeleteGalleryItemMutation()
  const [showForm, setShowForm] = useState(false)

  const items = data?.data || []

  const handleSubmit = (values, { resetForm }) => {
    createGalleryItem(toFormData(values))
      .unwrap()
      .then(() => {
        resetForm()
        setShowForm(false)
      })
      .catch(() => {})
  }

  const handleDelete = (id) => {
    if (confirm("Delete this gallery item?")) deleteGalleryItem(id)
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-brand-900">Gallery</h1>
          <p className="text-sm text-brand-900/60">{items.length} item(s)</p>
        </div>
        <Button variant="primary" onClick={() => setShowForm((s) => !s)}>
          {showForm ? <FiX /> : <FiPlus />}
          {showForm ? "Cancel" : "Add Item"}
        </Button>
      </div>

      {showForm && (
        <div className="mb-8 rounded-2xl bg-white p-6 shadow-md shadow-brand-900/5">
          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            <Form className="space-y-5">
              <ImageUploadField label="Image" name="imageUrl" folder="gallery" required />
              <div className="grid gap-5 sm:grid-cols-2">
                <FormField label="Title" name="title" />
                <FormField label="Category" name="category" />
              </div>
              {error && (
                <p className="text-sm font-semibold text-red-600">
                  {error?.data?.message || "Failed to add gallery item"}
                </p>
              )}
              <Button type="submit" variant="primary" disabled={isCreating}>
                {isCreating ? "Saving..." : "Save Item"}
              </Button>
            </Form>
          </Formik>
        </div>
      )}

      {isLoading ? (
        <Loader label="Loading gallery..." />
      ) : items.length === 0 ? (
        <p className="py-10 text-center text-brand-900/60">No gallery items yet.</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {items.map((item) => (
            <div key={item._id} className="group relative overflow-hidden rounded-2xl shadow-md shadow-brand-900/5">
              <img src={item.imageUrl} alt={item.title || "Gallery"} className="h-40 w-full object-cover" />
              <button
                onClick={() => handleDelete(item._id)}
                className="absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-full bg-white/90 text-brand-900/60 opacity-0 transition group-hover:opacity-100 hover:text-red-600"
                aria-label="Delete"
              >
                <FiTrash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default AdminGallery
