// Updates only the Makhana-category product photos in place (by name) —
// does NOT touch Moringa/Spices/Other Agro Products, and does not delete
// or recreate documents, so existing product _ids stay stable.
//
// Fixes: "Salted Caramel Makhana" was duplicating the exact same photo as
// "Roasted Makhana Classic" — each of the 3 Makhana products now gets its
// own distinct, verified-genuine makhana photo.
//
// Usage: node scripts/reseed-makhana-products.js   (from the server/ folder)

require("dotenv").config()
const mongoose = require("mongoose")

const Product = require("../model/Projuct")
const { uploadFromUrl } = require("../utils/cloudinary")

const pexels = (id) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1200`
const unsplash = (id) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1200&q=80`

const UPDATES = [
  { name: "Roasted Makhana Classic", image: pexels("7051132") },
  { name: "Peri Peri Makhana", image: pexels("35794691") },
  { name: "Salted Caramel Makhana", image: unsplash("1710421576768-ff985fa63b60") },
]

async function run() {
  if (!process.env.MONGO_URI) {
    console.error("MONGO_URI missing in .env — aborting.")
    process.exit(1)
  }

  await mongoose.connect(process.env.MONGO_URI)
  console.log("db connected")

  for (const { name, image } of UPDATES) {
    const product = await Product.findOne({ name })
    if (!product) {
      console.log(`  skip: "${name}" not found in DB`)
      continue
    }
    process.stdout.write(`  uploading photo for "${name}"... `)
    const result = await uploadFromUrl(image, "rajmudar/products")
    product.images = [result.secure_url]
    await product.save()
    console.log("done")
  }

  console.log("\nMakhana product photos updated — Moringa/Spices/Other Agro Products untouched.")
  await mongoose.disconnect()
  process.exit(0)
}

run().catch((err) => {
  console.error("Update failed:", err)
  process.exit(1)
})
