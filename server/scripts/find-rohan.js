require("dotenv").config()
const mongoose = require("mongoose")

const Product = require("../model/Projuct")
const ShowcaseProduct = require("../model/ShowcaseProduct")
const Certification = require("../model/Certification")
const Blog = require("../model/Blog")
const Gallery = require("../model/Gallery")

async function run() {
  await mongoose.connect(process.env.MONGO_URI)
  console.log("db connected\n")

  const re = /rohan/i

  const products = await Product.find({ $or: [{ name: re }, { description: re }] })
  console.log("Products matching 'rohan':", products.length)
  products.forEach((p) => console.log(" ", p._id.toString(), p.name, p.images))

  const showcase = await ShowcaseProduct.find({ $or: [{ title: re }, { description: re }] })
  console.log("\nShowcaseProducts matching:", showcase.length)
  showcase.forEach((s) => console.log(" ", s._id.toString(), s.title, s.image))

  const certs = await Certification.find({ $or: [{ name: re }, { issuedBy: re }, { description: re }] })
  console.log("\nCertifications matching:", certs.length)
  certs.forEach((c) => console.log(" ", c._id.toString(), c.name, c.certificateImage))

  const blogs = await Blog.find({ $or: [{ title: re }, { content: re }, { author: re }] })
  console.log("\nBlogs matching:", blogs.length)
  blogs.forEach((b) => console.log(" ", b._id.toString(), b.title, b.coverImage))

  const gallery = await Gallery.find({ $or: [{ title: re }, { category: re }] })
  console.log("\nGallery matching:", gallery.length)
  gallery.forEach((g) => console.log(" ", g._id.toString(), g.title, g.imageUrl))

  // Also list ALL certifications (in case "rohan" is a person on a cert not matched)
  const allCerts = await Certification.find({})
  console.log("\nAll Certifications (" + allCerts.length + "):")
  allCerts.forEach((c) => console.log(" ", c._id.toString(), c.name, "|", c.certificateImage))

  await mongoose.disconnect()
  process.exit(0)
}
run()
