require("dotenv").config()
const mongoose = require("mongoose")
const Gallery = require("../model/Gallery")

async function run() {
  await mongoose.connect(process.env.MONGO_URI)
  const items = await Gallery.find({}).sort({ createdAt: 1 })
  items.forEach((i) => console.log(i._id.toString(), "|", i.category, "|", i.title, "|", i.imageUrl))
  console.log("Total:", items.length)
  await mongoose.disconnect()
  process.exit(0)
}
run()
