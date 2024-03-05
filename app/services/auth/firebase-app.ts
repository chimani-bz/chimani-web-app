// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import {getAuth} from "@firebase/auth";
import {initializeApp} from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBuW7uT9S4SfEFhZ-pPDBYNQB_8QO75xNo",
  authDomain: "firecms-aa7a0.firebaseapp.com",
  projectId: "firecms-aa7a0",
  storageBucket: "firecms-aa7a0.appspot.com",
  messagingSenderId: "224481385260",
  appId: "1:224481385260:web:688ee783ef7e08b7c5ea89",
  measurementId: "G-D3JMVXWE5Q"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);

