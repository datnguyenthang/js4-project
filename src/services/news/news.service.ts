import { doc, updateDoc, addDoc, collection, query, where, getDocs, orderBy, getDoc, } from 'firebase/firestore';
import NewsType from './NewsType';
import { db } from '../config';

//get tags
export async function scanTags(): Promise<string[]> {
    try {
        const tags: string[] = [];
        const newsCollectionRef = collection(db, 'news');
        const querySnapshot = await getDocs(newsCollectionRef);

        querySnapshot.forEach((doc) => {
            const newsData = doc.data() as NewsType;

            if (newsData.tag && Array.isArray(newsData.tag)) {
                newsData.tag.forEach((tag) => {
                    if (!tags.includes(tag)) {
                        tags.push(tag);
                    }
                });
            }
        });

        return tags;
    } catch (error) {
        console.error('Error get tags:', error);
        throw error;
    }
}

// Function to create a new news item
export async function addNews(newNews: NewsType): Promise<boolean> {
    const newNewsWithTimestamp: NewsType = {
        ...newNews,
        createdAt: new Date().toLocaleString(),
        updatedAt: new Date().toLocaleString(),
    };
    
    try {
        const newsCollectionRef =  collection(db, 'news');
        await addDoc(newsCollectionRef, newNewsWithTimestamp);
        console.log('New news item added successfully.');
        return true;
    } catch (error) {
        console.error('Error adding new news item:', error);
        throw error;
    }
}

export async function updateNewsStatus(newsId: string, publish: boolean): Promise<boolean> {
    try {
        const newsRef = doc(db, 'news', newsId);
        await updateDoc(newsRef, { published: publish });
        return true;
    } catch (error) {
        console.error(`Error updating status :`, error);
        throw error; 
    }
}

export async function getAllNews(): Promise<NewsType[]> {
    try {
        const newsCollection = collection(db, 'news');
        const q = query(newsCollection);
        const querySnapshot = await getDocs(q);
        const newsItems: NewsType[] = [];
        querySnapshot.forEach((doc) => {
            newsItems.push({
                id: doc.id,
                ...doc.data()
            } as NewsType);
        });
        return newsItems;
    } catch (error) {
        console.error('Error getting published news by createdAt:', error);
        throw error;
    }
}

export async function getNewsById(newsId: string): Promise<NewsType | null> {
    try {
        const newsDocRef = doc(db, 'news', newsId);
        const docSnap = await getDoc(newsDocRef);

        if (docSnap.exists()) {
            return {
                id: docSnap.id,
                ...docSnap.data()
            } as NewsType;
        } else {
            console.error('No such news document!');
            return null;
        }
    } catch (error) {
        console.error('Error getting news details by ID:', error);
        throw error;
    }
}

// Function to get list of news based on category, publish, and createdAt
export async function getPublishedNewsSortedByUpdatedAt(): Promise<NewsType[]> {
    try {
        const newsCollection = collection(db, 'news');
        const q = query(
            newsCollection,
            where('published', '==', true),
            //orderBy('updatedAt', 'desc')
        );
        const querySnapshot = await getDocs(q);
        const newsItems: NewsType[] = [];
        querySnapshot.forEach((doc) => {
            newsItems.push({
                id: doc.id,
                ...doc.data()
            } as NewsType);
        });
        return newsItems;
    } catch (error) {
        console.error('Error getting published news sorted by updatedAt:', error);
        throw error; // Rethrow the error to handle it elsewhere, e.g., in a catch block
    }
}