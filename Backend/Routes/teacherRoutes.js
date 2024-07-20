import express from 'express';
import { addLecturer, deleteLecturer, upload } from '../Controllers/AddTeacher.js';
import { displayTeachers, getTeacherById } from '../Controllers/GetAllTeachers.js';

const router = express.Router();

router.post('/add', upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'qualifications[0][file]', maxCount: 1 },
  { name: 'qualifications[1][file]', maxCount: 1 },
  { name: 'qualifications[2][file]', maxCount: 1 },
  { name: 'qualifications[3][file]', maxCount: 1 },
  { name: 'qualifications[4][file]', maxCount: 1 },
  { name: 'qualifications[5][file]', maxCount: 1 },
  { name: 'qualifications[6][file]', maxCount: 1 },
  { name: 'qualifications[7][file]', maxCount: 1 },
  { name: 'qualifications[8][file]', maxCount: 1 },
  { name: 'qualifications[9][file]', maxCount: 1 }
]), addLecturer);

router.delete('/lecturers/:id', deleteLecturer);
router.get('/display-teachers', displayTeachers);
router.get('/profile/:id', getTeacherById);

export default router;
