
import { BACKEND_URL } from '@env';

export const login = async (credentials: { username: string; password: string }) => {
    try {
        console.log("yooo", BACKEND_URL)
        const response = await fetch(`${BACKEND_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Server error:', errorData);
            throw errorData;
        }

        const responseData = await response.json();
        return responseData.data;
    } catch (error) {
        console.log('Login failed:', error);
        throw error;
    }
};


export const register = async (credentials: { username: string; password: string, email:string, check_password:string }) => {
    try {
        const response = await fetch(`${BACKEND_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Server error:', errorData);
            throw errorData;
        }

        const responseData = await response.json();
        console.log('Login successful:', responseData);
        return responseData;
    } catch (error) {
        console.error('Login failed:', error);
        throw error;
    }
};




export const getUsers = async (userId: number| undefined, token: string) => {
    try {
        const response = await fetch(`${BACKEND_URL}/users/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Server error:', errorData);
            throw errorData;
        }

        const responseData = await response.json();
        console.log('Users fetched successfully:', responseData);
        return responseData.users;
    } catch (error) {
        console.error('Failed to fetch users:', error);
        throw error;
    }
};

