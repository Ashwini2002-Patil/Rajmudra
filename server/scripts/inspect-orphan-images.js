require("dotenv").config()
const { cloudinary } = require("../utils/cloudinary")

const IDS = [
  "rajmudar/gallery/karv4itx3xizd5owmg2t",
  "rajmudar/gallery/ltitifcj3ssfma0f1uha",
  "rajmudar/gallery/pdbf85sljsj8sm5sicpm",
]

async function run() {
  for (const id of IDS) {
    try {
      const r = await cloudinary.api.resource(id, { context: true, image_metadata: true })
      console.log(id)
      console.log("  original_filename:", r.original_filename)
      console.log("  created_at:", r.created_at)
      console.log("  bytes:", r.bytes, "| dims:", r.width + "x" + r.height)
      console.log("  context:", JSON.stringify(r.context || {}))
      console.log("  url:", r.secure_url)
      console.log()
    } catch (e) {
      console.log(id, "-> error:", e.message || e)
    }
  }
}
run()
