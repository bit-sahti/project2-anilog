const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
})

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'Anilog-avatar-pics',
    resource_type: 'image',
    allowed_formats: ['jpg', 'png', 'jpeg'],
    use_filename: true,
    unique_filename: true,
  },
})

const uploadCloud = multer({ storage });

module.exports = uploadCloud;