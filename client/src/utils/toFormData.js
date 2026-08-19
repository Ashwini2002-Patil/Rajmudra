// Builds a multipart FormData object from a plain values object so a form's
// text fields and its picked image File can be sent to the backend in one
// request (the entity's own controller uploads the file to Cloudinary as
// part of creating/updating that record). Arrays/objects are JSON-encoded
// as text fields since multipart only carries strings and files — the
// corresponding backend controller decodes them back with JSON.parse.
export const toFormData = (values) => {
  const formData = new FormData()

  Object.entries(values).forEach(([key, value]) => {
    if (value === undefined || value === null) return

    if (value instanceof File) {
      formData.append(key, value)
    } else if (Array.isArray(value) || typeof value === "object") {
      formData.append(key, JSON.stringify(value))
    } else {
      formData.append(key, value)
    }
  })

  return formData
}
