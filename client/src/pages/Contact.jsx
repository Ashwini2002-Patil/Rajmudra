import { useState } from "react"
import { Formik, Form } from "formik"
import { FaWhatsapp } from "react-icons/fa"
import { FiMapPin, FiPhone, FiMail, FiInstagram, FiCheckCircle, FiArrowRight, FiSend } from "react-icons/fi"
import PageHero from "../components/common/PageHero"
import Container from "../components/common/Container"
import FormField from "../components/forms/FormField"
import Button from "../components/common/Button"
import { useSubmitContactMutation } from "../redux/api/contactApi"
import { BRAND } from "../utils/constants"

const initialValues = { name: "", email: "", phone: "", subject: "", message: "" }

const CONTACT_ITEMS = [
  { icon: FiMapPin, label: "Address", value: BRAND.address },
  { icon: FiPhone, label: "Phone", value: BRAND.phone, href: `tel:${BRAND.phone}` },
  {
    icon: FiMail,
    label: "Email",
    value: BRAND.email,
    href: `https://mail.google.com/mail/?view=cm&fs=1&to=${BRAND.email}`,
  },
  { icon: FiInstagram, label: "Instagram", value: "@rajmudra_global_exim", href: BRAND.instagram },
]

const Contact = () => {
  const [submitContact, { isLoading, isSuccess, error, reset }] = useSubmitContactMutation()
  const [waHref, setWaHref] = useState("")

  const handleSubmit = (values, { resetForm }) => {
    submitContact(values)
      .unwrap()
      .then(() => {
        // The message is emailed to us automatically (server-side). WhatsApp
        // can't be pushed to silently from a browser — wa.me only pre-fills
        // a chat, the customer still has to hit send — so we surface it as
        // a one-tap button instead of a surprise popup.
        const waMessage = [
          `New contact form message from ${values.name}`,
          values.subject && `Subject: ${values.subject}`,
          `Email: ${values.email}`,
          values.phone && `Phone: ${values.phone}`,
          "",
          values.message,
        ]
          .filter(Boolean)
          .join("\n")
        setWaHref(`${BRAND.whatsapp}?text=${encodeURIComponent(waMessage)}`)
        resetForm()
      })
      .catch(() => {})
  }

  return (
    <>
      <PageHero
        title="Contact Us"
        subtitle="Have a question about our products or want to place an order? Reach out to us."
      />
      <Container className="relative section-y">
        <div className="pointer-events-none absolute -right-24 top-10 -z-10 h-64 w-64 animate-float-slow rounded-full bg-accent-400/10 blur-3xl" />

        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <span className="mb-4 inline-block rounded-full bg-brand-100 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-brand-700 dark:bg-white/10 dark:text-brand-200">
              Get in Touch
            </span>
            <div className="space-y-4">
              {CONTACT_ITEMS.map((item) => {
                const content = (
                  <>
                    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-accent-500/15 text-accent-600 transition-transform duration-300 group-hover:scale-110 dark:text-accent-400">
                      <item.icon />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-brand-900 dark:text-white">{item.label}</p>
                      <p className="truncate text-sm text-brand-900/70 dark:text-brand-200">{item.value}</p>
                    </div>
                  </>
                )
                const className =
                  "group flex items-start gap-4 rounded-2xl bg-white p-4 shadow-sm shadow-brand-900/5 ring-1 ring-transparent transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:ring-accent-500/30 dark:bg-brand-700"

                return item.href ? (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith("tel:") ? undefined : "_blank"}
                    rel={item.href.startsWith("tel:") ? undefined : "noopener noreferrer"}
                    className={className}
                  >
                    {content}
                  </a>
                ) : (
                  <div key={item.label} className={className.replace("group ", "")}>
                    {content}
                  </div>
                )
              })}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl bg-white p-7 shadow-md shadow-brand-900/5 dark:bg-brand-700 lg:col-span-3">
            <span className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-accent-400 via-accent-500 to-accent-600" />
            {isSuccess ? (
              <div className="relative flex flex-col items-center gap-3 overflow-hidden py-10 text-center animate-scale-in">
                <span className="pointer-events-none absolute -top-10 left-1/2 -z-10 h-48 w-48 -translate-x-1/2 rounded-full bg-accent-400/20 blur-3xl" />

                <div className="relative grid h-20 w-20 place-items-center">
                  <span className="absolute inset-0 rounded-full bg-accent-400/30 animate-ping" />
                  <span className="relative grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-accent-400 to-accent-600 text-white shadow-lg shadow-accent-500/30 animate-check-pop">
                    <FiCheckCircle className="text-4xl" />
                  </span>
                </div>

                <span className="mt-1 rounded-full bg-brand-100 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-brand-700 dark:bg-white/10 dark:text-brand-200">
                  Thank You
                </span>
                <p className="text-2xl font-bold text-brand-900 dark:text-white">Message Sent!</p>
                <p className="max-w-xs text-sm text-brand-900/70 dark:text-brand-200">
                  We've received your message and will get back to you shortly.
                </p>

                <div className="mt-4 flex flex-col items-center gap-3 sm:flex-row">
                  {waHref && (
                    <a
                      href={waHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white shadow-md shadow-[#25D366]/30 transition-all duration-300 hover:-translate-y-0.5 hover:scale-105 hover:shadow-lg"
                    >
                      <FaWhatsapp size={16} />
                      Also Send via WhatsApp
                    </a>
                  )}
                  <Button
                    variant="outline"
                    onClick={() => {
                      setWaHref("")
                      reset()
                    }}
                  >
                    Send Another Message
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <h2 className="mb-1 text-xl font-bold text-brand-900 dark:text-white">Send us a Message</h2>
                <p className="mb-6 text-sm text-brand-900/60 dark:text-brand-300">We usually reply within one business day.</p>
                <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                  <Form className="space-y-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <FormField label="Full Name" name="name" required />
                      <FormField label="Email" name="email" type="email" required />
                    </div>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <FormField label="Phone" name="phone" />
                      <FormField label="Subject" name="subject" />
                    </div>
                    <FormField label="Message" name="message" as="textarea" required />
                    {error && (
                      <p className="text-sm font-semibold text-red-600 dark:text-red-400">
                        {error?.data?.message || "Failed to send message"}
                      </p>
                    )}
                    <Button
                      type="submit"
                      variant="primary"
                      disabled={isLoading}
                      className="group shadow-md shadow-brand-900/15 transition-transform duration-300 hover:scale-105"
                    >
                      {isLoading ? (
                        <>
                          Sending...
                          <FiSend className="animate-pulse" />
                        </>
                      ) : (
                        <>
                          Send Message
                          <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                        </>
                      )}
                    </Button>
                  </Form>
                </Formik>
              </>
            )}
          </div>
        </div>
      </Container>
    </>
  )
}

export default Contact
