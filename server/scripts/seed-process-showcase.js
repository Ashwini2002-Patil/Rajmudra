// Re-runnable seed for ProcessStep (About page "Our Process") and
// ShowcaseProduct (Home page "Export-Grade Makhana Range") — uploads the
// real photos already sitting in client/public to Cloudinary and inserts
// the matching content, replacing the hardcoded frontend arrays.
//
// Usage: node scripts/seed-process-showcase.js   (from the server/ folder)

require("dotenv").config()
const mongoose = require("mongoose")
const fs = require("fs")
const path = require("path")

const ProcessStep = require("../model/ProcessStep")
const ShowcaseProduct = require("../model/ShowcaseProduct")
const { uploadBuffer } = require("../utils/cloudinary")

const PUBLIC_DIR = path.join(__dirname, "..", "..", "client", "public")
const localFile = (name) => path.join(PUBLIC_DIR, name)

const PROCESS_STEPS = [
  {
    title: "Strategic Sourcing",
    description: "Makhana sourced through our network of trusted and verified suppliers.",
    icon: "mapPin",
    order: 1,
    file: "strategic sourcing.jpeg",
  },
  {
    title: "Quality Selection",
    description: "We select suitable grades, sizes and quality according to buyer requirements.",
    icon: "filter",
    order: 2,
    file: "quality selection.jpeg",
  },
  {
    title: "Quality Inspection",
    description: "Product quality, specifications and packaging requirements are checked before dispatch.",
    icon: "shield",
    order: 3,
    file: "quality inspection.jpeg",
  },
  {
    title: "Processing & Customization",
    description: "Plain or flavoured Makhana, bulk packing and private-label options arranged as per requirement.",
    icon: "settings",
    order: 4,
    file: "processing and customization.jpeg",
  },
  {
    title: "Export-Ready Packaging",
    description: "Packaging, labelling and documentation coordinated according to destination-market requirements.",
    icon: "package",
    order: 5,
    file: "export ready packaging.jpeg",
  },
  {
    title: "Export & Delivery",
    description: "Reliable logistics and export documentation coordinated for smooth international delivery.",
    icon: "truck",
    order: 6,
    file: "export and delivery.jpeg",
  },
]

const SHOWCASE_PRODUCTS = [
  {
    title: "Premium Raw Makhana",
    description:
      "Hand-sorted, sun-dried fox nuts with uniform pop and crisp white appearance, sourced directly from Bihar.",
    order: 1,
    file: "raw makahna.jpeg",
    specs: [
      { label: "Grades", value: "4 Suta, 5 Suta, 6 Suta, Jumbo" },
      { label: "MOQ", value: "1,000 kg" },
      { label: "Packaging", value: "5 kg / 10 kg poly bags in master cartons" },
    ],
  },
  {
    title: "Roasted Makhana",
    description:
      "Lightly roasted for a longer shelf life and ready-to-eat crunch, ideal for retail and HORECA buyers.",
    order: 2,
    file: "Roasted Makhana.jpeg",
    specs: [
      { label: "Grades", value: "5 Suta, 6 Suta, Jumbo" },
      { label: "MOQ", value: "500 kg" },
      { label: "Packaging", value: "Retail pouches, 1 kg / 5 kg bulk packs" },
    ],
  },
  {
    title: "Flavoured Makhana",
    description:
      "Roasted makhana tossed in signature seasonings — peri-peri, cream & onion and more, for retail snacking.",
    order: 3,
    file: "Flavoured Makhana.jpeg",
    specs: [
      { label: "Grades", value: "5 Suta, 6 Suta" },
      { label: "MOQ", value: "500 kg" },
      { label: "Packaging", value: "Retail pouches, 100 g / 200 g" },
    ],
  },
]

async function uploadLocal(fileName, folder) {
  const filePath = localFile(fileName)
  if (!fs.existsSync(filePath)) {
    throw new Error(`Local file not found: ${filePath}`)
  }
  const buffer = fs.readFileSync(filePath)
  return uploadBuffer(buffer, folder)
}

async function run() {
  if (!process.env.MONGO_URI) {
    console.error("MONGO_URI missing in .env — aborting.")
    process.exit(1)
  }
  if (!process.env.CLOUDINARY_CLOUD_NAME) {
    console.error("CLOUDINARY_CLOUD_NAME missing in .env — aborting.")
    process.exit(1)
  }

  await mongoose.connect(process.env.MONGO_URI)
  console.log("db connected")

  console.log("\nUploading process step photos to Cloudinary...")
  const steps = []
  for (const step of PROCESS_STEPS) {
    const { file, ...rest } = step
    process.stdout.write(`  uploading ${rest.title}... `)
    const result = await uploadLocal(file, "rajmudar/process-steps")
    console.log("done")
    steps.push({ ...rest, image: result.secure_url })
  }
  await ProcessStep.deleteMany({})
  await ProcessStep.insertMany(steps)
  console.log(`Process steps: ${steps.length} inserted.`)

  console.log("\nUploading showcase product photos to Cloudinary...")
  const products = []
  for (const product of SHOWCASE_PRODUCTS) {
    const { file, ...rest } = product
    process.stdout.write(`  uploading ${rest.title}... `)
    const result = await uploadLocal(file, "rajmudar/showcase-products")
    console.log("done")
    products.push({ ...rest, image: result.secure_url })
  }
  await ShowcaseProduct.deleteMany({})
  await ShowcaseProduct.insertMany(products)
  console.log(`Showcase products: ${products.length} inserted.`)

  await mongoose.disconnect()
  process.exit(0)
}

run().catch((err) => {
  console.error("Seed failed:", err)
  process.exit(1)
})
