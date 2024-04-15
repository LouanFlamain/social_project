import React, { useState } from "react";
import { Link } from "react-router-dom";
import LoginForm from "../components/login/login_form";
import LoginInfo from "../components/login/login_info";
import { useSelector } from "react-redux";
import { selectIsLoading } from "../redux/userSlice";

const Login = () => {
  const isLoading = useSelector(selectIsLoading)
  return (
    <div className="w-full h-full">
      <div className="flex w-full h-full md:h-4/5 absolute-center justify-center">
        {" "}
        {isLoading ? <span className="loading loading-spinner text-secondary"></span> : 
        <>
        <LoginInfo />
        <LoginForm />
        </>
        }
      </div>
    </div>
  );
};

export default Login;
