import admin from '../FirebaseConfig/firebaseAdmin.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const db = admin.firestore();
const SECRET_KEY = process.env.SECRET_KEY;

export const resetPassword = async (req, res) => {
  const { token, password } = req.body;

  try {
    if (!token || !password) {
      return res.status(400).send('Token and new password are required');
    }

    // Verify the reset token
    let decoded;
    try {
      decoded = jwt.verify(token, SECRET_KEY);
    } catch (error) {
      return res.status(400).send('Invalid or expired token');
    }

    const { email } = decoded;

    // Find the user
    const userRef = db.collection('Admin').where('email', '==', email);
    const snapshot = await userRef.get();

    if (snapshot.empty) {
      return res.status(404).send('User not found');
    }

    let userDocId;
    snapshot.forEach(doc => {
      userDocId = doc.id;
    });

    // Update the user's password
    await db.collection('Admin').doc(userDocId).update({
      password: password,
    });

    res.status(200).json({ message: 'Password has been successfully reset' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal server error');
  }
};
