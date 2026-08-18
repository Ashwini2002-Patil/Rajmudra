import { useState } from "react"
import { Formik, Form } from "formik"
import { FiPlus, FiTrash2, FiX } from "react-icons/fi"
import FormField from "../../components/forms/FormField"
import ImageUploadField from "../../components/forms/ImageUploadField"
import Button from "../../components/common/Button"
import Loader from "../../components/common/Loader"
import { useGetAllBlogsQuery, useCreateBlogMutation, useDeleteBlogMutation } from "../../redux/api/blogApi"
import { toFormData } from "../../utils/toFormData"

const slugify = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")

const initialValues = { title: "", slug: "", content: "", coverImage: "", author: "", tags: "" }

const AdminBlogs = () => {
  const { data, isLoading } = useGetAllBlogsQuery()
  const [createBlog, { isLoading: isCreating, error }] = useCreateBlogMutation()
  const [deleteBlog] = useDeleteBlogMutation()
  const [showForm, setShowForm] = useState(false)

  const blogs = data?.data || []

  const handleSubmit = (values, { resetForm }) => {
    const payload = toFormData({
      ...values,
      slug: values.slug || slugify(values.title),
      tags: values.tags ? values.tags.split(",").map((s) => s.trim()).filter(Boolean) : [],
    })
    createBlog(payload)
      .unwrap()
      .then(() => {
        resetForm()
        setShowForm(false)
      })
      .catch(() => {})
  }

  const handleDelete = (id) => {
    if (confirm("Delete this blog post?")) deleteBlog(id)
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-brand-900">Blog Posts</h1>
          <p className="text-sm text-brand-900/60">{blogs.length} post(s)</p>
        </div>
        <Button variant="primary" onClick={() => setShowForm((s) => !s)}>
          {showForm ? <FiX /> : <FiPlus />}
          {showForm ? "Cancel" : "Add Post"}
        </Button>
      </div>

      {showForm && (
        <div className="mb-8 rounded-2xl bg-white p-6 shadow-md shadow-brand-900/5">
          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            <Form className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <FormField label="Title" name="title" required />
                <FormField label="Slug (optional, auto-generated)" name="slug" placeholder="auto from title" />
              </div>
              <FormField label="Content" name="content" as="textarea" required />
              <ImageUploadField label="Cover Image" name="coverImage" folder="blogs" />
              <FormField label="Author" name="author" />
              <FormField label="Tags (comma separated)" name="tags" placeholder="Health, Nutrition" />
              {error && (
                <p className="text-sm font-semibold text-red-600">
                  {error?.data?.message || "Failed to create blog post"}
                </p>
              )}
              <Button type="submit" variant="primary" disabled={isCreating}>
                {isCreating ? "Saving..." : "Save Post"}
              </Button>
            </Form>
          </Formik>
        </div>
      )}

      {isLoading ? (
        <Loader label="Loading blog posts..." />
      ) : blogs.length === 0 ? (
        <p className="py-10 text-center text-brand-900/60">No blog posts yet.</p>
      ) : (
        <div className="overflow-x-auto rounded-2xl bg-white shadow-md shadow-brand-900/5">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-brand-100 text-xs font-bold uppercase tracking-wide text-brand-900/50">
              <tr>
                <th className="px-5 py-3">Title</th>
                <th className="px-5 py-3">Slug</th>
                <th className="px-5 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((b) => (
                <tr key={b._id} className="border-b border-brand-50 last:border-0">
                  <td className="px-5 py-3 font-semibold text-brand-900">{b.title}</td>
                  <td className="px-5 py-3 text-brand-900/70">{b.slug}</td>
                  <td className="px-5 py-3 text-right">
                    <button
                      onClick={() => handleDelete(b._id)}
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

export default AdminBlogs
