import React from "react";
import AuthLayout from "../../components/layout/AuthLayout";
import { useNavigate } from "react-router-dom";
import Input from "../../components/layout/Inputs/Inputs";
import { LuTarget } from "react-icons/lu";
const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState(null);
  const navigate = useNavigate();







   //  Handle Login Foprm Submit!!

   const handleLogin = async (e)=>{

   }





  return (
 
    <>
      <AuthLayout>
        <div className="lg:w-[70%] md:h-full flex flex-col justify-center">
          <h3 className="text-xl font-semibold">Welcome Back</h3>
          <p className="text-xs text-slate-700 mt-[5px] md-6">
            please enter your details to log in
          </p>

          <form action="" onSubmit={handleLogin}>
            <Input
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              label="Email Address"
              placeholder="Enter your email"
              type="email"
            />
          </form>
        </div>
      </AuthLayout>
    </>
  );
};

export default Login;
