import admin from '../FirebaseConfig/firebaseAdmin.js';
import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const db = admin.firestore();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadMiddleware = upload.array('images');

const handler = async (req, res) => {
  switch (req.method) {
    case 'POST':
      return uploadMiddleware(req, res, async (err) => {
        if (err) {
          return res.status(500).json({ success: false, error: err.message });
        }
        return await addImages(req, res);
      });
    case 'DELETE':
      return await deleteImage(req, res);
    default:
      res.setHeader('Allow', ['POST', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

const addImages = async (req, res) => {
  try {
    const { albumId } = req.body;

    if (!albumId) {
      return res.status(400).json({ success: false, error: 'Album ID is required' });
    }

    const albumRef = db.collection('albums').doc(albumId);

    for (const file of req.files) {
      const fileName = `${uuidv4()}${path.extname(file.originalname)}`;
      const filePath = `albums/${albumId}/${fileName}`; // Adjust the path here
      const fileRef = albumRef.collection('images').doc(fileName);

      const blob = admin.storage().bucket().file(filePath);

      await blob.save(file.buffer, {
        metadata: {
          contentType: file.mimetype,
        },
      });

      const [imageUrl] = await blob.getSignedUrl({
        action: 'read',
        expires: '03-01-2500',
      });

      await fileRef.set({
        url: imageUrl,
        fileName: fileName,
        contentType: file.mimetype,
        uploadedAt: new Date().toISOString(),
      });
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error adding images:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

const deleteImage = async (req, res) => {
  try {
    const { albumId, imageSrc } = req.body;

    if (!albumId || !imageSrc) {
      return res.status(400).json({ success: false, error: 'Album ID and image source are required' });
    }

    // Decode the imageSrc URL to get the image path relative to the bucket
    const decodedImageSrc = decodeURIComponent(imageSrc);
    const bucketName = process.env.FIREBASE_STORAGE_BUCKET;

    if (!decodedImageSrc.includes(bucketName)) {
      return res.status(400).json({ success: false, error: 'Invalid image source URL' });
    }

    // Extract the image path relative to the bucket
    const imagePath = decodedImageSrc.split(`${bucketName}/`)[1];

    if (!imagePath) {
      return res.status(400).json({ success: false, error: 'Invalid image source URL' });
    }

    // Construct the full file path in Firebase Storage
    const filePath = `albums/${albumId}/${path.basename(imagePath)}`;

    // Reference the album and image document in Firestore
    const albumRef = db.collection('albums').doc(albumId);
    const imageRef = albumRef.collection('images').doc(path.basename(imagePath));

    // Delete the image document from Firestore
    await imageRef.delete();

    // Delete the image file from Firebase Storage
    const file = admin.storage().bucket().file(filePath);
    const [exists] = await file.exists();
    if (exists) {
      await file.delete();
      res.status(200).json({ success: true });
    } else {
      console.error('Image file not found in storage:', filePath);
      res.status(404).json({ success: false, error: 'Image file not found in storage' });
    }
  } catch (error) {
    console.error('Error deleting image:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};



export default handler;
