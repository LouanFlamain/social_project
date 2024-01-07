export const deleteLocalStorage = () => {
  localStorage.clear("token_jwt");
  localStorage.clear("token_mercure");
};
