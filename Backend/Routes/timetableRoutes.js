import express from 'express';
import { addTimetableEntries, getAllTimetableEntries } from '../Controllers/AddTimetable.js';

const router = express.Router();

router.post('/add', addTimetableEntries);
router.get('/display-timetable', getAllTimetableEntries);

export default router;
