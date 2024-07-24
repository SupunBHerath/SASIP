import express from 'express';
import { uploadAlbum } from '../Controllers/UploadAlbum.js';
import multer from 'multer';
import { getAllAlbums } from '../Controllers/DisplayAlbums.js';
import handler from '../Controllers/AddDeletePhoto.js';

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/albums', upload.array('images'), uploadAlbum);
router.get('/display-albums', getAllAlbums);
router.post('/add-images', handler);
router.delete('/delete-image', handler);

export default router;
