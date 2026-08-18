// Removes the Showcase-sourced duplicate Gallery entries for titles that
// also exist from Products (keeps the Products copy, deletes the Showcase
// copy). One-off cleanup, not meant to be re-run generically.
//
// Usage: node scripts/remove-gallery-duplicates.js   (from the server/ folder)

require("dotenv").config()
const mongoose = require("mongoose")
const Gallery = require("../model/Gallery")

const TITLES_TO_DEDUPE = ["Roasted Makhana", "Premium Raw Makhana"]

async function run() {
  await mongoose.connect(process.env.MONGO_URI)
  console.log("db connected")

  const removed = []
  for (const title of TITLES_TO_DEDUPE) {
    const item = await Gallery.findOne({ title, category: "Showcase" })
    if (item) {
      await item.deleteOne()
      removed.push(`${title} (Showcase, ${item._id})`)
    } else {
      console.log(`No Showcase-category duplicate found for "${title}" — skipped.`)
    }
  }

  console.log(`Removed ${removed.length} duplicate(s):`)
  removed.forEach((r) => console.log("  - " + r))

  await mongoose.disconnect()
  process.exit(0)
}

run().catch((err) => {
  console.error("Cleanup failed:", err)
  process.exit(1)
})
