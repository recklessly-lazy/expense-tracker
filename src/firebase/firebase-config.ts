// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAHJaBEHkZuM6g8QsUUHf042HP2gWD38nI",

    authDomain: "expense-tracker-poc.firebaseapp.com",

    databaseURL: "https://expense-tracker-poc-default-rtdb.firebaseio.com",

    projectId: "expense-tracker-poc",

    storageBucket: "expense-tracker-poc.appspot.com",

    messagingSenderId: "984479064591",

    appId: "1:984479064591:web:9f60e0cdc317f2f8ab797a",

    measurementId: "G-S8H03VZZTN",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// Initialize Realtime Database and get a reference to the service
export const database = getDatabase(app);

export const storage = getStorage(app);



// const analytics = getAnalytics(app);
