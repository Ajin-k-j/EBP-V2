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
import { query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";
 
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const adminListElement = document.getElementById('adminList');
 
        // Query Firestore for users with the role 'normal-admin'
        const usersRef = collection(db, 'authenticated-users');
 
        const q = query(usersRef, where('role', '==', 'normal-admin'));
        const querySnapshot = await getDocs(q);
 
        querySnapshot.forEach((doc) => {
            const userData = doc.data();
            const email = userData.email;
 
            // Create the HTML structure for each admin
            const userWrapper = document.createElement('div');
            userWrapper.className = 'input-wrapper d-flex  justify-content-between align-items-center border border-black rounded px-2';
 
            const emailSpan = document.createElement('span');
            emailSpan.id = 'emailId';
            emailSpan.textContent = email;
 
            const buttonContainer = document.createElement('div');
            buttonContainer.className = 'd-flex align-end';
 
            const addPermissionButton = document.createElement('button');
            addPermissionButton.className = 'subscribe-button m-2 rounded';
            addPermissionButton.id = 'addAdminButton';
            addPermissionButton.textContent = 'Add Permission';
 
            const deleteAdminButton = document.createElement('button');
            deleteAdminButton.className = 'subscribe-button m-2 rounded';
            deleteAdminButton.id = 'deleteAdminButton';
            deleteAdminButton.textContent = 'Delete';
 
            // Optionally, add event listeners to handle the button actions
            buttonContainer.appendChild(addPermissionButton);
            buttonContainer.appendChild(deleteAdminButton);
            userWrapper.appendChild(emailSpan);
            userWrapper.appendChild(buttonContainer);
            adminListElement.appendChild(userWrapper);
        });
    } catch (error) {
        console.error('Error fetching users: ', error);
        document.getElementById('error-message').textContent = 'Error loading admin users.';
    }
});

onAuthStateChanged(auth, async (user) => {
  if (user) {
    const uid = user.uid;
    const userDocRef = doc(db, "authenticated-users", uid);
    const userDocSnap = await getDoc(userDocRef);

    const email = user.email;
    const username = email.split("@")[0].split(".")[0];
    const capitalizedUsername = username.charAt(0).toUpperCase() + username.slice(1);
    console.log(email);

    if (userDocSnap.exists()) {
      const userData = userDocSnap.data();
      if (userData.role === "super-admin") {
        document.getElementById("greeting").textContent = `Hi ${capitalizedUsername}`;
        document.getElementById("emailId").textContent = email;
        // Your additional code for super-admin
      } else {
        
        window.location.href = "adminhome.html"; // Redirect to home page
        alert("You do not have the necessary permissions to access this page.");
      }
    } else {
      console.log("No such document!");
    }
  } else {
    window.location.href = "/index.html"; // Redirect to home page if not logged in
  }
});
