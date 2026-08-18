import { useState } from "react"
import { Formik, Form, Field } from "formik"
import { FiPlus, FiTrash2, FiX } from "react-icons/fi"
import FormField from "../../components/forms/FormField"
import ImageUploadField from "../../components/forms/ImageUploadField"
import Button from "../../components/common/Button"
import Loader from "../../components/common/Loader"
import {
  useGetAllProductsQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
} from "../../redux/api/productApi"
import { PRODUCT_CATEGORIES } from "../../utils/constants"

const initialValues = {
  name: "",
  category: PRODUCT_CATEGORIES[0],
  description: "",
  price: "",
  unit: "",
  image: "",
  packagingOptions: "",
  isFeatured: false,
}

const AdminProducts = () => {
  const { data, isLoading } = useGetAllProductsQuery()
  const [createProduct, { isLoading: isCreating, error }] = useCreateProductMutation()
  const [deleteProduct] = useDeleteProductMutation()
  const [showForm, setShowForm] = useState(false)

  const products = data?.data || []

  const handleSubmit = (values, { resetForm }) => {
    const { image, ...rest } = values
    const payload = {
      ...rest,
      price: values.price ? Number(values.price) : undefined,
      images: image ? [image] : [],
      packagingOptions: values.packagingOptions
        ? values.packagingOptions.split(",").map((s) => s.trim()).filter(Boolean)
        : [],
    }
    createProduct(payload)
      .unwrap()
      .then(() => {
        resetForm()
        setShowForm(false)
      })
      .catch(() => {})
  }

  const handleDelete = (id) => {
    if (confirm("Delete this product?")) deleteProduct(id)
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-brand-900">Products</h1>
          <p className="text-sm text-brand-900/60">{products.length} product(s)</p>
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
              <div className="grid gap-5 sm:grid-cols-2">
                <FormField label="Name" name="name" required />
                <FormField label="Category" name="category" as="select" options={PRODUCT_CATEGORIES} />
              </div>
              <FormField label="Description" name="description" as="textarea" />
              <div className="grid gap-5 sm:grid-cols-2">
                <FormField label="Price (₹)" name="price" type="number" />
                <FormField label="Unit" name="unit" placeholder="e.g. 500g" />
              </div>
              <ImageUploadField label="Product Image" name="image" folder="products" />
              <FormField
                label="Packaging Options (comma separated)"
                name="packagingOptions"
                placeholder="Pouch, Box, Jar"
              />
              <label className="flex items-center gap-2 text-sm font-semibold text-brand-900">
                <Field type="checkbox" name="isFeatured" className="h-4 w-4" /> Featured product
              </label>
              {error && (
                <p className="text-sm font-semibold text-red-600">
                  {error?.data?.message || "Failed to create product"}
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
        <Loader label="Loading products..." />
      ) : products.length === 0 ? (
        <p className="py-10 text-center text-brand-900/60">No products yet.</p>
      ) : (
        <div className="overflow-x-auto rounded-2xl bg-white shadow-md shadow-brand-900/5">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-brand-100 text-xs font-bold uppercase tracking-wide text-brand-900/50">
              <tr>
                <th className="px-5 py-3"></th>
                <th className="px-5 py-3">Name</th>
                <th className="px-5 py-3">Category</th>
                <th className="px-5 py-3">Price</th>
                <th className="px-5 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p._id} className="border-b border-brand-50 last:border-0">
                  <td className="px-5 py-3">
                    {p.images?.[0] && (
                      <img src={p.images[0]} alt={p.name} className="h-10 w-10 rounded-lg object-cover" />
                    )}
                  </td>
                  <td className="px-5 py-3 font-semibold text-brand-900">{p.name}</td>
                  <td className="px-5 py-3 text-brand-900/70">{p.category}</td>
                  <td className="px-5 py-3 text-brand-900/70">{p.price ? `₹${p.price}` : "—"}</td>
                  <td className="px-5 py-3 text-right">
                    <button
                      onClick={() => handleDelete(p._id)}
                      className="text-brand-900/40 transition hover:text-red-600"
                      aria-label="Delete"
                    >
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default AdminProducts
