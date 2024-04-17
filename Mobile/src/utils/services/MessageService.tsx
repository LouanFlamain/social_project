import { BACKEND_URL } from '@env';


export const getMessages = async (token: string, userId: number, room_id: number) => {
    try {
        const data = {
            user_id: userId,
            room_id,
            offset: 0
        }

        console.log(data)
        const response = await fetch(`http://10.0.2.2:9000/api/message/get`, {
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

            const responseData = await response.json();
            return responseData;
        
    } catch (error) {
        throw error;
    }
};


export const CreateMessage = async (token: string, userId: number, roomId: number, value : string) => {
    try {
        let data = {
            user_id: userId,
            room_id: roomId,
            message_value: value,
          };

          console.log("data to send" , data)
        
        const response = await fetch("http://10.0.2.2:9000/api/message/create", {
            method: "post",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
          })

        
        console.log("lalala", response);


        if (!response.ok) {
            const errorData = await response.json();
            console.error('Server error:', errorData);
            throw errorData;
        }

        const responseData = await response.json();
        console.log(response)
        return responseData;
    } catch (error) {
        console.error('Error fetching messages:', error);
        throw error;
    }
};

