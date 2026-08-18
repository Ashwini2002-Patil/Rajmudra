// One-time cleanup: business is pivoting to Makhana-only. Permanently
// deletes the non-Makhana products from the database. Does not touch
// Blogs, Gallery, or the Admin account.
//
// Usage: node scripts/delete-non-makhana-products.js   (from the server/ folder)

require("dotenv").config()
const mongoose = require("mongoose")

const Product = require("../model/Projuct")

async function run() {
  if (!process.env.MONGO_URI) {
    console.error("MONGO_URI missing in .env — aborting.")
    process.exit(1)
  }

  await mongoose.connect(process.env.MONGO_URI)
  console.log("db connected")

  const toDelete = await Product.find({ category: { $ne: "Makhana" } })
  console.log(`\nDeleting ${toDelete.length} non-Makhana product(s):`)
  toDelete.forEach((p) => console.log(`  - [${p.category}] ${p.name}`))

  const result = await Product.deleteMany({ category: { $ne: "Makhana" } })
  console.log(`\n${result.deletedCount} product(s) deleted.`)

  const remaining = await Product.find({})
  console.log(`\nRemaining products (${remaining.length}):`)
  remaining.forEach((p) => console.log(`  - [${p.category}] ${p.name}`))

  await mongoose.disconnect()
  process.exit(0)
}

run().catch((err) => {
  console.error("Cleanup failed:", err)
  process.exit(1)
})
