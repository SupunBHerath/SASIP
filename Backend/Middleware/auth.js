// middleware/checkToken.js

import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;

export const checkToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).send('Access Denied');

  try {
    const verified = jwt.verify(token, SECRET_KEY);
    req.user = verified;
    res.status(200).send('Token is valid'); 
    next(); 
  } catch (err) {
    console.error(err); 
    res.status(400).send('Invalid Token');
  }
};
