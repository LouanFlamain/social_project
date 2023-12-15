import React from "react";

const Header = ({ userData }) => {
  return (
    <div className="w-full h-14 bg-white flex items-center px-3">
      <div className="flex items-center">
        <div
          id="image"
          className="w-[3rem] h-[3rem] bg-primary rounded-full mr-2"
        ></div>
        <p>{userData?.username}</p>
      </div>
    </div>
  );
};
export default Header;
