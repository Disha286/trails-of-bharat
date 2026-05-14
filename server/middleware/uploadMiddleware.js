import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';

const storage = multer.memoryStorage();
export const upload = multer({ storage });

export const uploadToCloudinary = async (fileBuffer, mimetype) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: 'trails-of-bharat',
        resource_type: 'image',
        transformation: [{ width: 1200, crop: 'limit' }]
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    stream.end(fileBuffer);
  });
};

export { cloudinary };