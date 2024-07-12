import {
  onAuthStateChanged,
  signOut,
  deleteUser,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";
import {
  deleteDoc,
  doc,
  getDoc,
  setDoc,
  collection,
  query,
  where,
  getDocs,
} from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";
import { auth, db } from "/firebase/firebaseConfig.js";

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const adminListElement = document.getElementById("adminList");
    const superAdminListElement = document.getElementById("superAdminList");

    const usersRef = collection(db, "authenticated-users");

    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const currentUserUid = user.uid;
        console.log("Current User UID:", currentUserUid); // Debugging log

        const q1 = query(usersRef, where("role", "==", "super-admin"));
        const querySnapshots = await getDocs(q1);

        querySnapshots.forEach((docSnapshot) => {
          const userData = docSnapshot.data();
          if (docSnapshot.id !== currentUserUid) {
            const email = userData.email;

            const userWrapper = document.createElement("div");
            userWrapper.className =
              "input-wrapper d-flex justify-content-between align-items-center border border-black rounded px-2";

            const emailSpan = document.createElement("span");
            emailSpan.id = `emailID-superAdmin-${docSnapshot.id}`;
            emailSpan.textContent = email;

            const buttonContainer = document.createElement("div");
            buttonContainer.className = "d-flex align-end";

            const revokePermissionButton = document.createElement("button");
            revokePermissionButton.className = "subscribe-button m-2 rounded";
            revokePermissionButton.id = `revokePermissionButton-${docSnapshot.id}`;
            revokePermissionButton.textContent = "Revoke Permission";

            buttonContainer.appendChild(revokePermissionButton);
            userWrapper.appendChild(emailSpan);
            userWrapper.appendChild(buttonContainer);
            superAdminListElement.appendChild(userWrapper);

            revokePermissionButton.addEventListener("click", async () => {
              const userEmail = emailSpan.textContent.trim();

              try {
                const userDocRef = doc(db, "authenticated-users", docSnapshot.id);
                const userDocSnap = await getDoc(userDocRef);
                const currentRole = userDocSnap.data().role;

                const newRole =
                  currentRole === "super-admin"
                    ? "normal-admin"
                    : "super-admin";
                const newButtonText =
                  newRole === "super-admin"
                    ? "Revoke Permission"
                    : "Add Permission";

                await setDoc(userDocRef, { role: newRole }, { merge: true });

                revokePermissionButton.textContent = newButtonText;

                console.log(`Role updated successfully for ${userEmail}`);
                alert(`Role updated successfully for ${userEmail}`);
              } catch (error) {
                console.error("Error updating role:", error);
                alert(
                  "Failed to update role. Check console for error details."
                );
              }
            });
          }
        });

        const q = query(usersRef, where("role", "in", ["normal-user", "normal-admin"]));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((docSnapshot) => {
          const userData = docSnapshot.data();
          const email = userData.email;

          const userWrapper = document.createElement("div");
          userWrapper.className =
            "input-wrapper d-flex justify-content-between align-items-center border border-black rounded px-2";

          const emailSpan = document.createElement("span");
          emailSpan.id = `emailId-${docSnapshot.id}`;
          emailSpan.textContent = email;

          const buttonContainer = document.createElement("div");
          buttonContainer.className = "d-flex align-end";

          const addPermissionButton = document.createElement("button");
          addPermissionButton.className = "subscribe-button m-2 rounded";
          addPermissionButton.id = `addAdminButton-${docSnapshot.id}`;
          addPermissionButton.textContent = "Make Super Admin";

          const deleteAdminButton = document.createElement("button");
          deleteAdminButton.className = "subscribe-button m-2 rounded";
          deleteAdminButton.id = `deleteAdminButton-${docSnapshot.id}`;
          deleteAdminButton.textContent = "Revoke Permission";

          // Set initial button text based on current role
          const currentRole = userData.role;
          if (currentRole === "normal-admin") {
            deleteAdminButton.textContent = "Revoke Permission";
          } else {
            deleteAdminButton.textContent = "Add Permission";
          }

          addPermissionButton.addEventListener("click", async () => {
            try {
              const userDocRef = doc(db, "authenticated-users", docSnapshot.id);
              await setDoc(userDocRef, { role: "super-admin" }, { merge: true });

              console.log(`Role updated successfully for ${email}`);
              alert(`Role updated successfully for ${email}`);
            } catch (error) {
              console.error("Error updating role:", error);
              alert("Failed to update role. Check console for error details.");
            }
          });

          deleteAdminButton.addEventListener("click", async () => {
            const userEmail = emailSpan.textContent.trim();

            try {
              const userDocRef = doc(db, "authenticated-users", docSnapshot.id);
              const userDocSnap = await getDoc(userDocRef);
              const currentRole = userDocSnap.data().role;

              const newRole =
                currentRole === "normal-admin" ? "normal-user" : "normal-admin";
              const newButtonText =
                newRole === "normal-admin" ? "Revoke Permission" : "Add Permission";

              await setDoc(userDocRef, { role: newRole }, { merge: true });

              deleteAdminButton.textContent = newButtonText;

              console.log(`Role updated successfully for ${userEmail}`);
              alert(`Role updated successfully for ${userEmail}`);
            } catch (error) {
              console.error("Error updating role:", error);
              alert("Failed to update role. Check console for error details.");
            }
          });

          buttonContainer.appendChild(addPermissionButton);
          buttonContainer.appendChild(deleteAdminButton);
          userWrapper.appendChild(emailSpan);
          userWrapper.appendChild(buttonContainer);
          adminListElement.appendChild(userWrapper);
        });
      }
    });
  } catch (error) {
    console.error("Error fetching users: ", error);
    document.getElementById("error-message").textContent =
      "Error loading admin users.";
  }
});

onAuthStateChanged(auth, async (user) => {
  if (user) {
    const uid = user.uid;
    const userDocRef = doc(db, "authenticated-users", uid);
    const userDocSnap = await getDoc(userDocRef);

    const email = user.email;
    const username = email.split("@")[0].split(".")[0];
    const capitalizedUsername =
      username.charAt(0).toUpperCase() + username.slice(1);

    if (userDocSnap.exists()) {
      const userData = userDocSnap.data();
      if (userData.role === "super-admin") {
        document.getElementById(
          "greeting"
        ).textContent = `Hi ${capitalizedUsername}`;
        document.getElementById("emailId").textContent = email;
      } else {
        window.location.href = "adminhome.html";
        alert("You do not have the necessary permissions to access this page.");
      }
    } else {
      console.log("No such document!");
    }
  } else {
    window.location.href = "/index.html";
  }
});

onAuthStateChanged(auth, async (user) => {
  if (user) {
    const email = user.email;
    const username = email.split("@")[0].split(".")[0];

    document.getElementById("greeting").textContent = `Hi ${username}`;

    const deleteButton = document.getElementById("deleteAdminButton");
    if (deleteButton) {
      deleteButton.addEventListener("click", async () => {
        if (
          confirm(
            "Are you sure you want to delete your account? This action cannot be undone."
          )
        ) {
          try {
            const password = prompt(
              "Please enter your password to confirm deletion:"
            );
            const credential = EmailAuthProvider.credential(
              user.email,
              password
            );
            await reauthenticateWithCredential(user, credential);

            await deleteUserData(user.uid);

            await deleteUser(user);

            await signOut(auth);

            alert("Your account has been deleted successfully.");
            window.location.href = "/index.html";
          } catch (error) {
            console.error("Error deleting user:", error);
            alert(
              "Failed to delete user account. Please check console for details."
            );
          }
        }
      });
    }
  } else {
    console.log("No user is signed in");
  }
});

async function deleteUserData(uid) {
  const userDocRef = doc(db, "authenticated-users", uid);
  await deleteDoc(userDocRef);
}
