import express from 'express';
import { addTimetableEntries, getAllTimetableEntries, getTimetableEntriesById, } from '../Controllers/AddTimetable.js';

const router = express.Router();

router.post('/add', addTimetableEntries);
router.get('/display-timetable', getAllTimetableEntries);
router.get('/display-timetable/:id', getTimetableEntriesById);


export default router;
