// One-time reset: deletes ALL existing Product documents and replaces them
// with the 6 Makhana variants that actually appear on the site (Home page
// cards + the rest of the export range) so the DB matches the front-end
// content exactly. Local images from client/public are uploaded to
// Cloudinary. Destructive — old product _ids are gone after this runs.
//
// Usage: node scripts/replace-all-products.js   (from the server/ folder)

require("dotenv").config()
const mongoose = require("mongoose")
const path = require("path")

const Product = require("../model/Projuct")
const { cloudinary } = require("../utils/cloudinary")

const CLIENT_PUBLIC = path.join(__dirname, "..", "..", "client", "public")

const PRODUCTS = [
  {
    name: "Premium Raw Makhana",
    image: path.join(CLIENT_PUBLIC, "raw makahna.jpeg"),
    description:
      "Hand-sorted, sun-dried fox nuts with uniform pop and crisp white appearance, sourced directly from Bihar.",
    unit: "kg",
    packagingOptions: ["5 kg poly bags", "10 kg poly bags", "Master cartons"],
  },
  {
    name: "Roasted Makhana",
    image: path.join(CLIENT_PUBLIC, "Roasted Makhana.jpeg"),
    description:
      "Lightly roasted for a longer shelf life and ready-to-eat crunch, ideal for retail and HORECA buyers.",
    unit: "kg",
    packagingOptions: ["Retail pouches", "1 kg bulk packs", "5 kg bulk packs"],
  },
  {
    name: "Flavoured Makhana",
    image: path.join(CLIENT_PUBLIC, "Flavoured Makhana.jpeg"),
    description:
      "Roasted makhana tossed in signature seasonings — peri-peri, cream & onion and more, for retail snacking.",
    unit: "kg",
    packagingOptions: ["Retail pouches 100 g", "Retail pouches 200 g"],
  },
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

  const existing = await Product.find({})
  console.log(`\nDeleting ${existing.length} existing product(s):`)
  existing.forEach((p) => console.log(`  - ${p.name}`))
  await Product.deleteMany({})
  console.log("all products deleted")

  console.log("\nCreating fresh products:")
  for (const item of PRODUCTS) {
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
  console.error("Replace failed:", err)
  process.exit(1)
})
