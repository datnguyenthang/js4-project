import { collection, query, where, getDocs, doc, updateDoc, addDoc } from 'firebase/firestore';
import { db } from "../config";
import CategoryType from './CategoryType';

export async function getPublishedCategories(): Promise<CategoryType[]> {
    try {
        const categoriesCollection = collection(db, 'categories');
        const q = query(categoriesCollection, where('active', '==', true));
        const querySnapshot = await getDocs(q);
        const categories: CategoryType[] = [];
        querySnapshot.forEach((doc) => {
            categories.push({
                id: doc.id,
                ...doc.data()
            } as CategoryType);
        });
        return categories;
    } catch (error) {
        console.error('Error getting published categories:', error);
        throw error;
    }
}

// Function to get all categories
export async function getAllCategories(): Promise<CategoryType[]> {
    try {
        const categoriesCollection = collection(db, 'categories');
        const q = query(categoriesCollection);
        const querySnapshot = await getDocs(q);
        const categories: CategoryType[] = [];
        querySnapshot.forEach((doc) => {
            categories.push({
                id: doc.id,
                ...doc.data()
            } as CategoryType);
        });
        return categories;
    } catch (error) {
        console.error('Error getting all categories:', error);
        throw error;
    }
}

export async function updateCategoryStatus(categoryId: string, status: boolean): Promise<boolean> {
    try {
        const categoryRef = doc(db, 'categories', categoryId);
        await updateDoc(categoryRef, { active: status });
        return true;
    } catch (error) {
        console.error(`Error updating active status:`, error);
        throw error;
    }
}

// Function to update a category
export async function updateCategory(categoryId: string, updatedCategory: Partial<CategoryType>): Promise<boolean> {
    try {
        const categoryRef = doc(db, 'categories', categoryId);
        await updateDoc(categoryRef, updatedCategory);
        return true;
    } catch (error) {
        console.error(`Error updating category:`, error);
        throw error;
    }
}

export async function addCategory(newCategory: Partial<CategoryType>): Promise<boolean> {
    try {
        const categoriesCollectionRef = collection(db, 'categories');
        await addDoc(categoriesCollectionRef, newCategory);
        return true;
    } catch (error) {
        console.error('Error adding new category:', error);
        throw error; 
    }
}