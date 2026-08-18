const https = require("https")
const fs = require("fs")

const url = "https://res.cloudinary.com/dba2wm4ib/image/upload/v1786868593/rajmudar/gallery/karv4itx3xizd5owmg2t.jpg"
const out = process.argv[2]

https.get(url, (res) => {
  const chunks = []
  res.on("data", (c) => chunks.push(c))
  res.on("end", () => {
    fs.writeFileSync(out, Buffer.concat(chunks))
    console.log("saved", out, Buffer.concat(chunks).length, "bytes")
  })
}).on("error", (e) => console.error("error", e))
