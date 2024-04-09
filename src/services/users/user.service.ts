import { addDoc, collection, doc, getDocs, query, updateDoc, where, Timestamp } from "firebase/firestore";
import { db } from "../config";
import UserType from "./UserType";

export async function findUserByUsername(username: string) {
    try {
        if (username === "") return false;

        const dbCollection = collection(db, 'users');
        const dbQuery = query(dbCollection, where('username', '==', username));

        const querySnapshot = await getDocs(dbQuery);

        const userData = querySnapshot.docs[0].data();

        return userData;
    } catch(error) {
        console.log("Get user error" , error);
        return false;
    }
}

export async function getAllUsers() {
    try {
        const usersCollection = collection(db, 'users');
        const querySnapshot = await getDocs(usersCollection);

        const users: UserType[] = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        })) as UserType[];

        return users;
    } catch(error) {
        console.error("Error getting all users:", error);
        throw error;
    }
}

export async function changeStatusActive(userId: string, status: boolean) {
    try {
        const userDocRef = doc(db, 'users', userId);
        await updateDoc(userDocRef, {
            active: status // Set active status to true, change it as needed
        });
        return true;
    } catch (error) {
        console.error(`Error changing active status for user with ID ${userId}:`, error);
        throw error; // Rethrow the error to handle it elsewhere, e.g., in a catch block
    }
}

export async function addUser(newUser: UserType) {

    const newUserWithTimestamp: UserType = {
        ...newUser,
        active: true,
        createdAt: new Date().toLocaleString(),
        updatedAt: new Date().toLocaleString(),
    };

    try {
        // Add a new document with a generated ID to the "users" collection
        await addDoc(collection(db, 'users'), newUserWithTimestamp);
        return true;
    } catch (error) {
        console.error('Error adding new user:', error);
        throw error; // Rethrow the error to handle it elsewhere, e.g., in a catch block
    }
}

export async function updateUser(userId: string, updatedUser: Partial<UserType>) {
    try {
        const userDocRef = doc(db, 'users', userId);
        await updateDoc(userDocRef, updatedUser);
        console.log(`User with ID ${userId} updated successfully.`);
        return true;
    } catch (error) {
        console.error(`Error updating user with ID ${userId}:`, error);
        throw error; // Rethrow the error to handle it elsewhere, e.g., in a catch block
    }
}