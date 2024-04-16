const createRoom = (data) => {
  const token = localStorage.getItem("token_jwt");
  return fetch("http://127.0.0.1:9000/api/create_room", {
    method: "post",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((results) => {
      if (results.code === 200) {
        return results.room_id;
      } else {
        return false;
      }
    });
};

export default createRoom;
