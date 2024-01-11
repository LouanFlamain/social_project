const getMessage = (request) => {
  const token = localStorage.getItem("token_jwt");
  return fetch("http://127.0.0.1:9000/api/message/get", {
    method: "post",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(request),
  })
    .then((response) => response.json())
    .then((results) => {
      return results.data;
    });
};
export default getMessage;
