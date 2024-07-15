import admin from '../FirebaseConfig/firebaseAdmin.js';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url'; 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const db = admin.firestore();
const SECRET_KEY = process.env.SECRET_KEY;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,  
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS  
  },
  authMethod: 'PLAIN'
});

export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    if (!email) {
      return res.status(400).send('Email is required');
    }

    const userRef = db.collection('Admin').where('email', '==', email);
    const snapshot = await userRef.get();

    if (snapshot.empty) {
      return res.status(404).send('User not found');
    }

    let userData;
    snapshot.forEach(doc => {
      userData = doc.data();
    });

    const resetToken = jwt.sign({ email }, SECRET_KEY, { expiresIn: '5m' });
    const resetLink = `http://localhost:5173/reset-password/${resetToken}`;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Password Reset Request',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto;">
          <img src="cid:sasiplogo" alt="Company Logo" style="width: 150px; height: auto; margin-bottom: 10px;">
          <h2 style="color: #333;">Password Reset Request</h2>
          <p style="font-size: 16px; line-height: 1.6;">Dear Admin,</p>
          <p style="font-size: 16px; line-height: 1.6;">You have requested to reset your password. Please use the following link to complete the process:</p>
          <p style="font-size: 18px; line-height: 1.6;">Click <a href="${resetLink}" style="color: #1a73e8;">here</a> to reset your password.</p>
          <p style="font-size: 16px; line-height: 1.6;">If you did not request this password reset, please ignore this email.</p>
          <p style="font-size: 16px; line-height: 1.6;">Regards,<br>Copyright © Sasip.lk 2024</p>
        </div>
      `,
      attachments: [
        {
          filename: 'Entertainment.jpg',
          path: path.join(__dirname, '../../Frontend/public/Image/Entertainment.jpg'),
          cid: 'sasiplogo' 
        }
      ]
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        return res.status(500).send('Error sending email');
      }
      console.log('Email sent:', info.response);
      res.status(200).json({ message: 'Password reset link has been sent to your email' });
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal server error');
  }
};
