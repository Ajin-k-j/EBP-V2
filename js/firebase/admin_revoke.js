// this is the js file im giving
// complete the code with the above updation
// dont change any other existing feature in this code
import {
  onAuthStateChanged,
  signOut,
  deleteUser,
} from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";
import {
  deleteDoc,
  doc,
  getDoc,
  setDoc,
  collection,
} from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";
import { auth, db } from "./firebaseConfig.js";

onAuthStateChanged(auth, async (user) => {
  if (user) {
    const uid = user.uid;
    const userDocRef = doc(db, "authenticated-users", uid);
    const userDocSnap = await getDoc(userDocRef);

    const email = user.email;
    const username = email.split("@")[0].split(".")[0];
    console.log(email);

    if (userDocSnap.exists()) {
      const userData = userDocSnap.data();
      if (userData.role === "super-admin") {
        document.getElementById("greeting").textContent = `Hi ${username}`;
        document.getElementById("emailId").textContent = email;
        // Your additional code for super-admin
      } else {
        alert("You do not have the necessary permissions to access this page.");
        window.location.href = "adminhome.html"; // Redirect to home page
      }
    } else {
      console.log("No such document!");
    }
  } else {
    window.location.href = "/index.html"; // Redirect to home page if not logged in
  }
});
