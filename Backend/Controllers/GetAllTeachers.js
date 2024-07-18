import admin from '../FirebaseConfig/firebaseAdmin.js';

const db = admin.firestore();

const displayTeachers = async (req, res) => {
  try {
    const teachersSnapshot = await db.collection('lecturers').get();
    const teachers = [];

    teachersSnapshot.forEach((doc) => {
      teachers.push({
        id: doc.id,
        ...doc.data()
      });
    });

    res.status(200).json({ teachers });
  } catch (error) {
    console.error('Error fetching teachers:', error);
    res.status(500).json({ error: 'Failed to fetch teachers' });
  }
};

export { displayTeachers };
