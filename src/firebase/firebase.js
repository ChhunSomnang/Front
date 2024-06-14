// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAR060QV2ioT9GHE62iEnGnkd8mkn2iVaQ",
  authDomain: "imagehostingwct.firebaseapp.com",
  projectId: "imagehostingwct",
  storageBucket: "imagehostingwct.appspot.com",
  messagingSenderId: "918274478708",
  appId: "1:918274478708:web:221f98b61c4707eb507721",
  measurementId: "G-00RWXC5EM4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);