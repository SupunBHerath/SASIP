import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from 'dotenv';
import authRoutes from "./Routes/authRoutes.js"
import albumRoutes from "./Routes/albumRoutes.js"
import teacherRoutes from "./Routes/teacherRoutes.js"
import timetableRoutes from "./Routes/timetableRoutes.js"
import multer from 'multer';
import newsRoutes from "./Routes/newsRoutes.js"

dotenv.config();

const port = process.env.API_PORT || 5005;
const app = express();
app.use(cors());
app.use(bodyParser.json());
const upload = multer();

app.use('/api', authRoutes); 
app.use('/api', albumRoutes); 
app.use('/api/albums', albumRoutes); 
app.use('/api/teacher', teacherRoutes); 
app.use('/api/timetable', upload.none(), timetableRoutes);
app.use('/api/timetable/xl', timetableRoutes); 
app.use('/api/news', newsRoutes); 



app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});