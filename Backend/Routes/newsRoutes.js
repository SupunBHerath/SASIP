import express from 'express';
import { getAllNews, uploadNews } from '../Controllers/NewsFeed.js';
import multer from 'multer';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() }); // Configure multer

router.post('/add-news', upload.fields([{ name: 'image' }]), uploadNews);
router.get('/get-news', getAllNews);

export default router;
