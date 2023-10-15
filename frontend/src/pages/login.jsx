import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../components/redux/userSlice";

const Login = () => {
  const userValue = {
    username: "",
    password: "",
  };

  const [user, setUser] = useState(userValue);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChangeUser = (e, type) => {
    let value = e.target.value;
    setUser((prevUser) => ({
      ...prevUser,
      [type]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    fetch("http://127.0.0.1:9000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("response", data);
        if (data.success) {
          localStorage.setItem("token", data.token);
          dispatch(addUser(data));
          navigate("/");
        }
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };
  return (
    <div>
      <form
        className="is-absolute-center bg-clear p-5 rounded-xl"
        onSubmit={(e) => handleSubmit(e)}
      >
        <h1 className="text-center text-4xl text-dark font-extrabold">Login</h1>
        <div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text text-dark">E-mail</span>
            </label>
            <input
              type="email"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
              onChange={(e) => handleChangeUser(e, "username")}
            />
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text text-dark">Password</span>
            </label>
            <input
              type="password"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
              onChange={(e) => handleChangeUser(e, "password")}
            />
          </div>
          <div className="flex justify-center mt-8">
            <button type="submit" className="btn">
              Se connecter
            </button>
          </div>
        </div>
        <div className="flex flex-col items-center mt-3">
          <p>Vous n'avez pas de compte ?</p>
          <Link className="text-dark" to="/test">
            Créez en un ici !
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
