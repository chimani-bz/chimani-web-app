import {getAuth} from "@firebase/auth";
import {getApp, getApps, initializeApp} from "firebase/app";

const firebaseConfig = JSON.parse(window.ENV.FIREBASE_CLIENT_CONFIG)

if (getApps().length === 0) {
  initializeApp(firebaseConfig);
}

export const firebaseAppClient = getApp()
export const firebaseAuth = getAuth(firebaseAppClient);
