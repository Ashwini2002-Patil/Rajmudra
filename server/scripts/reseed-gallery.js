// Re-runnable, Gallery-only reseed script — replaces Gallery items without
// touching Products, Blogs or the Admin account (unlike the full seed.js).
// Keep this list in sync with the GALLERY constant in seed.js.
//
// Usage: node scripts/reseed-gallery.js   (from the server/ folder)

require("dotenv").config()
const mongoose = require("mongoose")

const Gallery = require("../model/Gallery")
const { uploadFromUrl } = require("../utils/cloudinary")

const unsplash = (id) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1200&q=80`
const pexels = (id) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1200`
const pixabay = (path) => `https://cdn.pixabay.com/photo/${path}_1280.jpg`

// Roasted/puffed makhana only — no raw lotus pod / plant ("farming") shots.
// Every entry below was individually verified (fetched + described) as a
// genuine makhana/fox-nut food photo, not a farm/plant shot or unrelated
// stock image — this is the full set of free, hotlink-safe photos found.
const GALLERY = [
  { image: unsplash("1710421576768-ff985fa63b60"), title: "Roasted Makhana", category: "Makhana" },
  { image: pexels("7051132"), title: "Makhana Snack Bowl", category: "Makhana" },
  { image: pexels("35794691"), title: "Premium Makhana", category: "Makhana" },
  { image: pixabay("2022/08/23/08/39/fox-nuts-7405344"), title: "Fox Nuts Close-Up", category: "Makhana" },
  { image: pixabay("2026/01/27/04/33/lotus-seed-10089952"), title: "Puffed Lotus Seeds", category: "Makhana" },
  { image: pixabay("2022/04/19/15/27/fox-nuts-7143174"), title: "Makhana Bowl", category: "Makhana" },
  { image: pixabay("2022/04/19/15/28/fox-nuts-7143179"), title: "Makhana Seeds", category: "Makhana" },
  { image: pixabay("2022/04/19/15/26/fox-nuts-7143172"), title: "Roasted Makhana Bowl", category: "Makhana" },
]

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

  console.log("\nUploading gallery images to Cloudinary...")
  const uploaded = []
  for (const item of GALLERY) {
    const { image, ...rest } = item
    process.stdout.write(`  uploading ${rest.title}... `)
    const result = await uploadFromUrl(image, "rajmudar/gallery")
    console.log("done")
    uploaded.push({ ...rest, imageUrl: result.secure_url })
  }

  await Gallery.deleteMany({})
  await Gallery.insertMany(uploaded)
  console.log(`\nGallery: ${uploaded.length} item(s) inserted (all makhana-related).`)

  await mongoose.disconnect()
  process.exit(0)
}

run().catch((err) => {
  console.error("Reseed failed:", err)
  process.exit(1)
})
