import { Link, useNavigate } from "react-router-dom"
import {
  FiBox,
  FiFileText,
  FiImage,
  FiAward,
  FiMail,
  FiBriefcase,
  FiGlobe,
  FiPackage,
  FiArrowUpRight,
  FiExternalLink,
  FiPlusCircle,
  FiLogOut,
} from "react-icons/fi"
import { useGetAllProductsQuery } from "../../redux/api/productApi"
import { useGetAllBlogsQuery } from "../../redux/api/blogApi"
import { useGetAllGalleryItemsQuery } from "../../redux/api/galleryApi"
import { useGetAllCertificationsQuery } from "../../redux/api/certificationApi"
import { useGetAllContactsQuery } from "../../redux/api/contactApi"
import { useGetAllOEMInquiriesQuery } from "../../redux/api/oemApi"
import { useGetAllExportInquiriesQuery } from "../../redux/api/exportApi"
import { useGetAllSampleRequestsQuery } from "../../redux/api/sampleApi"
import { useGetMeQuery, useLogoutAdminMutation } from "../../redux/api/authApi"
import { Card } from "../../components/ui/Card"
import { Badge } from "../../components/ui/Badge"

const TONES = {
  brand: "bg-brand-100 text-brand-700",
  accent: "bg-accent-500/15 text-accent-600",
}

const StatCard = ({ icon: Icon, label, count, to, tone = "brand" }) => (
  <Link
    to={to}
    className="group flex items-center gap-4 rounded-2xl border border-brand-100 bg-white p-6 shadow-sm shadow-brand-900/5 transition-all duration-300 hover:-translate-y-1 hover:border-transparent hover:shadow-lg hover:shadow-brand-900/10"
  >
    <div
      className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl transition-transform duration-300 group-hover:scale-110 ${TONES[tone]}`}
    >
      <Icon size={20} />
    </div>
    <div className="min-w-0 flex-1">
      <p className="text-2xl font-bold text-brand-900">{count ?? "…"}</p>
      <p className="truncate text-sm text-brand-900/60">{label}</p>
    </div>
    <FiArrowUpRight className="shrink-0 text-brand-300 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100" />
  </Link>
)

const QuickAction = ({ icon: Icon, label, to }) => (
  <Link
    to={to}
    className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-brand-800 transition-colors hover:bg-brand-50"
  >
    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent-500/15 text-accent-600">
      <Icon size={16} />
    </span>
    {label}
    <FiPlusCircle className="ml-auto text-brand-300" size={14} />
  </Link>
)

const AdminDashboard = () => {
  const navigate = useNavigate()
  const { data: me } = useGetMeQuery()
  const [logoutAdmin, { isLoading: isLoggingOut }] = useLogoutAdminMutation()
  const { data: products } = useGetAllProductsQuery()
  const { data: blogs } = useGetAllBlogsQuery()
  const { data: gallery } = useGetAllGalleryItemsQuery()
  const { data: certifications } = useGetAllCertificationsQuery()
  const { data: contacts } = useGetAllContactsQuery()
  const { data: oem } = useGetAllOEMInquiriesQuery()
  const { data: exportInquiries } = useGetAllExportInquiriesQuery()
  const { data: samples } = useGetAllSampleRequestsQuery()

  const admin = me?.data
  const totalInquiries =
    (contacts?.count || 0) + (oem?.count || 0) + (exportInquiries?.count || 0) + (samples?.count || 0)

  const handleLogout = async () => {
    await logoutAdmin()
    navigate("/admin/login")
  }

  return (
    <div>
      {/* Welcome banner */}
      <div className="relative mb-8 overflow-hidden rounded-2xl bg-gradient-to-br from-brand-700 via-brand-800 to-brand-900 px-7 py-8 sm:px-9">
        <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-accent-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 left-1/4 h-48 w-48 rounded-full bg-brand-400/20 blur-3xl" />
        <div className="relative flex flex-wrap items-end justify-between gap-6">
          <div className="flex items-center gap-4">
            {admin?.name && (
              <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-accent-400 to-accent-600 text-xl font-bold text-brand-900 shadow-lg shadow-black/20 ring-2 ring-white/20">
                {admin.name.charAt(0).toUpperCase()}
              </div>
            )}
            <div>
              <Badge variant="accent" className="mb-3">
                Admin Panel
              </Badge>
              <h1 className="text-2xl font-bold text-white sm:text-3xl">
                Welcome back{admin?.name ? `, ${admin.name}` : ""}
              </h1>
              <p className="mt-2 max-w-md text-sm text-brand-200">
                Here's an overview of your content and incoming inquiries at a glance.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full bg-white/10 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/20"
            >
              View Website <FiExternalLink size={14} />
            </a>
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="flex items-center gap-2 rounded-full bg-accent-500 px-5 py-2.5 text-sm font-semibold text-brand-900 shadow-md shadow-black/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent-400 hover:shadow-lg disabled:opacity-60"
            >
              {isLoggingOut ? "Logging out..." : "Logout"} <FiLogOut size={14} />
            </button>
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="mb-3 flex items-center gap-2">
            <Badge variant="brand">Content</Badge>
          </div>
          <div className="mb-8 grid gap-5 sm:grid-cols-2">
            <StatCard icon={FiBox} label="Products" count={products?.count} to="/admin/products" tone="brand" />
            <StatCard icon={FiFileText} label="Blog Posts" count={blogs?.count} to="/admin/blogs" tone="accent" />
            <StatCard icon={FiImage} label="Gallery Items" count={gallery?.count} to="/admin/gallery" tone="brand" />
            <StatCard
              icon={FiAward}
              label="Certifications"
              count={certifications?.count}
              to="/admin/certifications"
              tone="accent"
            />
          </div>

          <div className="mb-3 flex items-center gap-2">
            <Badge variant="accent">Inquiries · {totalInquiries}</Badge>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <StatCard icon={FiMail} label="Contact Messages" count={contacts?.count} to="/admin/inquiries" tone="accent" />
            <StatCard icon={FiBriefcase} label="OEM Inquiries" count={oem?.count} to="/admin/inquiries" tone="brand" />
            <StatCard
              icon={FiGlobe}
              label="Export Inquiries"
              count={exportInquiries?.count}
              to="/admin/inquiries"
              tone="accent"
            />
            <StatCard icon={FiPackage} label="Sample Requests" count={samples?.count} to="/admin/inquiries" tone="brand" />
          </div>
        </div>

        <div>
          <Card>
            <div className="border-b border-brand-100 px-5 py-4">
              <p className="text-sm font-bold text-brand-900">Quick Actions</p>
            </div>
            <div className="space-y-1 p-2">
              <QuickAction icon={FiBox} label="Add Product" to="/admin/products" />
              <QuickAction icon={FiFileText} label="Write Blog Post" to="/admin/blogs" />
              <QuickAction icon={FiImage} label="Upload Gallery Item" to="/admin/gallery" />
              <QuickAction icon={FiAward} label="Add Certification" to="/admin/certifications" />
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
