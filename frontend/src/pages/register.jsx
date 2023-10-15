import { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const userValue = {
    username: "",
    email: "",
    password: "",
    verif_password: "",
  };

  const [user, setUser] = useState(userValue);

  const test = {
    username: "meryl",
    password: "meryl",
    verif_password: "meryl",
    email: "meryl@meryl.fr",
  };

  const handleChangeUser = (e, type) => {
    let value = e.target.value;
    setUser((prevUser) => ({
      ...prevUser,
      [type]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://127.0.0.1:9000/api/register", {
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
        <h1 className="text-center text-4xl text-dark font-extrabold">
          Register
        </h1>
        <div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text text-dark">E-mail</span>
            </label>
            <input
              type="email"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
              onChange={(e) => handleChangeUser(e, "email")}
            />
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text text-dark">Username</span>
            </label>
            <input
              type="text"
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
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text text-dark">Valid-Password</span>
            </label>
            <input
              type="password"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
              onChange={(e) => handleChangeUser(e, "verif_password")}
            />
          </div>
          <div className="flex justify-center mt-8">
            <button type="submit" className="btn">
              Créer un compte
            </button>
          </div>
        </div>
        <div className="flex flex-col items-center mt-3">
          <p>Vous avez déjà un compte ?</p>
          <Link className="text-dark" to="/login">
            Cliquez ici
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
