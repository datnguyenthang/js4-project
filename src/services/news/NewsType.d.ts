interface NewsType {
    id?: string;
    title: string;
    shortContent: string,
    content: string;
    author: string;
    category: string;
    tag?: string[];
    published: boolean;
    createdAt?: string;
    updatedAt?: string;
}

export default NewsType;
