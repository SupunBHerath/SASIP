import multer from 'multer';
import admin from '../FirebaseConfig/firebaseAdmin.js';
import dotenv from 'dotenv';

dotenv.config();

// Configure Multer to use memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Initialize Firebase Firestore and Storage
const db = admin.firestore();
const bucket = admin.storage().bucket(process.env.FIREBASE_STORAGE_BUCKET);

// Controller to add a lecturer
const addLecturer = async (req, res) => {
  try {
    console.log('Request body:', req.body);
    console.log('Request files:', req.files);

    const {
      stream,
      experience,
      name,
      contact,
      subject,
      classType,
      medium,
      bio,
      socialMedia
    } = req.body;

    // Parse and handle JSON fields if necessary
    const parsedClassType = typeof classType === 'string' ? JSON.parse(classType) : classType;
    const parsedMedium = typeof medium === 'string' ? JSON.parse(medium) : medium;
    const parsedSocialMedia = typeof socialMedia === 'string' ? JSON.parse(socialMedia) : socialMedia;

    // Handle qualifications
    const qualifications = req.body.qualifications ? req.body.qualifications : [];

    // Generate a unique ID for the new lecturer
    const nextId = await getNextTeacherId();
    const id = `S${nextId.toString().padStart(4, '0')}`;
    let imageUrl = '';

    // Define a folder structure for the teacher's files
    const teacherFolder = `teacher/${name}`;

    // Array to hold promises for file uploads
    const uploadFiles = [];

    // Handle profile picture upload
    if (req.files && req.files['image']) {
      const imageFile = req.files['image'][0];
      const imageBlob = bucket.file(`${teacherFolder}/${imageFile.originalname}`);
      const imageBlobStream = imageBlob.createWriteStream({
        metadata: {
          contentType: imageFile.mimetype
        }
      });

      // Promise to handle the upload
      const imageUploadPromise = new Promise((resolve, reject) => {
        imageBlobStream.on('error', (err) => {
          console.error('Image upload error:', err);
          reject(err);
        });

        imageBlobStream.on('finish', async () => {
          try {
            const [url] = await imageBlob.getSignedUrl({
              action: 'read',
              expires: '03-01-2500', // Adjust expiration as needed
            });
            imageUrl = url;
            resolve();
          } catch (err) {
            console.error('Error generating signed URL:', err);
            reject(err);
          }
        });

        imageBlobStream.end(imageFile.buffer);
      });

      uploadFiles.push(imageUploadPromise);
    }

    // Handle qualifications file uploads
    qualifications.forEach((qualification, index) => {
      if (req.files && req.files[`qualifications[${index}][file]`]) {
        const file = req.files[`qualifications[${index}][file]`][0];
        const fileBlob = bucket.file(`${teacherFolder}/qualifications/${file.originalname}`);
        const fileBlobStream = fileBlob.createWriteStream({
          metadata: {
            contentType: file.mimetype
          }
        });

        const fileUploadPromise = new Promise((resolve, reject) => {
          fileBlobStream.on('error', (err) => {
            console.error('Qualification upload error:', err);
            reject(err);
          });

          fileBlobStream.on('finish', async () => {
            try {
              const [fileUrl] = await fileBlob.getSignedUrl({
                action: 'read',
                expires: '03-01-2500', // Adjust expiration as needed
              });
              qualifications[index].fileUrl = fileUrl;
              resolve();
            } catch (err) {
              console.error('Error generating signed URL:', err);
              reject(err);
            }
          });

          fileBlobStream.end(file.buffer);
        });

        uploadFiles.push(fileUploadPromise);
      }
    });

    // Wait for all file uploads to complete
    await Promise.all(uploadFiles);

    // Save lecturer data to Firestore
    await saveLecturerToFirestore(id, name, contact, stream, experience, subject, parsedClassType, parsedMedium, bio, qualifications, parsedSocialMedia, imageUrl);
    res.status(200).json({ message: 'Lecturer added successfully' });

  } catch (error) {
    console.error('Error in addLecturer:', error);
    res.status(500).json({ error: error.message });
  }
};

// Controller to delete a lecturer
const deleteLecturer = async (req, res) => {
  const { id } = req.params;

  try {
    // Delete lecturer document from Firestore
    await db.collection('lecturers').doc(id).delete();

    // Decrement the teacher ID counter
    const counterRef = db.collection('counters').doc('teachers');
    await db.runTransaction(async (transaction) => {
      const counterDoc = await transaction.get(counterRef);
      if (!counterDoc.exists) {
        throw new Error('Counter document does not exist!');
      }

      const currentId = counterDoc.data().currentId || 0;
      if (currentId > 0) {
        transaction.update(counterRef, { currentId: currentId - 1 });
      }
    });

    res.status(200).json({ message: 'Lecturer deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Function to get the next teacher ID
async function getNextTeacherId() {
  const counterRef = db.collection('counters').doc('teachers');
  let currentId = 0;

  await db.runTransaction(async (transaction) => {
    const counterDoc = await transaction.get(counterRef);
    if (!counterDoc.exists) {
      await transaction.set(counterRef, { currentId: 0 });
    }

    currentId = counterDoc.exists ? counterDoc.data().currentId : 0;
    transaction.update(counterRef, { currentId: currentId + 1 });
  });

  const counterDoc = await counterRef.get();
  return counterDoc.data().currentId;
}

// Function to save lecturer details to Firestore
async function saveLecturerToFirestore(id, name, contact, stream, experience, subject, classType, medium, bio, qualifications, socialMedia, imageUrl) {
  console.log('Saving lecturer to Firestore with ID:', id);
  console.log('Lecturer details:', { id, name, contact, subject, experience, stream, classType, medium, bio, qualifications, socialMedia, imageUrl });
  
  await db.collection('lecturers').doc(id).set({
    id,
    name,
    contact,
    subject,
    classType,
    medium,
    bio,
    qualifications,
    socialMedia,
    imageUrl,
    visible: true,
    rank: 1,
    experience,
    stream,
  });
}

export { upload, addLecturer, deleteLecturer };
