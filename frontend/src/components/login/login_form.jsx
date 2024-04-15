import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginAsync, selectIsLoading, useToken } from "../../redux/userSlice";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkbox, setCheckbox] = useState("password");

  const token = useSelector(useToken)
  const isLoading= useSelector(selectIsLoading)

  if(token){
    navigate("/")
  }

  const handleChange = (e, func) => {
    func(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };
  const handleCheck = (e) => {
    if (e.target.checked) {
      setCheckbox("text");
    } else {
      setCheckbox("password");
    }
  };
  const fetchData = async () => {
    try {
      // Pass credentials as an object
      const credentials = { username : email, password };
      // call API to login throught redux async
      dispatch(loginAsync(credentials));
    } catch (error) {
      console.error('Login failed:', error);
    }
  };
  return (
    <>
      <div className="bg-neutral_white w-full md:w-1/3 h-full p-12 flex flex-col items-center md:rounded-r-2xl">
        <h1 className="text-6xl font-regular text-neutral_dark mb-6 font-bold drop-shadow-2xl font-oswald">
          Login
        </h1>
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col items-center mb-8"
        >
          <label className="form-control w-full max-w-xs mb-4">
            <div className="label">
              <span className="label-text text-neutral_dark">E-mail</span>
            </div>
            <input
              type="text"
              placeholder="Saisissez votre E-mail"
              className="input input-bordered w-full max-w-xs bg-neutral_white/90 text-neutral_dark border-neutral_dark focus:border-primary border-2 drop-shadow-md"
              onChange={(e) => handleChange(e, setEmail)}
            />
          </label>
          <label className="form-control w-full max-w-xs mb-8">
            <div className="label">
              <span className="label-text text-neutral_dark">Password</span>
            </div>
            <input
              type={checkbox}
              placeholder="Saisissez votre mot de passe"
              className="input input-bordered w-full max-w-xs mb-3 bg-neutral_white/90 text-neutral_dark border-neutral_dark focus:border-primary border-2 drop-shadow-md"
              onChange={(e) => handleChange(e, setPassword)}
            />
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text text-primary">
                  Voir le mot de passe
                </span>
                <input
                  type="checkbox"
                  className="checkbox border-neutral_dark checked:border-neutral_dark [--chkbg:#F8FBFC] [--chkfg:#1DA3C4]"
                  onChange={(e) => handleCheck(e)}
                />
              </label>
            </div>
          </label>
          <button
            type="submit"
            className="btn bg-primary border-none text-neutral_white md:hover:scale-105 drop-shadow-md"
          >
            Se connecter
          </button>
        </form>
        <div className="flex flex-col items-center">
          <p className="mb-3 text-center">Vous n'avez pas encore de compte ?</p>
          <Link
            className="underline underline-offset-2 text-neutral_dark md:hover:scale-105"
            to="/register"
          >
            Enregistrez vous ici !
          </Link>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
