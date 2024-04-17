const firstMessage = (data) => {
  const token = localStorage.getItem("token_jwt");
  return fetch("http://127.0.0.1:9000/api/message/first", {
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
      console.log(results);
      return true;
    });
};

export default firstMessage;
