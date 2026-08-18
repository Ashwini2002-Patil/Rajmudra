// Pulls every image already uploaded elsewhere on the site (Products,
// Showcase Products, Certifications, Blogs) into the Gallery collection.
// Images are already on Cloudinary (uploaded when they were first added via
// the admin panel), so this just copies their URLs into Gallery — nothing
// is re-uploaded. Existing Gallery items are kept; only new (not-already-
// present) image URLs are inserted, so this is safe to re-run any time new
// content is added.
//
// Usage: node scripts/sync-gallery-from-content.js   (from the server/ folder)

require("dotenv").config()
const mongoose = require("mongoose")

const Gallery = require("../model/Gallery")
const Product = require("../model/Projuct")
const ShowcaseProduct = require("../model/ShowcaseProduct")
const Certification = require("../model/Certification")
const Blog = require("../model/Blog")

async function run() {
  if (!process.env.MONGO_URI) {
    console.error("MONGO_URI missing in .env — aborting.")
    process.exit(1)
  }

  await mongoose.connect(process.env.MONGO_URI)
  console.log("db connected")

  const candidates = []

  const products = await Product.find({})
  for (const p of products) {
    for (const img of p.images || []) {
      if (img) candidates.push({ imageUrl: img, title: p.name, category: p.category || "Product" })
    }
  }

  const showcase = await ShowcaseProduct.find({})
  for (const s of showcase) {
    if (s.image) candidates.push({ imageUrl: s.image, title: s.title, category: "Showcase" })
  }

  const certs = await Certification.find({})
  for (const c of certs) {
    if (c.certificateImage)
      candidates.push({ imageUrl: c.certificateImage, title: c.name, category: "Certification" })
  }

  const blogs = await Blog.find({})
  for (const b of blogs) {
    if (b.coverImage) candidates.push({ imageUrl: b.coverImage, title: b.title, category: "Blog" })
  }

  console.log(`Found ${candidates.length} image(s) across Products/Showcase/Certifications/Blogs.`)

  const existing = await Gallery.find({}, "imageUrl")
  const existingUrls = new Set(existing.map((g) => g.imageUrl))

  const toInsert = candidates.filter((c) => !existingUrls.has(c.imageUrl))

  // De-dupe within the batch itself too (same image reused twice on site).
  const seen = new Set()
  const deduped = toInsert.filter((c) => {
    if (seen.has(c.imageUrl)) return false
    seen.add(c.imageUrl)
    return true
  })

  if (deduped.length === 0) {
    console.log("Nothing new to add — Gallery already has all of these images.")
  } else {
    await Gallery.insertMany(deduped)
    console.log(`Inserted ${deduped.length} new image(s) into Gallery:`)
    deduped.forEach((d) => console.log(`  - [${d.category}] ${d.title}`))
  }

  const skipped = candidates.length - toInsert.length
  if (skipped > 0) console.log(`Skipped ${skipped} already in Gallery.`)

  await mongoose.disconnect()
  process.exit(0)
}

run().catch((err) => {
  console.error("Sync failed:", err)
  process.exit(1)
})
