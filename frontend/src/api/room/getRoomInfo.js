const getInfoRoom = (roomId, userId, token) => {
  return fetch(`http://127.0.0.1:9000/api/room/${roomId}/id/${userId}`, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  })
    .then((response) => response.json())
    .then((results) => {
      return results.data;
    });
};
export default getInfoRoom;
