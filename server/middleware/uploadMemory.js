// Separate from middleware/upload.js (disk storage) — this one keeps the
// file in memory so it can be streamed straight to Cloudinary without ever
// touching the server's local disk.
const multer = require('multer');

const fileFilter = (req, file, cb) => {
    const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    if (allowed.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Only image files (jpeg, png, webp) are allowed'), false);
    }
};

const uploadMemory = multer({
    storage: multer.memoryStorage(),
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

module.exports = uploadMemory;
