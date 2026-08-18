import { useState } from "react"
import { FiTrash2 } from "react-icons/fi"
import clsx from "clsx"
import Loader from "../../components/common/Loader"
import { useGetAllContactsQuery, useDeleteContactMutation } from "../../redux/api/contactApi"
import { useGetAllOEMInquiriesQuery, useDeleteOEMInquiryMutation } from "../../redux/api/oemApi"
import { useGetAllExportInquiriesQuery, useDeleteExportInquiryMutation } from "../../redux/api/exportApi"
import {
  useGetAllSampleRequestsQuery,
  useDeleteSampleRequestMutation,
  useUpdateSampleRequestStatusMutation,
} from "../../redux/api/sampleApi"

const TABS = [
  { key: "contact", label: "Contact" },
  { key: "oem", label: "OEM" },
  { key: "export", label: "Export" },
  { key: "sample", label: "Sample Requests" },
]

const Row = ({ children, onDelete }) => (
  <tr className="border-b border-brand-50 last:border-0 align-top">
    {children}
    <td className="px-5 py-3 text-right">
      <button onClick={onDelete} className="text-brand-900/40 transition hover:text-red-600" aria-label="Delete">
        <FiTrash2 />
      </button>
    </td>
  </tr>
)

const ContactTab = () => {
  const { data, isLoading } = useGetAllContactsQuery()
  const [deleteContact] = useDeleteContactMutation()
  const items = data?.data || []
  if (isLoading) return <Loader label="Loading..." />
  if (!items.length) return <p className="py-10 text-center text-brand-900/60">No messages yet.</p>
  return (
    <Table headers={["Name", "Email", "Phone", "Message"]}>
      {items.map((c) => (
        <Row key={c._id} onDelete={() => confirm("Delete this message?") && deleteContact(c._id)}>
          <td className="px-5 py-3 font-semibold text-brand-900">{c.name}</td>
          <td className="px-5 py-3 text-brand-900/70">{c.email}</td>
          <td className="px-5 py-3 text-brand-900/70">{c.phone || "—"}</td>
          <td className="max-w-xs px-5 py-3 text-brand-900/70">{c.message}</td>
        </Row>
      ))}
    </Table>
  )
}

const OEMTab = () => {
  const { data, isLoading } = useGetAllOEMInquiriesQuery()
  const [deleteOEMInquiry] = useDeleteOEMInquiryMutation()
  const items = data?.data || []
  if (isLoading) return <Loader label="Loading..." />
  if (!items.length) return <p className="py-10 text-center text-brand-900/60">No OEM inquiries yet.</p>
  return (
    <Table headers={["Company", "Contact Person", "Email", "Product", "Qty"]}>
      {items.map((o) => (
        <Row key={o._id} onDelete={() => confirm("Delete this inquiry?") && deleteOEMInquiry(o._id)}>
          <td className="px-5 py-3 font-semibold text-brand-900">{o.companyName || "—"}</td>
          <td className="px-5 py-3 text-brand-900/70">{o.contactPerson}</td>
          <td className="px-5 py-3 text-brand-900/70">{o.email}</td>
          <td className="px-5 py-3 text-brand-900/70">{o.productInterested || "—"}</td>
          <td className="px-5 py-3 text-brand-900/70">{o.quantityRequired || "—"}</td>
        </Row>
      ))}
    </Table>
  )
}

const ExportTab = () => {
  const { data, isLoading } = useGetAllExportInquiriesQuery()
  const [deleteExportInquiry] = useDeleteExportInquiryMutation()
  const items = data?.data || []
  if (isLoading) return <Loader label="Loading..." />
  if (!items.length) return <p className="py-10 text-center text-brand-900/60">No export inquiries yet.</p>
  return (
    <Table headers={["Company", "Country", "Email", "Product", "Qty"]}>
      {items.map((x) => (
        <Row key={x._id} onDelete={() => confirm("Delete this inquiry?") && deleteExportInquiry(x._id)}>
          <td className="px-5 py-3 font-semibold text-brand-900">{x.companyName || "—"}</td>
          <td className="px-5 py-3 text-brand-900/70">{x.country}</td>
          <td className="px-5 py-3 text-brand-900/70">{x.email}</td>
          <td className="px-5 py-3 text-brand-900/70">{x.productInterested || "—"}</td>
          <td className="px-5 py-3 text-brand-900/70">{x.quantity || "—"}</td>
        </Row>
      ))}
    </Table>
  )
}

const STATUS_OPTIONS = ["pending", "contacted", "sample-sent", "closed"]

const SampleTab = () => {
  const { data, isLoading } = useGetAllSampleRequestsQuery()
  const [deleteSampleRequest] = useDeleteSampleRequestMutation()
  const [updateStatus] = useUpdateSampleRequestStatusMutation()
  const items = data?.data || []
  if (isLoading) return <Loader label="Loading..." />
  if (!items.length) return <p className="py-10 text-center text-brand-900/60">No sample requests yet.</p>
  return (
    <Table headers={["Name", "Email", "Phone", "Product", "Status"]}>
      {items.map((s) => (
        <Row key={s._id} onDelete={() => confirm("Delete this request?") && deleteSampleRequest(s._id)}>
          <td className="px-5 py-3 font-semibold text-brand-900">{s.name}</td>
          <td className="px-5 py-3 text-brand-900/70">{s.email}</td>
          <td className="px-5 py-3 text-brand-900/70">{s.phone}</td>
          <td className="px-5 py-3 text-brand-900/70">{s.productInterested}</td>
          <td className="px-5 py-3">
            <select
              value={s.status}
              onChange={(e) => updateStatus({ id: s._id, status: e.target.value })}
              className="rounded-lg border border-brand-200 bg-white px-2 py-1 text-xs font-semibold text-brand-900"
            >
              {STATUS_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </td>
        </Row>
      ))}
    </Table>
  )
}

const Table = ({ headers, children }) => (
  <div className="overflow-x-auto rounded-2xl bg-white shadow-md shadow-brand-900/5">
    <table className="w-full text-left text-sm">
      <thead className="border-b border-brand-100 text-xs font-bold uppercase tracking-wide text-brand-900/50">
        <tr>
          {headers.map((h) => (
            <th key={h} className="px-5 py-3">
              {h}
            </th>
          ))}
          <th className="px-5 py-3"></th>
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  </div>
)

const AdminInquiries = () => {
  const [tab, setTab] = useState("contact")

  return (
    <div>
      <h1 className="mb-1 text-2xl font-bold text-brand-900">Inquiries</h1>
      <p className="mb-6 text-sm text-brand-900/60">All form submissions from the website.</p>

      <div className="mb-6 flex flex-wrap gap-2">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={clsx(
              "rounded-full px-5 py-2 text-sm font-semibold transition",
              tab === t.key ? "bg-brand-600 text-white" : "bg-brand-100 text-brand-700 hover:bg-brand-200"
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "contact" && <ContactTab />}
      {tab === "oem" && <OEMTab />}
      {tab === "export" && <ExportTab />}
      {tab === "sample" && <SampleTab />}
    </div>
  )
}

export default AdminInquiries
