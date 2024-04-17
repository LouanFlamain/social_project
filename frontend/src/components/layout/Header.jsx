import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/userSlice";
import { useNavigate } from "react-router";

const Header = ({ userData }) => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () =>{
    dispatch(logout())
    navigate("/login")
  }

  return (
    <>
      <button className="mb-4" onClick={handleLogout}> logout </button>
    <div className="w-full h-14 bg-white flex items-center px-3">
      <div className="flex items-center">
        <div
          id="image"
          className="w-[3rem] h-[3rem] bg-primary rounded-full mr-2"
        ></div>
        <p className="text-neutral_dark font-semibold">{userData?.username}</p>

      </div>
    </div>
    </>
  );
};
export default Header;
