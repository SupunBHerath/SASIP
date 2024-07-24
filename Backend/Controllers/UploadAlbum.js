import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import admin from '../FirebaseConfig/firebaseAdmin.js';

const bucket = admin.storage().bucket();

export const uploadAlbum = async (req, res) => {
  try {
    const { name } = req.body;
    const files = req.files;

    if (!name || !files || !Array.isArray(files) || files.length === 0) {
      return res.status(400).send({ success: false, error: 'Invalid album data' });
    }

    // Extract cover photo and other images
    const coverPhoto = files[0]; // Assuming the first file is the cover photo
    const otherImages = files.slice(1);

    // Upload cover photo
    const { originalname: coverName, buffer: coverBuffer, mimetype: coverMimetype } = coverPhoto;
    const coverBlob = bucket.file(`albums/${name}/cover${path.extname(coverName)}`);
    const coverBlobStream = coverBlob.createWriteStream({
      metadata: {
        contentType: coverMimetype,
      },
    });

    await new Promise((resolve, reject) => {
      coverBlobStream.on('finish', resolve);
      coverBlobStream.on('error', reject);
      coverBlobStream.end(coverBuffer);
    });

    const [coverUrl] = await coverBlob.getSignedUrl({
      action: 'read',
      expires: '03-01-2500',
    });

    // Reference to the album document
    const albumRef = admin.firestore().collection('albums').doc(name);

    // Create or get the images subcollection under the album document
    const imagesCollectionRef = albumRef.collection('images');

    // Array to store image URLs
    const imageUrls = [];

    for (const file of otherImages) {
      const { originalname, buffer, mimetype } = file;

      // Generate a unique file name
      const blob = bucket.file(`albums/${name}/${uuidv4()}${path.extname(originalname)}`);
      const blobStream = blob.createWriteStream({
        metadata: {
          contentType: mimetype,
        },
      });

      await new Promise((resolve, reject) => {
        blobStream.on('finish', resolve);
        blobStream.on('error', reject);
        blobStream.end(buffer);
      });

      const [url] = await blob.getSignedUrl({
        action: 'read',
        expires: '03-01-2500',
      });

      imageUrls.push(url);

      // Add image data to the images subcollection
      await imagesCollectionRef.add({
        url,
        fileName: originalname,
        contentType: mimetype,
        uploadedAt: admin.firestore.FieldValue.serverTimestamp(),
      });
    }

    // Update the album document with the cover URL and image URLs
    await albumRef.set({
      coverUrl,
      images: imageUrls,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    }, { merge: true });

    res.status(200).send({ success: true, album: { name, coverUrl, images: imageUrls } });
  } catch (error) {
    console.error('Error uploading album:', error);
    res.status(500).send({ success: false, error: error.message });
  }
};
