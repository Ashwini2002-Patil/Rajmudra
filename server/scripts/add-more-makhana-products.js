// One-time seed: adds the remaining 3 Makhana product variants (Organic,
// Bulk Export Packs, Private Label) to the DB as real Product documents so
// they show up on /products and in the Admin panel. Local images from
// client/public are uploaded to Cloudinary first. Skips any product whose
// name already exists, so it's safe to re-run.
//
// Usage: node scripts/add-more-makhana-products.js   (from the server/ folder)

require("dotenv").config()
const mongoose = require("mongoose")
const path = require("path")

const Product = require("../model/Projuct")
const { cloudinary } = require("../utils/cloudinary")

const CLIENT_PUBLIC = path.join(__dirname, "..", "..", "client", "public")

const NEW_PRODUCTS = [
  {
    name: "Organic Makhana",
    image: path.join(CLIENT_PUBLIC, "Organic Makhana.jpeg"),
    description:
      "Certified organic fox nuts grown without synthetic inputs, for health-focused retail and export buyers.",
    unit: "kg",
    packagingOptions: ["5 kg poly bags", "Master cartons"],
  },
  {
    name: "Bulk Export Packs",
    image: path.join(CLIENT_PUBLIC, "Bulk Export Packs.jpeg"),
    description: "Large-format packaging built for container loading and long-distance export logistics.",
    unit: "kg",
    packagingOptions: ["20 kg export cartons", "25 kg export cartons"],
  },
  {
    name: "Private Label Makhana",
    image: path.join(CLIENT_PUBLIC, "Private Label Makhana.jpeg"),
    description: "Custom branding and packaging for OEM partners who want to sell under their own label.",
    unit: "kg",
    packagingOptions: ["Custom-branded pouches"],
  },
]

async function run() {
  if (!process.env.MONGO_URI) {
    console.error("MONGO_URI missing in .env — aborting.")
    process.exit(1)
  }

  await mongoose.connect(process.env.MONGO_URI)
  console.log("db connected")

  for (const item of NEW_PRODUCTS) {
    const existing = await Product.findOne({ name: item.name })
    if (existing) {
      console.log(`  skip: "${item.name}" already exists`)
      continue
    }

    process.stdout.write(`  uploading photo for "${item.name}"... `)
    const result = await cloudinary.uploader.upload(item.image, { folder: "rajmudar/products" })
    console.log("done")

    await Product.create({
      name: item.name,
      category: "Makhana",
      description: item.description,
      images: [result.secure_url],
      unit: item.unit,
      packagingOptions: item.packagingOptions,
      isFeatured: false,
    })
    console.log(`  created: "${item.name}"`)
  }

  const all = await Product.find({})
  console.log(`\nTotal products in DB now: ${all.length}`)
  all.forEach((p) => console.log(`  - [${p.category}] ${p.name}`))

  await mongoose.disconnect()
  process.exit(0)
}

run().catch((err) => {
  console.error("Seed failed:", err)
  process.exit(1)
})
