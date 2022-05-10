// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-analytics.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-database.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAq9ns-CAledgkLLulaMxA9g5oI3UbYbq4",
    authDomain: "cs32-final-project-7a4b0.firebaseapp.com",
    projectId: "cs32-final-project-7a4b0",
    storageBucket: "cs32-final-project-7a4b0.appspot.com",
    messagingSenderId: "727776858192",
    appId: "1:727776858192:web:946bec107baf4d4dd1c155",
    measurementId: "G-TZSX0DNQBY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Get a reference to the database service
const database = getDatabase(app);
export default database;