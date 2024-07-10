import { onAuthStateChanged, signOut, deleteUser } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";
import { deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";
import { auth, db } from "./firebaseConfig.js";
import { collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";

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

// Check if the user is signed in
onAuthStateChanged(auth, async (user) => {
    if (user) {
        // User is signed in, get the user's email
        const email = user.email;
        const username = email.split("@")[0].split(".")[0];

        // Update the greeting
        document.getElementById("greeting").textContent = `Hi ${username}`;

        // Update the email span
        document.getElementById("emailId").textContent = email;

        // Handle delete button click
        const deleteButton = document.getElementById("deleteAdminButton");
        deleteButton.addEventListener("click", async () => {
            // Confirm deletion
            if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
                try {
                    // Delete user from database
                    await deleteUserData(user.uid);

                    // Delete user from authentication
                    await deleteUser(user);

                    // Alert and redirect
                    alert("Your account has been deleted successfully.");
                    window.location.href = "/index.html";
                } catch (error) {
                    console.error("Error deleting user:", error);
                    alert("Failed to delete your account. Please try again later.");
                }
            }
        });
    } else {
        // No user is signed in
        document.getElementById("greeting").textContent = "Hi guest";
        document.getElementById("emailId").textContent = "@experionglobal.com"; // Reset to default if no user is signed in
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
