import { Formik, Form } from "formik"
import { FiCheckCircle } from "react-icons/fi"
import PageHero from "../components/common/PageHero"
import Container from "../components/common/Container"
import FormField from "../components/forms/FormField"
import Button from "../components/common/Button"
import { useSubmitExportInquiryMutation } from "../redux/api/exportApi"
import { PRODUCT_CATEGORIES } from "../utils/constants"

const initialValues = {
  companyName: "",
  country: "",
  contactPerson: "",
  email: "",
  phone: "",
  productInterested: PRODUCT_CATEGORIES[0],
  quantity: "",
  message: "",
}

const ExportInquiry = () => {
  const [submitExportInquiry, { isLoading, isSuccess, error, reset }] = useSubmitExportInquiryMutation()

  const handleSubmit = (values, { resetForm }) => {
    submitExportInquiry(values)
      .unwrap()
      .then(() => resetForm())
      .catch(() => {})
  }

  return (
    <>
      <PageHero
        title="Export Inquiry"
        subtitle="Importing agro products? Tell us about your requirements and we'll get back with a quote."
      />
      <Container className="section-y">
        <div className="mx-auto max-w-3xl rounded-2xl bg-white p-7 shadow-md shadow-brand-900/5 sm:p-10">
          {isSuccess ? (
            <div className="flex flex-col items-center gap-3 py-10 text-center">
              <FiCheckCircle className="text-4xl text-brand-600" />
              <p className="text-lg font-bold text-brand-900">Inquiry Submitted!</p>
              <p className="text-sm text-brand-900/70">Our export team will reach out with a quote.</p>
              <Button variant="outline" onClick={reset}>
                Submit Another Inquiry
              </Button>
            </div>
          ) : (
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
              <Form className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <FormField label="Company Name" name="companyName" />
                  <FormField label="Country" name="country" required />
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <FormField label="Contact Person" name="contactPerson" />
                  <FormField label="Email" name="email" type="email" required />
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <FormField label="Phone" name="phone" />
                  <FormField
                    label="Product Interested"
                    name="productInterested"
                    as="select"
                    options={PRODUCT_CATEGORIES}
                  />
                </div>
                <FormField label="Quantity" name="quantity" placeholder="e.g. 1 container / month" />
                <FormField label="Message" name="message" as="textarea" />
                {error && (
                  <p className="text-sm font-semibold text-red-600">
                    {error?.data?.message || "Failed to send inquiry"}
                  </p>
                )}
                <Button type="submit" variant="primary" disabled={isLoading}>
                  {isLoading ? "Submitting..." : "Submit Inquiry"}
                </Button>
              </Form>
            </Formik>
          )}
        </div>
      </Container>
    </>
  )
}

export default ExportInquiry
