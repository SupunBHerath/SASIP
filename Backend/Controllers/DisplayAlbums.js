import admin from '../FirebaseConfig/firebaseAdmin.js';

const db = admin.firestore();

export const getAllAlbums = async (req, res) => {
  try {
    // Fetch all album documents
    const albumsSnapshot = await db.collection('albums').get();

    if (albumsSnapshot.empty) {
      return res.status(404).send({ success: false, error: 'No albums found' });
    }

    // Array to store all album data
    const albums = [];

    for (const albumDoc of albumsSnapshot.docs) {
      const albumData = albumDoc.data();
      const albumName = albumDoc.id;

      // Fetch the images subcollection
      const imagesCollectionRef = db.collection('albums').doc(albumName).collection('images');
      const imagesSnapshot = await imagesCollectionRef.get();
      const images = imagesSnapshot.docs.map(doc => doc.data());

      albums.push({
        name: albumName,
        coverUrl: albumData.coverUrl,
        images: images.map(image => ({
          url: image.url,
          fileName: image.fileName,
          contentType: image.contentType,
          uploadedAt: image.uploadedAt,
        })),
      });
    }

    res.status(200).send({ success: true, albums });
  } catch (error) {
    console.error('Error fetching all albums:', error);
    res.status(500).send({ success: false, error: error.message });
  }
};
