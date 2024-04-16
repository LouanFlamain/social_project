const getMessage = async (payload) => {
    try {
      const {request, token} = payload
      const response = await fetch("http://127.0.0.1:9000/api/message/get", {
        method: "post",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload.request),
      })

      if (!response.ok) {
        const errorData = await response.json();
        throw errorData;
      }

      const responseData = await response.json();
      return responseData.data;
    } catch (error) {
      throw error
    }
  };

  export default getMessage;
