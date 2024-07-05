import { db } from './firebaseConfig.js';
import { collection, getDocs, doc, getDoc, updateDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";

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
  const benefitRef = doc(db, 'benefits', benefitId);

  try {
    const benefitSnapshot = await getDoc(benefitRef);

    if (benefitSnapshot.exists()) {
      const benefitData = benefitSnapshot.data();
      const currentViews = benefitData.views || 0;

      // Increment views by 1
      await updateDoc(benefitRef, {
        views: currentViews + 1
      });

      console.log(`Views incremented to ${currentViews + 1}`);
    } else {
      console.log('Benefit does not exist. Creating new benefit with views = 1.');

      // Create new benefit with views = 1
      await setDoc(benefitRef, {
        views: 1
      });

      console.log('New benefit created with views = 1');
    }
  } catch (e) {
    console.error('Error updating views: ', e);
  }
};

export { fetchData, incrementViews, categories, benefits };
