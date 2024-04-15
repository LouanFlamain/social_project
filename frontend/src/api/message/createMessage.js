const createMessage = (data, token) => {
  return fetch("http://127.0.0.1:9000/api/message/create", {
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
      return true;
    });
};
export default createMessage;
