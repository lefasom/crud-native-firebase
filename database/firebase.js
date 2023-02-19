// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from 'firebase/firestore'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'

import { v4 } from 'uuid'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC-JFEWKUR6bOcCQxDy6uhz_CDYXMMBWc0",
    authDomain: "nativocrud.firebaseapp.com",
    projectId: "nativocrud",
    storageBucket: "nativocrud.appspot.com",
    messagingSenderId: "245584649583",
    appId: "1:245584649583:web:be8aca7ad28815c8989c9a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Acciones de firebase
export const db = getFirestore(app)
export const storage = getStorage(app)

export async function uploadFile(file){
 const storageRef = ref(storage, v4())
 await uploadBytes(storageRef, file)
 const url = await getDownloadURL(storageRef)
 return url
}