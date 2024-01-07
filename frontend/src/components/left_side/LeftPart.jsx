import React from "react";
import Header from "../layout/Header";
import SelectRoom from "./SelectRoom";

const LeftPart = ({ userData }) => {
  return (
    <div className="w-2/5 h-full py-5">
      <Header userData={userData} />
      <SelectRoom userData={userData} />
    </div>
  );
};

export default LeftPart;
