import bcrypt from 'bcryptjs';
import { findUserByUsername } from '../users/user.service';

export const hashPassword = async (password: string): Promise<string> => {
    return await bcrypt.hash(password, 10);
}

export const checkPassword = async (inputPassword: string, password: string) => {
    console.log(inputPassword);
    try {
        console.log("Input Password:", inputPassword);
        console.log("Stored Hashed Password:", password);

        // Compare the input password with the stored hashed password
        const match = await bcrypt.compare(inputPassword, password);
        console.log("Password Match:", match);

        return match;
    } catch (error) {
        console.error("Error occurred while comparing passwords:", error);
        return false; // Return false in case of error
    }
}

export const authBackend = async (inputUsername: string, inputPassword: string) => {
    try {
        if (!inputUsername || !inputPassword) return false;

        const user = await findUserByUsername(inputUsername);

        if (!user) {
            return false;
        }

        const isMatchPassword = await checkPassword(inputPassword, user?.password);
        if (!isMatchPassword) return false;

        return user;
    } catch(error) {
        console.log('Error Login ', error);
        return false;
    }
}
