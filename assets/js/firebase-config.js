// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBpI_ytmZvQ42bksydcD_zXg6aOF8GRtUs",
  authDomain: "wat-nongphailom-pakchong-web.firebaseapp.com",
  projectId: "wat-nongphailom-pakchong-web",
  storageBucket: "wat-nongphailom-pakchong-web.firebasestorage.app",
  messagingSenderId: "1098225420650",
  appId: "1:1098225420650:web:5f948f89040cb0ecf27d13",
  measurementId: "G-7FVZGCBRMF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
