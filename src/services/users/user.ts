import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../config";

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