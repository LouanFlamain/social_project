
export const login = async (credentials) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/login`, {
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
        throw error
    }
};


export async function getUserInformations(data){
    const {email, token} = data
    try {
        fetch(`${process.env.REACT_APP_API_URL}/api/information/${email}`, {
            method: "get",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            credentials: "include",
          })
            .then((response) => response.json())
            .then((results) => {
              return results
            });
        
    } catch (error) {
        console.log(error)
        return error
    }

}