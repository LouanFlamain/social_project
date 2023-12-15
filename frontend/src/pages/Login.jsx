import React, { useState } from "react";
import { Link } from "react-router-dom";
import LoginForm from "../components/login/login_form";
import LoginInfo from "../components/login/login_info";

const Login = () => {
  return (
    <div className="w-full h-full">
      <div className="flex w-full h-full md:h-4/5 absolute-center justify-center">
        {" "}
        <LoginInfo />
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
