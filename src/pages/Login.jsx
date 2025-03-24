import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { users } from "../credentials/users"; // Use curly braces for named import

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    const user = users.find(
      (user) => user.email === email && user.password === password
    );
    if (user) {
      navigate("/home");
    } else {
      alert("Invalid email or password"); // Alert for invalid credentials
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm rounded-lg bg-white p-8 shadow-md">
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
          Welcome Back
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Update email state
              className="mt-1 w-full rounded-md border border-gray-300 p-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Update password state
              className="mt-1 w-full rounded-md border border-gray-300 p-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-md bg-indigo-500 py-2 text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1"
          >
            Sign In
          </button>
        </form>
        {/* <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <a
            href="#"
            className="font-medium text-indigo-500 hover:underline"
          >
            Sign Up
          </a>
        </p> */}
      </div>
    </div>
  );
};

export default LoginPage;
