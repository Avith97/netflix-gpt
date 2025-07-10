// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD8qy4Mn6jFT0e-VoCsi6o4WtjAp_Fy_DY",
    authDomain: "netflix-gpt-a33e0.firebaseapp.com",
    projectId: "netflix-gpt-a33e0",
    storageBucket: "netflix-gpt-a33e0.firebasestorage.app",
    messagingSenderId: "81694963380",
    appId: "1:81694963380:web:97e7e660db8f3598ca89e1",
    measurementId: "G-9BVPK3CT4L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();