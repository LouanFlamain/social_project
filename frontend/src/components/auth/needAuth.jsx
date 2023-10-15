import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const NeedAuth = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");
  const params = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  };
  useEffect(() => {
    console.log("test");
    if (token !== null) {
      fetch("http://localhost:9000/api/check_valid", params)
        .then((respones) => respones.json())
        .then((data) => {
          //data.code = 200;
          if (data.code === 200) {
            return <div>{children}</div>;
          }
          navigate("/login", { state: location });
        });
    } else {
      navigate("/login", { state: location });
    }
  }, []);
};
export default NeedAuth;
