import { Outlet, NavLink, Navigate, useNavigate } from "react-router-dom"
import { FiGrid, FiBox, FiFileText, FiImage, FiAward, FiInbox, FiUserPlus, FiLogOut, FiTruck, FiShoppingBag } from "react-icons/fi"
import clsx from "clsx"
import { useGetMeQuery, useLogoutAdminMutation } from "../../redux/api/authApi"
import Loader from "../common/Loader"
import Logo from "../common/Logo"

const NAV_ITEMS = [
  { to: "/admin", label: "Dashboard", icon: FiGrid, end: true },
  { to: "/admin/products", label: "Products", icon: FiBox },
  { to: "/admin/blogs", label: "Blogs", icon: FiFileText },
  { to: "/admin/gallery", label: "Gallery", icon: FiImage },
  { to: "/admin/certifications", label: "Certifications", icon: FiAward },
  { to: "/admin/process-steps", label: "Our Process", icon: FiTruck },
  { to: "/admin/showcase-products", label: "Makhana Range", icon: FiShoppingBag },
  { to: "/admin/inquiries", label: "Inquiries", icon: FiInbox },
  { to: "/admin/register", label: "Add Admin", icon: FiUserPlus },
]

const AdminLayout = () => {
  const { data, isLoading, isError } = useGetMeQuery()
  const [logoutAdmin] = useLogoutAdminMutation()
  const navigate = useNavigate()

  if (isLoading) return <Loader label="Checking session..." />
  if (isError || !data) return <Navigate to="/admin/login" replace />

  const admin = data?.data

  const handleLogout = async () => {
    await logoutAdmin()
    navigate("/admin/login")
  }

  return (
    <div className="flex min-h-screen bg-cream-50">
      <aside className="hidden w-64 shrink-0 flex-col bg-brand-900 sm:flex">
        <div className="flex flex-col gap-2 border-b border-white/10 px-6 py-5">
          <Logo imgClassName="h-12" />
          <div className="flex min-w-0 items-center gap-2">
            <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-accent-400">
              Admin
            </span>
            {admin?.email && <p className="truncate text-xs text-brand-300">{admin.email}</p>}
          </div>
        </div>
        <nav className="flex-1 space-y-1 px-3 py-5">
          {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                clsx(
                  "group relative flex items-center gap-3 overflow-hidden rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors",
                  isActive
                    ? "bg-white/10 text-white"
                    : "text-brand-200 hover:bg-white/5 hover:text-white"
                )
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className={clsx(
                      "absolute inset-y-1 left-0 w-1 rounded-r-full bg-accent-500 transition-transform duration-300",
                      isActive ? "scale-y-100" : "scale-y-0 group-hover:scale-y-100"
                    )}
                  />
                  <Icon size={17} className={isActive ? "text-accent-400" : ""} />
                  {label}
                </>
              )}
            </NavLink>
          ))}
        </nav>
        <div className="border-t border-white/10 p-3">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-semibold text-brand-200 transition hover:bg-red-500/10 hover:text-red-300"
          >
            <FiLogOut size={17} />
            Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-x-hidden">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-8">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default AdminLayout
