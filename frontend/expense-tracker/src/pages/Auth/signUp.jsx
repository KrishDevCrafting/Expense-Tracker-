import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../components/layout/AuthLayout";
import Input from "../../components/layout/Inputs/Inputs"; // Add this import

export default function SignUp() {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState(""); // Fix casing
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // Use empty string
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  //handle sign up From Submit!!
  const handleSign = async (e) => {};

  return (
    <AuthLayout>
      <div className="lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex-col justify-center">
        <h3 className="text-xs font-semibold text-black">Create an account</h3>{" "}
        {/* Fix class */}
        <p className="text-xs text-slate-700 mt-[5px] mb-6 ">
          Join us Today by entering your details below.
        </p>
        <form onSubmit={handleSign}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              value={fullName}
              onChange={({ target }) => setFullName(target.value)} // Fix setter
              label="Full Name"
              placeholder="john"
              type="text"
            />

            <Input
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              label="Email Address"
              placeholder="Enter your email"
              type="email"
            />
            <div className="col-span-2"></div>
            <Input
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              label="Password"
              placeholder="min 8 characters"
              type="password"
            />
          </div>
        </form>
      </div>
    </AuthLayout>
  );
}
