import React from "react";
import RegisterForm from "../components/register/register_form";
import RegisterInfo from "../components/register/register_info";

const Register = () => {
  return (
    <div className="w-full h-full">
      <div className="flex w-full h-full md:h-4/5 absolute-center justify-center">
        {" "}
        <RegisterForm />
        <RegisterInfo />
      </div>
    </div>
  );
};

export default Register;
