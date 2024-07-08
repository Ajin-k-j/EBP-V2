import { db } from './firebaseConfig.js';
import { collection, getDocs, doc, getDoc, updateDoc, setDoc, query, where, } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";

// Global arrays to store categories and benefits data
let categories = [];
let benefits = [];

// Function to fetch categories and benefits data from Firestore and store them in global arrays
const fetchData = async () => {
  try {
    // Fetch categories data
    const categoriesSnapshot = await getDocs(collection(db, 'categories'));
    categories = categoriesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    console.log('Categories:', categories);

    // Fetch benefits data
    const benefitsSnapshot = await getDocs(collection(db, 'benefits'));
    benefits = benefitsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    console.log('Benefits:', benefits);
  } catch (e) {
    console.error('Error fetching data: ', e);
  }
};

// Function to increment the views field
const incrementViews = async (benefitId) => {
  const benefitsCollection = collection(db, 'benefits');
  const q = query(benefitsCollection, where('id', '==', benefitId));

  try {
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const benefitDoc = querySnapshot.docs[0];
      const benefitRef = benefitDoc.ref;
      const benefitData = benefitDoc.data();
      const currentViews = benefitData.views || 0;

      // Increment views by 1
      await updateDoc(benefitRef, {
        views: currentViews + 1
      });

      console.log(`Views incremented to ${currentViews + 1}`);
    } else {
      console.error('Benefit not found');
    }
  } catch (e) {
    console.error('Error updating views: ', e);
  }
};

export { fetchData, incrementViews, categories, benefits };
