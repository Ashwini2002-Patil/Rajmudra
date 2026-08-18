import { useState } from "react"
import { Formik, Form } from "formik"
import { FiPlus, FiTrash2, FiX } from "react-icons/fi"
import FormField from "../../components/forms/FormField"
import ImageUploadField from "../../components/forms/ImageUploadField"
import Button from "../../components/common/Button"
import Loader from "../../components/common/Loader"
import {
  useGetAllProcessStepsQuery,
  useCreateProcessStepMutation,
  useDeleteProcessStepMutation,
} from "../../redux/api/processStepApi"

// Keep in sync with the enum in server/model/ProcessStep.js and the
// ICON_MAP in client/src/pages/About.jsx.
const ICON_OPTIONS = ["mapPin", "filter", "shield", "settings", "package", "truck"]

const initialValues = { title: "", description: "", image: "", icon: ICON_OPTIONS[0], order: "" }

const AdminProcessSteps = () => {
  const { data, isLoading } = useGetAllProcessStepsQuery()
  const [createProcessStep, { isLoading: isCreating, error }] = useCreateProcessStepMutation()
  const [deleteProcessStep] = useDeleteProcessStepMutation()
  const [showForm, setShowForm] = useState(false)

  const steps = data?.data || []

  const handleSubmit = (values, { resetForm }) => {
    const payload = { ...values, order: values.order ? Number(values.order) : 0 }
    createProcessStep(payload)
      .unwrap()
      .then(() => {
        resetForm()
        setShowForm(false)
      })
      .catch(() => {})
  }

  const handleDelete = (id) => {
    if (confirm("Delete this process step?")) deleteProcessStep(id)
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-brand-900">Our Process (About Page)</h1>
          <p className="text-sm text-brand-900/60">{steps.length} step(s)</p>
        </div>
        <Button variant="primary" onClick={() => setShowForm((s) => !s)}>
          {showForm ? <FiX /> : <FiPlus />}
          {showForm ? "Cancel" : "Add Step"}
        </Button>
      </div>

      {showForm && (
        <div className="mb-8 rounded-2xl bg-white p-6 shadow-md shadow-brand-900/5">
          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            <Form className="space-y-5">
              <ImageUploadField label="Step Photo" name="image" folder="process-steps" required />
              <div className="grid gap-5 sm:grid-cols-2">
                <FormField label="Title" name="title" required />
                <FormField label="Icon" name="icon" as="select" options={ICON_OPTIONS} />
              </div>
              <FormField label="Description" name="description" as="textarea" required />
              <FormField
                label="Order (lower shows first)"
                name="order"
                type="number"
                placeholder="1"
              />
              {error && (
                <p className="text-sm font-semibold text-red-600">
                  {error?.data?.message || "Failed to add process step"}
                </p>
              )}
              <Button type="submit" variant="primary" disabled={isCreating}>
                {isCreating ? "Saving..." : "Save Step"}
              </Button>
            </Form>
          </Formik>
        </div>
      )}

      {isLoading ? (
        <Loader label="Loading process steps..." />
      ) : steps.length === 0 ? (
        <p className="py-10 text-center text-brand-900/60">No process steps yet.</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {steps.map((step) => (
            <div key={step._id} className="group relative overflow-hidden rounded-2xl bg-white shadow-md shadow-brand-900/5">
              <img src={step.image} alt={step.title} className="h-32 w-full object-cover" />
              <div className="p-3">
                <p className="text-sm font-bold text-brand-900">{step.title}</p>
                <p className="mt-0.5 line-clamp-2 text-xs text-brand-900/60">{step.description}</p>
              </div>
              <button
                onClick={() => handleDelete(step._id)}
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

export default AdminProcessSteps
