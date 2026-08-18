require('dotenv').config();
const mongoose = require('mongoose');

async function run() {
  await mongoose.connect(process.env.MONGO_URI);
  const db = mongoose.connection.db;
  const collections = await db.listCollections().toArray();
  let found = 0;
  for (const c of collections) {
    const name = c.name;
    const docs = await db.collection(name).find({}).limit(1000).toArray();
    for (const doc of docs) {
      const fields = ['image', 'imageUrl', 'images', 'logo', 'certificateImage', 'photo', 'thumbnail', 'coverImage'];
      for (const f of fields) {
        if (doc[f]) {
          const val = doc[f];
          const arr = Array.isArray(val) ? val : [val];
          for (const v of arr) {
            if (typeof v === 'string' && !v.includes('res.cloudinary.com')) {
              found++;
              console.log(`[${name}] _id=${doc._id} field=${f} -> ${v.substring(0,150)}`);
            }
          }
        }
      }
    }
  }
  console.log(`\nTotal non-Cloudinary image references found: ${found}`);
  await mongoose.disconnect();
}
run().catch(e => { console.error(e); process.exit(1); });
