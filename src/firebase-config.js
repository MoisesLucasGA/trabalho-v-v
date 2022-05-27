// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA9VfphR-ozmUicRIdDY6SpcpWsFzfOjpA",
    authDomain: "crud-pessoas-629e6.firebaseapp.com",
    projectId: "crud-pessoas-629e6",
    storageBucket: "crud-pessoas-629e6.appspot.com",
    messagingSenderId: "193205801301",
    appId: "1:193205801301:web:3fa1384db02ee3237f1fdc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)