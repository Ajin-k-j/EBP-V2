import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";
import { getFirestore, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";
 
const firebaseConfig = {
  apiKey: "AIzaSyCQL-V8i7aq-xNOOnYz6ObGbOd_2jCtXFI",
  authDomain: "benefits-project.firebaseapp.com",
  projectId: "benefits-project",
  storageBucket: "benefits-project.appspot.com",
  messagingSenderId: "611626940221",
  appId: "1:611626940221:web:57af68b6793a6a919eb754",
};
 
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore();
 
// Check if the user is signed in
onAuthStateChanged(auth, async (user) => {
  if (user) {
    // User is signed in, get the user's email
    const email = user.email;
    const username = email.split("@")[0].split(".")[0];
 
    // Update the greeting
    document.getElementById("greeting").textContent = `Hi ${username}`;
 
    // Handle delete button click
    const deleteButton = document.getElementById("deleteAdminButton");
    deleteButton.addEventListener("click", async () => {
      // Confirm deletion
      if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
        try {
          // Delete user from database
          await deleteUserData(user.uid);
 
          // Sign out user
          await signOut(auth);
 
          // Alert and redirect
          alert("Your account has been deleted successfully.");
          window.location.href = "index.html";
        } catch (error) {
          console.error("Error deleting user:", error);
          alert("Failed to delete your account. Please try again later.");
        }
      }
    });
  } else {
    // No user is signed in
    document.getElementById("greeting").textContent = "Hi guest";
  }
});
 
// Function to delete user data
async function deleteUserData(userId) {
  try {
    await deleteDoc(doc(db, "users", userId));
    console.log("User data deleted successfully");
  } catch (error) {
    console.error("Error deleting user data:", error);
    throw error;
  }
}