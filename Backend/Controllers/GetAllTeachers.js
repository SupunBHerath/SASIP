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


const getTeacherById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id)
    const teacherDoc = await db.collection('lecturers').doc(id).get();

    if (!teacherDoc.exists) {
      return res.status(404).json({ error: 'Teacher not found' });
    }

    const teacherData = teacherDoc.data();
    res.status(200).json(teacherData);
  } catch (error) {
    console.error('Error fetching teacher details:', error);
    res.status(500).json({ error: 'Failed to fetch teacher details' });
  }
};

export { displayTeachers , getTeacherById };
