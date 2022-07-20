import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDdD3HIoFxWl45IPt-2QnMLbrlIj3YBkZU",
  authDomain: "car-dealership-402fe.firebaseapp.com",
  projectId: "car-dealership-402fe",
  storageBucket: "car-dealership-402fe.appspot.com",
  messagingSenderId: "925378418028",
  appId: "1:925378418028:web:b2ebe68f5d0aaf00ed0f49"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);