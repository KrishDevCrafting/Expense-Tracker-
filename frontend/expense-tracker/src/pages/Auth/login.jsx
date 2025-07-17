import React from "react";
import AuthLayout from "../../components/layout/AuthLayout";
const Login = () => {
  return (
    <>
      <AuthLayout>
        
        <div className="lg:w-[70%] md:h-full flex flex-col justify-center">
          <h3 className="text-xl font-semibold">Welcome Back</h3>
          <p className="text-xs text-slate-700 mt-[5px] md-6">
            please enter your details to log in
          </p>
        </div>
      </AuthLayout>
    </>
  );
};

export default Login;
