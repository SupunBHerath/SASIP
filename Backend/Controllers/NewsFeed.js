import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import admin from '../FirebaseConfig/firebaseAdmin.js';
import multer from 'multer';
import { promisify } from 'util';

const bucket = admin.storage().bucket();
const upload = multer({ storage: multer.memoryStorage() }); // Use memory storage for file handling

const initializeCounter = async () => {
    try {
        const counterRef = admin.firestore().collection('news').doc('counters');
        const doc = await counterRef.get();
        
        if (!doc.exists) {
            await counterRef.set({ lastId: 0 });
            console.log('Counter initialized.');
        }
    } catch (error) {
        console.error('Error initializing counter:', error);
        throw error;
    }
};

const getNextNewsId = async () => {
    try {
        await initializeCounter(); // Ensure the counter document exists

        const counterRef = admin.firestore().collection('news').doc('counters');
        const doc = await counterRef.get();
        
        if (!doc.exists) {
            throw new Error('Counter document does not exist.');
        }

        const lastId = doc.data().lastId;
        const nextId = lastId + 1;
        const formattedId = `N${nextId.toString().padStart(4, '0')}`;

        await counterRef.update({ lastId: nextId });

        return formattedId;
    } catch (error) {
        console.error('Error getting next news ID:', error);
        throw error;
    }
};

export const uploadNews = async (req, res) => {
    try {
        console.log('Request body:', req.body);
        console.log('Request files:', req.files);

        const { lid, title, description, status, count, btnStatus } = req.body;
        const imageFile = req.files && req.files.image ? req.files.image[0] : null;

        if (!lid || !title || !description || !status || !btnStatus) {
            return res.status(400).send({ success: false, error: 'Missing required news data' });
        }

        const newsId = await getNextNewsId();

        let imageUrl = '';
        if (imageFile) {
            const { originalname, buffer, mimetype } = imageFile;
            const blob = bucket.file(`news/${lid}/${uuidv4()}${path.extname(originalname)}`);
            const blobStream = blob.createWriteStream({
                metadata: {
                    contentType: mimetype,
                },
            });

            await promisify(blobStream.end.bind(blobStream))(buffer);

            const [url] = await blob.getSignedUrl({
                action: 'read',
                expires: '03-01-2500',
            });

            imageUrl = url;
        }

        const newsRef = admin.firestore().collection('news').doc(newsId);

        // Check if news with this ID already exists
        const doc = await newsRef.get();
        if (doc.exists) {
            return res.status(400).send({ success: false, error: 'News item with this ID already exists' });
        }

        await newsRef.set({
            newsId,
            lid,
            title,
            description,
            status,
            count: parseInt(count, 10),
            btnStatus,
            imageUrl,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        });

        res.status(200).send({ success: true, news: { newsId, lid, title, description, status, count, btnStatus, imageUrl } });
    } catch (error) {
        console.error('Error uploading news:', error);
        res.status(500).send({ success: false, error: error.message });
    }
};



export const getAllNews = async (req, res) => {
    try {
        const newsCollection = admin.firestore().collection('news');
        const snapshot = await newsCollection.get();

        if (snapshot.empty) {
            return res.status(404).send({ success: false, message: 'No news found' });
        }

        const newsList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        res.status(200).send({ success: true, news: newsList });
    } catch (error) {
        console.error('Error fetching news:', error);
        res.status(500).send({ success: false, error: error.message });
    }
};
