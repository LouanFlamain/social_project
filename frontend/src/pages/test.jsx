import { useSelector } from "react-redux";
import { selectUser } from "../components/redux/userSlice";

const Test = () => {
  const user = useSelector(selectUser);
  const token =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2OTcxODcyMTMsImV4cCI6MTY5NzE5MDgxMywicm9sZXMiOlsiUk9MRV9VU0VSIl0sInVzZXJuYW1lIjoiYWRtaW4ifQ.JyPgxdFYLM_ivqfPJK0OkzsgfXPeinD9z7UtXx8AbI_ouEurNKvZ8x26reXPjX4TV64yO_uLLT2GJhD1UxnTx2lcKyC1kZIbr7wbZUv64E6JoAHhXyGGE-Th1eKmwC94dLZhWAggp45eDihQKdU8NVsGjk2c2U3k2yhBHWaP3nVD_MbgvYOFlSR2fyJfyKE6qM1HQMugQ53F-J8gbdz9HPv27qpcIaFNQ5ZHVV7TvKhPk6u1BpQpbNYFgV9KMs-K5DUvyd0PQLDxkyTnvRJFuj-SD-TVectaYaxE2rzp45sftB-_J_MnhjoPU6G7ATG6s4xrF4R_ULFopmZi08ufnw";
  const handleClick = () => {
    fetch("http://localhost:9000/api/test", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("data", data);
      })
      .catch((error) => {
        console.log("err", error);
      });
  };

  return (
    <button
      onClick={() => console.log(localStorage.getItem("token"))}
      className="btn"
    >
      test
    </button>
  );
};
export default Test;
