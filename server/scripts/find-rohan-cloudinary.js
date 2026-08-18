require("dotenv").config()
const { cloudinary } = require("../utils/cloudinary")

async function run() {
  // Search Cloudinary directly (not just DB) for anything with "rohan" in
  // its filename/public_id/context, in case it was uploaded but never saved
  // to a Mongo record.
  const result = await cloudinary.search
    .expression("filename:rohan*")
    .max_results(30)
    .execute()

  console.log("Matches for filename:rohan* ->", result.total_count)
  result.resources.forEach((r) => console.log(" ", r.public_id, "|", r.secure_url, "|", r.created_at))

  // Fallback: list everything uploaded recently across the whole account so
  // we can eyeball it if the filename search finds nothing.
  const recent = await cloudinary.api.resources({ type: "upload", max_results: 30, direction: "desc" })
  console.log("\nMost recent uploads in account:")
  recent.resources.forEach((r) => console.log(" ", r.public_id, "|", r.created_at))
}
run().catch((e) => {
  console.error("Cloudinary search failed:", e.message || e)
  process.exit(1)
})
