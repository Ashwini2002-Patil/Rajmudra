import { Formik, Form } from "formik"
import { Link, useNavigate } from "react-router-dom"
import { FiUserPlus, FiCheckCircle } from "react-icons/fi"
import FormField from "../../components/forms/FormField"
import Button from "../../components/common/Button"
import Logo from "../../components/common/Logo"
import { useRegisterAdminMutation } from "../../redux/api/authApi"

const initialValues = { name: "", email: "", password: "", phone: "" }

const HIGHLIGHTS = ["Full access to products & content", "Handle every incoming inquiry", "Invite more teammates later"]

const AdminRegister = () => {
  const navigate = useNavigate()
  const [registerAdmin, { isLoading, error }] = useRegisterAdminMutation()

  const handleSubmit = (values) => {
    registerAdmin(values)
      .unwrap()
      .then(() => navigate("/admin"))
      .catch(() => {})
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Brand panel */}
      <div className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-brand-800 via-brand-900 to-brand-900 p-10 lg:flex">
        <div className="absolute inset-x-0 top-0 h-[3px] animate-shimmer bg-gradient-to-r from-accent-400 via-accent-600 to-accent-400" />
        <div className="pointer-events-none absolute -right-20 top-16 h-72 w-72 animate-float-slow rounded-full bg-accent-500/15 blur-3xl" />
        <div className="pointer-events-none absolute -left-24 bottom-10 h-72 w-72 animate-float-slow rounded-full bg-brand-400/15 blur-3xl [animation-delay:3s]" />

        <Link to="/" className="relative flex items-center">
          <Logo imgClassName="h-14" />
        </Link>

        <div className="relative">
          <span className="mb-4 inline-block rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-accent-400">
            Admin Panel
          </span>
          <h2 className="max-w-sm text-3xl font-bold leading-tight text-white">
            Join the team running Rajmudra.
          </h2>
          <div className="mt-8 space-y-3">
            {HIGHLIGHTS.map((h) => (
              <div key={h} className="flex items-center gap-3 text-sm font-semibold text-brand-200">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-accent-500/15 text-accent-400">
                  <FiCheckCircle size={14} />
                </span>
                {h}
              </div>
            ))}
          </div>
        </div>

        <p className="relative text-xs font-medium text-brand-300">
          © {new Date().getFullYear()} Rajmudra Global Exim. Authorized personnel only.
        </p>
      </div>

      {/* Form panel */}
      <div className="flex items-center justify-center bg-cream-50 px-4 py-16">
        <div className="w-full max-w-md">
          <Link to="/" className="mb-8 flex justify-center lg:hidden">
            <Logo imgClassName="h-14" />
          </Link>

          <div className="relative overflow-hidden rounded-2xl bg-white p-8 shadow-xl shadow-brand-900/10 ring-1 ring-brand-900/5 animate-scale-in">
            <span className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-accent-400 via-accent-500 to-accent-600" />

            <div className="mb-6 flex flex-col items-center text-center">
              <span className="relative mb-3 grid h-14 w-14 place-items-center">
                <span className="absolute inset-0 rounded-full bg-accent-400/25 animate-ping" />
                <span className="relative grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-accent-400 to-accent-600 text-white shadow-lg shadow-accent-500/30 animate-check-pop">
                  <FiUserPlus size={22} />
                </span>
              </span>
              <h1 className="text-2xl font-bold text-brand-900">Admin Register</h1>
              <p className="mt-1 text-sm text-brand-900/60">Create your Rajmudra admin account</p>
            </div>

            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
              <Form className="space-y-5">
                <FormField label="Name" name="name" required />
                <FormField label="Email" name="email" type="email" required />
                <FormField label="Password" name="password" type="password" required />
                <FormField label="Phone" name="phone" />
                {error && (
                  <p className="text-sm font-semibold text-red-600">
                    {error?.data?.message || "Failed to create admin"}
                  </p>
                )}
                <Button
                  type="submit"
                  variant="primary"
                  disabled={isLoading}
                  className="w-full shadow-md shadow-brand-900/15 transition-transform duration-300 hover:scale-[1.02]"
                >
                  {isLoading ? "Creating..." : "Register"}
                </Button>
              </Form>
            </Formik>

            <p className="mt-5 text-center text-sm text-brand-900/60">
              Already have an account?{" "}
              <Link to="/admin/login" className="font-semibold text-brand-600 hover:text-brand-800">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminRegister
