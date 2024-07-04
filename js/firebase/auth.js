// auth.js

import { auth } from './firebaseConfig.js';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";

// Function to validate email
function validateEmail(email) {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@experionglobal\.com$/;
  return emailPattern.test(email);
}

// Function to handle sign-in
function signIn() {
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;
  const errorMessageDiv = document.querySelector('#error-message');

  errorMessageDiv.textContent = ''; // Clear any previous error message

  // Check if fields are filled
  if (!email || !password) {
    errorMessageDiv.textContent = 'Please enter both email and password.';
    return;
  }

  // Validate email format
  if (!validateEmail(email)) {
    errorMessageDiv.textContent = 'Please enter a valid @experionglobal.com email address.';
    return;
  }


  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Sign-in successful
      window.location.href = '/templates/admin/adminhome.html';
    })
    .catch((error) => {


      // Handle Errors here.
      const errorCode = error.code;
      let errorMessage = '';

      switch (errorCode) {
        case 'auth/invalid-email':
          errorMessage = 'Invalid email format.';
          break;
        case 'auth/user-disabled':
          errorMessage = 'User account is disabled.';
          break;
        case 'auth/user-not-found':
          errorMessage = 'No user found with this email.';
          break;
        case 'auth/wrong-password':
          errorMessage = 'Incorrect password.';
          break;
        case 'auth/invalid-credential':
          errorMessage = 'Invalid credential.';
          break;
        default:
          errorMessage = 'An error occurred. Please try again.';
          break;
      }

      errorMessageDiv.textContent = errorMessage;
    })
}

// Function to handle forgot password
function forgotPassword() {
  const email = document.querySelector('#email').value;
  const errorMessageDiv = document.querySelector('#error-message');

  errorMessageDiv.textContent = ''; // Clear any previous error message

  // Validate email format
  if (!validateEmail(email)) {
    errorMessageDiv.textContent = 'Please enter a valid @experionglobal.com email address.';
    return;
  }

  // Send password reset email
  sendPasswordResetEmail(auth, email)
    .then(() => {
      // Password reset email sent successfully
      errorMessageDiv.textContent = 'Password reset email sent. Check your inbox.';
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      let errorMessage = '';

      switch (errorCode) {
        case 'auth/invalid-email':
          errorMessage = 'Invalid email format.';
          break;
        case 'auth/user-not-found':
          errorMessage = 'No user found with this email.';
          break;
        default:
          errorMessage = 'An error occurred. Please try again.';
          break;
      }

      errorMessageDiv.textContent = errorMessage;
    });
}

// Event listeners
document.querySelector('#signInButton').addEventListener('click', (e) => {
  e.preventDefault();
  signIn();
});

document.querySelector('#forgotPasswordLink').addEventListener('click', (e) => {
  e.preventDefault();
  forgotPassword();
});
