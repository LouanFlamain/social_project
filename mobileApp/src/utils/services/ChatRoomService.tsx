
import { BACKEND_URL } from '@env';
import { User } from '../redux/UserSlice';

export const GetChats = async (id : number, token : string) => {
    try {
        const response = await fetch(`${BACKEND_URL}/get_rooms`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${token}`
            },
            body: JSON.stringify({user_id : id}),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Server error:', errorData);
            throw errorData;
        }

        const responseData = await response.json();
        return responseData.data;
    } catch (error) {
        console.error('Get failed:', error);
        
        throw error;
    }
};


interface newRoomData {
    users : number[],
    message_value : string,
    name : string
}
export const newRoom = async (token : string|undefined, data : newRoomData) => {
    try {
        const response = await fetch(`${BACKEND_URL}/create_room`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${token}`
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Server error:', errorData);
            throw errorData;
        }

        const responseData = await response.json();
        return responseData.data;
    } catch (error) {
        console.error('Get failed:', error);
        
        throw error;
    }
};
