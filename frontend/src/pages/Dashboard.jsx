import React from "react";
import LeftPart from "../components/left_side/LeftPart";
import RightPart from "../components/right_part/RightPart";

import { useSelector } from "react-redux";
import { selectUser } from "../redux/userSlice";

const Dashboard = () => {
  let userData = useSelector(selectUser);

  return (
    <div className="flex h-full p-5">
      <LeftPart userData={userData} />
      <RightPart />
    </div>
  );
};

export default Dashboard;
