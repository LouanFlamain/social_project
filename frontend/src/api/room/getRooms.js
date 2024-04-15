const getRooms = async (token, fetchData) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/get_rooms`, {
        method: "post",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(fetchData),
      })

      console.log(response)

      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData)
        throw errorData;
      }

      const responseData = await response.json();
      console.log(responseData)
      return responseData.data;
    } catch (error) {
    console.log(error)
      throw error
    }
  };

  export default getRooms;
