import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthLayout from "../../components/AuthLayout";
import Input from "../../components/Inputs/Inputs";
import { ProfilePhotoSelector } from "../../components/Inputs/ProfilePhotoSelector";
import axiosInstance from "../../utils/axios";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/Context";
import uploadImage from "../../utils/uploadImage";

export default function SignUp() {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { updateUser } = useContext(UserContext);

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleSign = async (e) => {
    e.preventDefault();

    if (!fullName) return setError("Please enter your name");
    if (!validateEmail(email))
      return setError("Please enter a valid email address");
    if (!password) return setError("Please enter the password");
    if (password.length < 8)
      return setError("Password must be at least 8 characters");

    setError("");

    let profileImageUrl = "";

    try {
      if (profilePic) {
        const imgUploadRes = await uploadImage(profilePic);
        profileImageUrl = imgUploadRes.imageUrl || "";
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        fullName,
        email,
        password,
        profileImageUrl,
      });

      const { token, user } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    }
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-md mx-auto px-4 py-8 mt-8 md:mt-0">
        <h3 className="text-2xl md:text-3xl font-semibold text-black text-center">
          Create an account
        </h3>

        <p className="text-sm md:text-base text-slate-700 mt-2 mb-6 text-center">
          Join us today by entering your details below.
        </p>

        <form onSubmit={handleSign}>
          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              value={fullName}
              onChange={({ target }) => setFullName(target.value)}
              label="Full Name"
              placeholder="John"
              type="text"
            />

            <Input
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              label="Email Address"
              placeholder="Enter your email"
              type="email"
            />

            <div className="md:col-span-2">
              <Input
                value={password}
                onChange={({ target }) => setPassword(target.value)}
                label="Password"
                placeholder="Min 8 characters"
                type="password"
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-xs mt-2">{error}</p>}

          <div className="mt-4 flex justify-center md:justify-start">
            <button
              type="submit"
              className="w-full md:w-auto bg-purple-500 hover:bg-purple-700 text-white px-6 py-2 rounded-lg"
            >
              SIGN UP
            </button>
          </div>

          <p className="text-[13px] text-slate-800 mt-4 text-center md:text-left">
            Already have an account?
            <Link
              className="font-medium text-primary underline px-1"
              to="/login"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
}
