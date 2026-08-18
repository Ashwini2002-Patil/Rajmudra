const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const path = require("path")
require("dotenv").config()

const app = express()

// Increase payload size limit for base64 images
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))
app.use(cookieParser())
app.use(cors({ origin: "http://localhost:5173", credentials: true }))

// Serve uploaded images statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")))

app.use('/api/auth', require('./routes/authRoute'));
app.use('/api/products', require('./routes/productRoute'));
app.use('/api/blogs', require('./routes/blogRoute'));
app.use('/api/gallery', require('./routes/galleryRoute'));
app.use('/api/certifications', require('./routes/certificationRoute'));
app.use('/api/contact', require('./routes/contactRoute'));
app.use('/api/oem-inquiry', require('./routes/oemRoute'));
app.use('/api/export-inquiry', require('./routes/exportRoute'));
app.use('/api/sample-request', require('./routes/sampleRoute'));
app.use('/api/upload', require('./routes/uploadRoute'));
app.use('/api/process-steps', require('./routes/processStepRoute'));
app.use('/api/showcase-products', require('./routes/showcaseProductRoute'));


app.use((req, res) => {
    res.status(404).json({ message: "not found url" })
})
app.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({ message: "server error" })
})



mongoose.connect(process.env.MONGO_URI)
mongoose.connection.once("open", () => {
    console.log("db connected")

    app.listen(process.env.PORT, console.log("server running", process.env.PORT))
})

module.exports = app