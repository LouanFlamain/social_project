export const createLocalStorageToken = (jwt, mercure) => {
  localStorage.setItem("token_jwt", jwt);
  localStorage.setItem("token_mercure", mercure);
};
