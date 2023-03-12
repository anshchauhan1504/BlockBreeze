import firebaseConfig from "./Config/firebaseConfig";
import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
const firebaseapp=initializeApp(firebaseConfig) //This variable will be used to initialize auth and our database
const auth=getAuth(firebaseapp);
const db=getFirestore(firebaseapp);

export {auth,db};
//Initial configuration has been done