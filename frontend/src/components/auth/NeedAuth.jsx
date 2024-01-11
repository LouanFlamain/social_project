import React, { useEffect, useRef, useState } from "react";
import { KJUR } from "jsrsasign";
import { useDispatch } from "react-redux";
import { addUser } from "../../redux/userSlice";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/userSlice";
import { useLocation, useNavigate } from "react-router";
import { deleteLocalStorage } from "../../functions/deleteLocalStorage";

const NeedAuth = ({ children }) => {
  const token = localStorage.getItem("token_jwt");
  const ref = useRef(false);
  const navigate = useNavigate();
  const location = useLocation();

  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const [userLoaded, setUserLoaded] = useState(false);

  useEffect(() => {
    if (!ref.current) {
      if (token !== null) {
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
            fetch(`${process.env.REACT_APP_API_URL}/api/information/${email}`, {
              method: "get",
              headers: {
                Authorization: `Bearer ${token}`,
              },
              credentials: "include",
            })
              .then((response) => response.json())
              .then((results) => {
                if (results.code === 200) {
                  dispatch(addUser(results.data));
                  setUserLoaded(true);
                }
              });
          } else {
            setUserLoaded(true);
          }
        } else {
          deleteLocalStorage();
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
