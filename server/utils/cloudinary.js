const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload a Buffer (e.g. from multer memoryStorage) to Cloudinary.
const uploadBuffer = (buffer, folder = 'rajmudar') =>
    new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream({ folder }, (error, result) => {
            if (error) return reject(error);
            resolve(result);
        });
        stream.end(buffer);
    });

// Upload directly from a remote URL (Cloudinary fetches it server-side).
// Used by the seed script to pull real stock photos into Cloudinary.
const uploadFromUrl = (url, folder = 'rajmudar') =>
    cloudinary.uploader.upload(url, { folder });

module.exports = { cloudinary, uploadBuffer, uploadFromUrl };
