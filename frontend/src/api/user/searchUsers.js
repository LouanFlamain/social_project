const searchUsers = (username) => {
  const token = localStorage.getItem("token_jwt");
  return fetch(`http://127.0.0.1:9000/api/search/user/${username}`, {
    method: "get",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((results) => {
      return results?.data;
    });
};
export default searchUsers;
