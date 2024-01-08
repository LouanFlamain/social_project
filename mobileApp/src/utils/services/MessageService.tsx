import { BACKEND_URL } from '@env';


export const getMessages = async (token: string, userId: number, room_id: number) => {
    try {
        console.log("la")
        const data = {
            user_id: userId,
            room_id,
            offset: 0
        }
        const response = await fetch(`${BACKEND_URL}/message/get`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });

        console.log(response);

        console.log("et ici")

        if (!response.ok) {
            console.log("jureeee")
            const errorData = await response.json();
            console.error('Server error:', errorData);
            throw errorData;
        }

            const responseData = await response.json();
            console.log(responseData)
            console.log(response)
            console.log('Messages fetched successfully:', responseData);
            return responseData;
        
    } catch (error) {
        console.log("nonnnn")
        console.error('Error fetching messages:', error);
        throw error;
    }
};


export const CreateMessage = async (token: string, userId: number, room_id: number, value : string) => {
    try {
        const data = {
            room_id: room_id,
            user_id: userId,
            message_value: value
        }
        const response = await fetch(`${BACKEND_URL}/message/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Server error:', errorData);
            throw errorData;
        }

        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            const responseData = await response.json();
            console.log('Messages fetched successfully:', responseData);
            return responseData;
        } else {
            console.error('Invalid content type in response:', contentType);
            throw new Error('Invalid content type in response');
        }
    } catch (error) {
        console.error('Error fetching messages:', error);
        throw error;
    }
};

