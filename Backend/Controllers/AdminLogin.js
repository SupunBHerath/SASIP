import admin from '../FirebaseConfig/firebaseAdmin.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const db = admin.firestore();
const SECRET_KEY = process.env.SECRET_KEY;

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).send('Email and password are required');
    }

    const userRef = db.collection('Admin').where('email', '==', email);
    const snapshot = await userRef.get();

    if (snapshot.empty) {
      return res.status(404).send('User not found');
    }

    let userFound = false;
    let userData;
    snapshot.forEach(doc => {
      userData = doc.data();
      if (userData.password === password) {
        userFound = true;
      }
    });

    if (userFound) {
      // Generate JWT token
      const token = jwt.sign({ email: userData.email }, SECRET_KEY, { expiresIn: '1h' });
      return res.status(200).json({ message: 'Login successful', token });
    } else {
      return res.status(401).send('Invalid password');
    }
  } catch (error) {
    return res.status(500).send('Internal server error');
  }
};
