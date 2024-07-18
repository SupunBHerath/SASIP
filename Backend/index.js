import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from 'dotenv';
import authRoutes from "./Routes/authRoutes.js"
import albumRoutes from "./Routes/albumRoutes.js"

dotenv.config();

const port = process.env.API_PORT || 5005;
const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api', authRoutes); 
app.use('/api', albumRoutes); 
app.use('/api/albums', albumRoutes); 


app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});