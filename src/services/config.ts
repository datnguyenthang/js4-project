// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { collection, addDoc } from 'firebase/firestore';
import { findUserByUsername } from "./users/user.service";
import { hashPassword } from "./auth/authBackend";
//import { seedDatabase } from "./seed.data";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyATrMizG_skFpUmliRmv-9PzAAvBC-F2w8",
    authDomain: "instantnews-cbef2.firebaseapp.com",
    projectId: "instantnews-cbef2",
    storageBucket: "instantnews-cbef2.appspot.com",
    messagingSenderId: "379207437377",
    appId: "1:379207437377:web:2a3f8a7b227c669067cac0"
};

// Initialize Firebase
export const firebase = initializeApp(firebaseConfig);
export const db = getFirestore(firebase);

//Seeding first user Admin
export async function seedingAdminAccount(){
    const admin = await findUserByUsername('admin');

    if (admin) return;

    const data = {
                username: 'admin',
                password: await hashPassword('admin'), //admin
                email: 'admin@admin.com',
                name: 'Admin',
                role: 'admin',
                active: true,
                createdAt: new Date().toLocaleString(),
                updatedAt: new Date().toLocaleString(),
            };
        const dbCollection = collection(db, 'users');
        await addDoc(dbCollection, data)
        .then((docRef) => {
        })
        .catch((error) => {
            console.error("Error adding task:", error);
        });
}
//seedingAdminAccount();
