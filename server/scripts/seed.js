// One-time / re-runnable seed script.
// Creates the first admin account (if it doesn't exist) and (re)populates
// demo Products, Blogs and Gallery items with REAL stock photos — each
// source image is uploaded through Cloudinary (not hotlinked) so the URLs
// stored in MongoDB are your own Cloudinary URLs.
//
// Usage:  npm run seed   (from the server/ folder)
// Re-running this script clears and reseeds Products/Blogs/Gallery (demo
// content only) but never touches the Admin account or real inquiries.

require("dotenv").config()
const mongoose = require("mongoose")
const crypto = require("crypto")

const Admin = require("../model/Admin")
const Product = require("../model/Projuct")
const Blog = require("../model/Blog")
const Gallery = require("../model/Gallery")
const { uploadFromUrl } = require("../utils/cloudinary")

const ADMIN_EMAIL = process.env.SEED_ADMIN_EMAIL || "adpaithane23@gmail.com"
const ADMIN_NAME = process.env.SEED_ADMIN_NAME || "Rajmudra Admin"

// Real, license-free stock photos (Pexels/Unsplash) — Cloudinary fetches
// and stores its own copy of each one during upload, so the final DB value
// is a Cloudinary secure_url, not a hotlink.
const pexels = (id) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1200`
const unsplash = (id) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1200&q=80`
const pixabay = (path) => `https://cdn.pixabay.com/photo/${path}_1280.jpg`

// Makhana-only catalog — business pivoted away from Moringa/Spices/Other
// Agro Products, so those demo entries were removed (and deleted from the
// live DB via delete-non-makhana-products.js).
const PRODUCTS = [
  { name: "Roasted Makhana Classic", category: "Makhana", price: 349, unit: "500g", description: "Lightly roasted, naturally light and crunchy foxnuts.", isFeatured: true, image: pexels(7051132) },
  { name: "Peri Peri Makhana", category: "Makhana", price: 399, unit: "500g", description: "Spicy peri-peri seasoned roasted makhana.", isFeatured: true, image: pexels(35794691) },
  { name: "Salted Caramel Makhana", category: "Makhana", price: 379, unit: "500g", description: "Sweet and salty roasted makhana snack.", image: unsplash("1710421576768-ff985fa63b60") },
]

const BLOGS = [
  {
    title: "5 Health Benefits of Makhana You Should Know",
    slug: "health-benefits-of-makhana",
    content:
      "Makhana (foxnuts) are low in calories, gluten-free and packed with protein, fibre and antioxidants. They help regulate blood sugar, support heart health, aid digestion and make for a guilt-free snack any time of day. Roasted lightly with little to no oil, this humble seed has earned its place as one of India's most versatile superfoods — equally at home in a fasting thali, a post-workout bowl, or an evening cup of tea.",
    tags: ["Health", "Makhana"],
    author: "Rajmudra Team",
    image: pexels(7051132),
  },
  {
    title: "Moringa: The Superfood Taking Over Global Kitchens",
    slug: "moringa-superfood-guide",
    content:
      "Moringa leaves are loaded with vitamins, minerals and antioxidants — often called a superfood for good reason. This guide covers how moringa powder is made, its nutritional profile and easy ways to add it to your diet.",
    tags: ["Nutrition"],
    author: "Rajmudra Team",
    image: pexels(7149595),
  },
  {
    title: "A Beginner's Guide to Exporting Agro Products from India",
    slug: "exporting-agro-products-from-india",
    content:
      "India is one of the world's largest producers of agro products. This beginner's guide walks through APEDA registration, quality certifications, packaging standards and how Rajmudra supports export partners end-to-end.",
    tags: ["Export"],
    author: "Rajmudra Team",
    image: pexels(6595779),
  },
]

// Roasted/puffed makhana only — no raw lotus pod / plant ("farming") shots.
// Every entry below was individually verified as a genuine makhana/fox-nut
// food photo, not a farm/plant shot or unrelated stock image — this is the
// full set of free, hotlink-safe photos found across Unsplash/Pexels/Pixabay.
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

async function uploadAll(items, folder) {
  const out = []
  for (const item of items) {
    const { image, ...rest } = item
    process.stdout.write(`  uploading ${rest.name || rest.title}... `)
    const result = await uploadFromUrl(image, `rajmudar/${folder}`)
    console.log("done")
    out.push({ ...rest, url: result.secure_url })
  }
  return out
}

async function run() {
  if (!process.env.MONGO_URI) {
    console.error("MONGO_URI missing in .env — aborting seed.")
    process.exit(1)
  }
  if (!process.env.CLOUDINARY_CLOUD_NAME) {
    console.error("CLOUDINARY_CLOUD_NAME missing in .env — aborting seed.")
    process.exit(1)
  }

  await mongoose.connect(process.env.MONGO_URI)
  console.log("db connected")

  // --- Admin ---
  let admin = await Admin.findOne({ email: ADMIN_EMAIL })
  if (!admin) {
    const generatedPassword = crypto.randomBytes(9).toString("base64").replace(/[/+=]/g, "").slice(0, 12)
    admin = await Admin.create({ name: ADMIN_NAME, email: ADMIN_EMAIL, password: generatedPassword })
    console.log(`\nAdmin created:\n  email: ${ADMIN_EMAIL}\n  password: ${generatedPassword}\n  (save this now — it will not be shown again)\n`)
  } else {
    console.log(`Admin already exists (${ADMIN_EMAIL}) — skipping.`)
  }

  // --- Products (real images via Cloudinary) ---
  console.log("\nUploading product images to Cloudinary...")
  const products = await uploadAll(PRODUCTS, "products")
  await Product.deleteMany({})
  await Product.insertMany(products.map((p) => ({ ...p, images: [p.url] })))
  console.log(`Products: ${products.length} inserted.`)

  // --- Blogs ---
  console.log("\nUploading blog cover images to Cloudinary...")
  const blogs = await uploadAll(BLOGS, "blogs")
  await Blog.deleteMany({})
  await Blog.insertMany(blogs.map((b) => ({ ...b, coverImage: b.url })))
  console.log(`Blogs: ${blogs.length} inserted.`)

  // --- Gallery ---
  console.log("\nUploading gallery images to Cloudinary...")
  const gallery = await uploadAll(GALLERY, "gallery")
  await Gallery.deleteMany({})
  await Gallery.insertMany(gallery.map((g) => ({ ...g, imageUrl: g.url })))
  console.log(`Gallery: ${gallery.length} inserted.`)

  console.log(
    "\nNote: Certifications were left without images — using real FSSAI/ISO/APEDA/Organic India" +
      " logos would misrepresent certifications this demo site doesn't actually hold. The" +
      " Certifications page already falls back to an icon when certificateImage is empty."
  )

  console.log("\nSeed complete — all images are now hosted on Cloudinary.")
  await mongoose.disconnect()
  process.exit(0)
}

run().catch((err) => {
  console.error("Seed failed:", err)
  process.exit(1)
})
