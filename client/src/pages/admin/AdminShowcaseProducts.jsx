import { useState } from "react"
import { Formik, Form } from "formik"
import { FiPlus, FiTrash2, FiX } from "react-icons/fi"
import FormField from "../../components/forms/FormField"
import ImageUploadField from "../../components/forms/ImageUploadField"
import Button from "../../components/common/Button"
import Loader from "../../components/common/Loader"
import {
  useGetAllShowcaseProductsQuery,
  useCreateShowcaseProductMutation,
  useDeleteShowcaseProductMutation,
} from "../../redux/api/showcaseProductApi"

const initialValues = {
  title: "",
  description: "",
  image: "",
  specGrades: "",
  specMoq: "",
  specPackaging: "",
  order: "",
}

const AdminShowcaseProducts = () => {
  const { data, isLoading } = useGetAllShowcaseProductsQuery()
  const [createShowcaseProduct, { isLoading: isCreating, error }] = useCreateShowcaseProductMutation()
  const [deleteShowcaseProduct] = useDeleteShowcaseProductMutation()
  const [showForm, setShowForm] = useState(false)

  const items = data?.data || []

  const handleSubmit = (values, { resetForm }) => {
    const { specGrades, specMoq, specPackaging, order, ...rest } = values
    const specs = [
      specGrades && { label: "Grades", value: specGrades },
      specMoq && { label: "MOQ", value: specMoq },
      specPackaging && { label: "Packaging", value: specPackaging },
    ].filter(Boolean)

    createShowcaseProduct({ ...rest, specs, order: order ? Number(order) : 0 })
      .unwrap()
      .then(() => {
        resetForm()
        setShowForm(false)
      })
      .catch(() => {})
  }

  const handleDelete = (id) => {
    if (confirm("Delete this showcase product?")) deleteShowcaseProduct(id)
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-brand-900">Makhana Range (Home Page)</h1>
          <p className="text-sm text-brand-900/60">{items.length} product(s)</p>
        </div>
        <Button variant="primary" onClick={() => setShowForm((s) => !s)}>
          {showForm ? <FiX /> : <FiPlus />}
          {showForm ? "Cancel" : "Add Product"}
        </Button>
      </div>

      {showForm && (
        <div className="mb-8 rounded-2xl bg-white p-6 shadow-md shadow-brand-900/5">
          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            <Form className="space-y-5">
              <ImageUploadField label="Product Photo" name="image" folder="showcase-products" required />
              <FormField label="Title" name="title" required />
              <FormField label="Description" name="description" as="textarea" required />
              <div className="grid gap-5 sm:grid-cols-3">
                <FormField label="Grades" name="specGrades" placeholder="4 Suta, 5 Suta, Jumbo" />
                <FormField label="MOQ" name="specMoq" placeholder="500 kg" />
                <FormField label="Packaging" name="specPackaging" placeholder="Retail pouches, bulk packs" />
              </div>
              <FormField label="Order (lower shows first)" name="order" type="number" placeholder="1" />
              {error && (
                <p className="text-sm font-semibold text-red-600">
                  {error?.data?.message || "Failed to add product"}
                </p>
              )}
              <Button type="submit" variant="primary" disabled={isCreating}>
                {isCreating ? "Saving..." : "Save Product"}
              </Button>
            </Form>
          </Formik>
        </div>
      )}

      {isLoading ? (
        <Loader label="Loading showcase products..." />
      ) : items.length === 0 ? (
        <p className="py-10 text-center text-brand-900/60">No showcase products yet.</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {items.map((item) => (
            <div key={item._id} className="group relative overflow-hidden rounded-2xl bg-white shadow-md shadow-brand-900/5">
              <img src={item.image} alt={item.title} className="h-32 w-full object-cover" />
              <div className="p-3">
                <p className="text-sm font-bold text-brand-900">{item.title}</p>
                <p className="mt-0.5 line-clamp-2 text-xs text-brand-900/60">{item.description}</p>
              </div>
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

export default AdminShowcaseProducts
