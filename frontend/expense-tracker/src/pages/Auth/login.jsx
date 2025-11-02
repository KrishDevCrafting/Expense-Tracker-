import React, { useContext } from "react";
import { UserContext } from "../../context/Context";
import AuthLayout from "../../components/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Inputs";
import axiosInstance from "../../utils/axios";
import { API_PATHS } from "../../utils/apiPaths";

const validEmail = (email) => /\S+@\S+\.\S+/.test(email);

const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState(null);
  const navigate = useNavigate();
  const { updateUser } = useContext(UserContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!password) {
      setError("Please enter the password.");
      return;
    }
    setError("");

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });

      const { token, user } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong, please try again later.");
      }
    }
  };

  return (
    <AuthLayout>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
        <div className="w-full max-w-md">
          <div className="bg-white shadow-md rounded-2xl p-8">
            <div className="flex flex-col items-center mb-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-indigo-500 flex items-center justify-center text-white text-2xl font-bold">
                ET
              </div>
              <h3 className="mt-4 text-2xl font-semibold text-gray-800">
                Welcome Back
              </h3>
              <p className="mt-1 text-sm text-gray-500 text-center">
                Please enter your details to log in
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                value={email}
                onChange={({ target }) => setEmail(target.value)}
                label="Email Address"
                placeholder="Enter your email"
                type="email"
                className="w-full"
              />

              <Input
                value={password}
                onChange={({ target }) => setPassword(target.value)}
                label="Password"
                placeholder="Min 8 characters"
                type="password"
                className="w-full"
              />

              {error && (
                <div className="text-sm text-red-700 bg-red-50 border border-red-100 px-3 py-2 rounded">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-md font-semibold transition"
                aria-label="Login"
              >
                LOGIN
              </button>

              <div className="flex items-center justify-between text-sm text-gray-500">
                <Link to="/forgot-password" className="hover:underline">
                  Forgot password?
                </Link>
                <p>
                  Don't have an account?{" "}
                  <Link
                    className="font-medium text-purple-600 hover:underline"
                    to="/signup"
                  >
                    Sign up
                  </Link>
                </p>
              </div>
            </form>
          </div>

          <p className="text-center text-xs text-gray-400 mt-4">
            By continuing you agree to our Terms & Privacy.
          </p>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Login;
