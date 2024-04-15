import React, { useEffect, useRef, useState } from "react";
import { KJUR } from "jsrsasign";
import { useDispatch } from "react-redux";
import { addUser, useIsLoggedIn } from "../../redux/userSlice";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { deleteLocalStorage } from "../../functions/deleteLocalStorage";
import { useToken, selectUser } from "../../redux/userSlice";
import { getInformations } from "../../redux/userSlice";
import { logout } from "../../redux/userSlice";

const NeedAuth = ({ children }) => {
  const test = useSelector(selectUser);
  const token = useSelector(useToken);
  const isLoggedIn = useSelector(useIsLoggedIn);
  const ref = useRef(false);
  const navigate = useNavigate();
  const location = useLocation();

  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const [userLoaded, setUserLoaded] = useState(false);

  console.log(token, isLoggedIn, user)

  useEffect(() => {
    if (!ref.current) {
      if (token !== null && isLoggedIn) {
        /*const isValid = KJUR.jws.JWS.verifyJWT(
              process.env.REACT_APP_JWT_PUBLIC_KEY + "=",
              token,
              {
                alg: ["RS256"],
              }
            );*/
        const isValid = true;
        if (isValid) {
          if (user === null) {
            let [header, payload, signature] = token.split(".");
            const email = JSON.parse(atob(payload)).email;
            dispatch(getInformations({email, token}))
          } else {
            setUserLoaded(true);
          }
        } else {
          logout()
          navigate("/login", { state: location });
        }
      } else {
        navigate("/login", { state: location });
      }
      ref.current = true;
    }
  }, []);
  if (!userLoaded) {
    return null;
  }
  return (
    <div className="h-full bg-neutral_white rounded-md">
      <div className="h-full">{children}</div>
    </div>
  );
};

export default NeedAuth;
