import express from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// 1. Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 2. Configure Multer (Use memory storage so we don't save files to disk first)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// 3. The Upload Route
router.post('/', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }

    // Convert buffer to Base64 string to send to Cloudinary
    const b64 = Buffer.from(req.file.buffer).toString('base64');
    let dataURI = "data:" + req.file.mimetype + ";base64," + b64;

    const result = await cloudinary.uploader.upload(dataURI, {
      folder: 'vexelmart_products', // Optional: Folder name in Cloudinary
    });

    // Send back the secure URL
    res.send({
      message: 'Image uploaded',
      image: result.secure_url,
    });
    
  } catch (error) {
    console.error(error);
    res.status(500).send('Upload failed');
  }
});

export default router;