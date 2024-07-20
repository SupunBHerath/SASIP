import express from 'express';
import { addTimetableEntries, getAllTimetables, getTimetableEntriesById, } from '../Controllers/AddTimetable.js';

const router = express.Router();

router.post('/add', addTimetableEntries);
router.get('/display-timetable', getAllTimetables);
router.get('/display-timetable/:id', getTimetableEntriesById);


export default router;
