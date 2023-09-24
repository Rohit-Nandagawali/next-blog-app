import { initializeApp } from 'firebase/app';
import 'firebase/auth'
import 'firebase/storage'
import 'firebase/firestore'
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';


const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API,
    authDomain: "nextjs-blog-51d66.firebaseapp.com",
    projectId: "nextjs-blog-51d66",
    storageBucket: "nextjs-blog-51d66.appspot.com",
    messagingSenderId: "255264003362",
    appId: "1:255264003362:web:486013d5c09c085b7d417b"
};


const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app)
// const auth = firebase.auth()
// const firestore = firebase.firestore()
// const storage = firebase.storage()

export { auth, db, storage }