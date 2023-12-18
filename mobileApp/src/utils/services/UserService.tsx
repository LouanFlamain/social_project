
import { BACKEND_URL } from '@env';

export const login = async (credentials: { username: string; password: string }) => {
    try {
        const response = await fetch(`http://10.0.2.2:9000/api/login`, {
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


export const register = async (credentials: { username: string; password: string, email:string, check_password:string }) => {
    try {
        const response = await fetch(`http://10.0.2.2:9000/api/register`, {
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
