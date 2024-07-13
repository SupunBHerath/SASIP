import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.API_PORT || 5005;
const app = express();
app.use(cors);
app.use(bodyParser.json());


app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});