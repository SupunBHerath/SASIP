import admin from '../FirebaseConfig/firebaseAdmin.js';

const db = admin.firestore();

export const addTimetableEntries = async (req, res) => {
  console.log('Received body:', req.body);

  const entries = req.body;

  try {
    // Check if the request body is an array
    if (!Array.isArray(entries)) {
      return res.status(400).json({ message: 'Request body must be an array of timetable entries.' });
    }

    // Validate and process each timetable entry
    const batch = db.batch();
    const idPattern = /^S\d{4}$/;

    for (const entry of entries) {
      const {
        lid, name, subject, classMode, classType, medium, day, time, note, status, year
      } = entry;

      // Check for all required fields except 'note'
      if (!lid || !name || !subject || !classMode || !classType || !medium || !day || !time || !status || !year) {
        return res.status(400).json({ message: 'All fields except note are required for each entry.' });
      }

      // Validate 'lid' format
      if (!idPattern.test(lid)) {
        return res.status(400).json({ message: `Invalid Lecture ID format for entry with lid: ${lid}. Please use format SXXXX (e.g., S0001).` });
      }

      // Create a reference to the document in the 'timetable' collection
      const timetablesCollectionRef = db.collection('timetable').doc(lid).collection('timetables');
      const timetableRef = timetablesCollectionRef.doc();

      // Create the timetable entry object
      const timetableEntry = {
        name,
        subject,
        classMode,
        classType,
        medium,
        day,
        time,
        note: note !== undefined ? note : '',  // Use an empty string if note is undefined
        status,
        year,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),  // Optional
      };

      // Add the set operation to the batch
      batch.set(timetableRef, timetableEntry, { merge: true });
    }

    // Commit the batch operation
    await batch.commit();

    return res.status(200).json({ message: 'Timetable entries added successfully.' });
  } catch (error) {
    console.error('Error adding timetable entries: ', error);
    return res.status(500).json({ message: 'Failed to add timetable entries. Please try again.' });
  }
};


export const getAllTimetables = async (req, res) => {
  try {
    const timetablesRef = db.collection('timetable');
    const timetablesSnapshot = await timetablesRef.listDocuments(); // Get all document references

    if (timetablesSnapshot.length === 0) {
      return res.status(404).json({ message: 'No timetable entries found.' });
    }

    const allTimetables = [];

    // Iterate through each document reference in the 'timetable' collection
    for (const docRef of timetablesSnapshot) {
      const timetablesCollectionRef = docRef.collection('timetables');
      const timetablesCollectionSnapshot = await timetablesCollectionRef.get();

      // Iterate through each document in the 'timetables' subcollection
      for (const subDoc of timetablesCollectionSnapshot.docs) {
        allTimetables.push({
          lid: docRef.id,  // Add the parent document ID as 'lid'
          tid: subDoc.id,  // Add the subcollection document ID as 'tid'
          ...subDoc.data()
        });
      }
    }

    return res.status(200).json(allTimetables);
  } catch (error) {
    console.error('Error retrieving timetables: ', error);
    return res.status(500).json({ message: 'Failed to retrieve timetables. Please try again.' });
  }
};

export const getTimetableEntriesById = async (req, res) => {
  const { id } = req.params; // This is the ID of the document in the 'timetable' collection

  try {
    // Fetch all documents from the 'timetables' subcollection
    const timetableSnapshot = await db.collection('timetable').doc(id).collection('timetables').get();

    if (timetableSnapshot.empty) {
      return res.status(404).json({ message: 'No timetable entries found for the given ID.' });
    }

    // Format the documents into an array of timetable entries
    const timetableEntries = timetableSnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        lid: doc.id,  // Rename 'id' to 'lid'
        ...data
      };
    });

    return res.status(200).json(timetableEntries);
  } catch (error) {
    console.error('Error retrieving timetable entries: ', error);
    return res.status(500).json({ message: 'Failed to retrieve timetable entries. Please try again.' });
  }
};
