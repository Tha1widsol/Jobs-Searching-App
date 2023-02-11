import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCAoFeTRjzWIK8UNtHdXL8vTNBhXowg5g8",
  authDomain: "firstcast-development.firebaseapp.com",
  projectId: "firstcast-development",
  storageBucket: "firstcast-development.appspot.com",
  messagingSenderId: "819006643999",
  appId: "1:819006643999:web:7bcb1538784c699d485a2a"
};

const app = initializeApp(firebaseConfig);

// Initialize Firebase

export const auth = getAuth(app)