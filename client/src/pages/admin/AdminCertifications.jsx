import { useState } from "react"
import { Formik, Form } from "formik"
import { FiPlus, FiTrash2, FiX } from "react-icons/fi"
import FormField from "../../components/forms/FormField"
import ImageUploadField from "../../components/forms/ImageUploadField"
import Button from "../../components/common/Button"
import Loader from "../../components/common/Loader"
import {
  useGetAllCertificationsQuery,
  useCreateCertificationMutation,
  useDeleteCertificationMutation,
} from "../../redux/api/certificationApi"

const initialValues = { name: "", certificateImage: "", issuedBy: "", validTill: "", description: "" }

const AdminCertifications = () => {
  const { data, isLoading } = useGetAllCertificationsQuery()
  const [createCertification, { isLoading: isCreating, error }] = useCreateCertificationMutation()
  const [deleteCertification] = useDeleteCertificationMutation()
  const [showForm, setShowForm] = useState(false)

  const items = data?.data || []

  const handleSubmit = (values, { resetForm }) => {
    createCertification(values)
      .unwrap()
      .then(() => {
        resetForm()
        setShowForm(false)
      })
      .catch(() => {})
  }

  const handleDelete = (id) => {
    if (confirm("Delete this certification?")) deleteCertification(id)
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-brand-900">Certifications</h1>
          <p className="text-sm text-brand-900/60">{items.length} certification(s)</p>
        </div>
        <Button variant="primary" onClick={() => setShowForm((s) => !s)}>
          {showForm ? <FiX /> : <FiPlus />}
          {showForm ? "Cancel" : "Add Certification"}
        </Button>
      </div>

      {showForm && (
        <div className="mb-8 rounded-2xl bg-white p-6 shadow-md shadow-brand-900/5">
          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            <Form className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <FormField label="Name" name="name" required />
                <FormField label="Issued By" name="issuedBy" />
              </div>
              <FormField label="Valid Till" name="validTill" type="date" />
              <ImageUploadField label="Certificate Image" name="certificateImage" folder="certifications" />
              <FormField label="Description" name="description" as="textarea" />
              {error && (
                <p className="text-sm font-semibold text-red-600">
                  {error?.data?.message || "Failed to add certification"}
                </p>
              )}
              <Button type="submit" variant="primary" disabled={isCreating}>
                {isCreating ? "Saving..." : "Save Certification"}
              </Button>
            </Form>
          </Formik>
        </div>
      )}

      {isLoading ? (
        <Loader label="Loading certifications..." />
      ) : items.length === 0 ? (
        <p className="py-10 text-center text-brand-900/60">No certifications yet.</p>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((cert) => (
            <div key={cert._id} className="relative rounded-2xl bg-white p-6 shadow-md shadow-brand-900/5">
              <button
                onClick={() => handleDelete(cert._id)}
                className="absolute right-4 top-4 text-brand-900/40 transition hover:text-red-600"
                aria-label="Delete"
              >
                <FiTrash2 size={16} />
              </button>
              <h3 className="pr-6 text-base font-bold text-brand-900">{cert.name}</h3>
              {cert.issuedBy && <p className="mt-1 text-xs text-brand-900/60">Issued by {cert.issuedBy}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default AdminCertifications
