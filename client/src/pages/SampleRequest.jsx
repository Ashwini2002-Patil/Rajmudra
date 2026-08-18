import { Formik, Form } from "formik"
import { FiCheckCircle } from "react-icons/fi"
import PageHero from "../components/common/PageHero"
import Container from "../components/common/Container"
import FormField from "../components/forms/FormField"
import Button from "../components/common/Button"
import { useSubmitSampleRequestMutation } from "../redux/api/sampleApi"
import { PRODUCT_CATEGORIES } from "../utils/constants"

const initialValues = {
  name: "",
  email: "",
  phone: "",
  companyName: "",
  productInterested: PRODUCT_CATEGORIES[0],
  addressLine1: "",
  city: "",
  state: "",
}

const SampleRequest = () => {
  const [submitSampleRequest, { isLoading, isSuccess, error, reset }] = useSubmitSampleRequestMutation()

  const handleSubmit = (values, { resetForm }) => {
    submitSampleRequest(values)
      .unwrap()
      .then(() => resetForm())
      .catch(() => {})
  }

  return (
    <>
      <PageHero
        title="Request a Sample"
        subtitle="Try before you buy in bulk — request a free sample of our products."
      />
      <Container className="section-y">
        <div className="mx-auto max-w-3xl rounded-2xl bg-white p-7 shadow-md shadow-brand-900/5 sm:p-10">
          {isSuccess ? (
            <div className="flex flex-col items-center gap-3 py-10 text-center">
              <FiCheckCircle className="text-4xl text-brand-600" />
              <p className="text-lg font-bold text-brand-900">Sample Request Received!</p>
              <p className="text-sm text-brand-900/70">We'll ship your sample soon.</p>
              <Button variant="outline" onClick={reset}>
                Request Another Sample
              </Button>
            </div>
          ) : (
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
              <Form className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <FormField label="Full Name" name="name" required />
                  <FormField label="Company Name" name="companyName" />
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <FormField label="Email" name="email" type="email" required />
                  <FormField label="Phone" name="phone" required />
                </div>
                <FormField
                  label="Product Interested"
                  name="productInterested"
                  as="select"
                  options={PRODUCT_CATEGORIES}
                />
                <FormField label="Address" name="addressLine1" />
                <div className="grid gap-5 sm:grid-cols-2">
                  <FormField label="City" name="city" />
                  <FormField label="State" name="state" />
                </div>
                {error && (
                  <p className="text-sm font-semibold text-red-600">
                    {error?.data?.message || "Failed to send request"}
                  </p>
                )}
                <Button type="submit" variant="primary" disabled={isLoading}>
                  {isLoading ? "Submitting..." : "Request Sample"}
                </Button>
              </Form>
            </Formik>
          )}
        </div>
      </Container>
    </>
  )
}

export default SampleRequest
