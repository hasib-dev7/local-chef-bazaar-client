// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA8sxCo50wfHln6xD54U1O7zJ1wEwcX5DM",
  authDomain: "local-chef-bazaar-4a504.firebaseapp.com",
  projectId: "local-chef-bazaar-4a504",
  storageBucket: "local-chef-bazaar-4a504.firebasestorage.app",
  messagingSenderId: "647215840210",
  appId: "1:647215840210:web:e3db27bacb11cf8f46e60b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
