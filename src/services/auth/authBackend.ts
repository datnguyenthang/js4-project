import bcrypt from 'bcryptjs';
import { findUserByUsername } from '../users/user.service';

export const hashPassword = async (password: string): Promise<string> => {
    return bcrypt.hash(password, 10);
}

export const checkPassword = async (authPassword: string, password: string) => {
    //const hash = password.replace(/^\$2y(.+)$/i, '$2a$1');
    const hash = await hashPassword(authPassword);
    return await bcrypt.compare(authPassword, hash);
}

export const authBackend = async (username: string, password: string) => {
    try {
        if (!username || !password) return false;

        const user = await findUserByUsername(username);
        if (!user) {
            return false;
        }

        const isMatchPassword = await checkPassword(password, user?.password);
        if (!isMatchPassword) return false;

        return user;
    } catch(error) {
        console.log('Error Login ', error);
        return false;
    }
}
