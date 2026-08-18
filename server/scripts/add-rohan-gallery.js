require("dotenv").config()
const mongoose = require("mongoose")
const Gallery = require("../model/Gallery")

const IMAGE_URL =
  "https://res.cloudinary.com/dba2wm4ib/image/upload/v1786868593/rajmudar/gallery/karv4itx3xizd5owmg2t.jpg"

async function run() {
  await mongoose.connect(process.env.MONGO_URI)
  console.log("db connected")

  const existing = await Gallery.findOne({ imageUrl: IMAGE_URL })
  if (existing) {
    console.log("Already in Gallery:", existing._id.toString())
  } else {
    const item = await Gallery.create({
      title: "Rohan",
      category: "Office",
      imageUrl: IMAGE_URL,
    })
    console.log("Inserted:", item._id.toString(), item.title, item.category)
  }

  await mongoose.disconnect()
  process.exit(0)
}

run().catch((err) => {
  console.error("Insert failed:", err)
  process.exit(1)
})
