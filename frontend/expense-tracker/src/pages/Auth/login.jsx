import React, { useContext } from "react"; // 1. Import useContext
import { UserContext } from "../../context/Context"; // 2. Import your UserContext
import AuthLayout from "../../components/layout/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/layout/Inputs/Inputs";
import axiosInstance from "../../utils/axios";
import { API_PATHS } from "../../utils/apiPaths";

const validEmail = (email) => /\S+@\S+\.\S+/.test(email);

const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState(null);
  const navigate = useNavigate();
  const { updateUser } = useContext(UserContext); // 3. Get updateUser from context

  //  Handle Login Foprm Submit!!

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validEmail(email)) {
      setError("please enter a valid email address!");
      return;
    }
    if (!password) {
      setError("please enter the password!");
      return;
    }
    setError("");

    // login APi call

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });

      const { token, user } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(user); // 4. Call updateUser with the user data from the API!
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("something went wrong, please try again later");
      }
    }
  };

  return (
    // ... your JSX remains exactly the same
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

            <Input
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              label="Password"
              placeholder="min 8 characters"
              type="password"
            />

            {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}
            <button type="submit" className="btn-primary">
              LOGIN
            </button>

            <p className="text-[13px] text-slate-800 mt-3">
              Don't have an account?
              <Link className="font-medium text-primary underline" to="/signup">
                SignUp
              </Link>
            </p>
          </form>
        </div>
      </AuthLayout>
    </>
  );
};

export default Login;
