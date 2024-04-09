interface UserType {
    id?: string;
    username: string;
    email: string;
    name: string;
    password: string;
    role: string;
    active: boolean;
    updatedAt?: string;
    createdAt?: string;
}

export default UserType;