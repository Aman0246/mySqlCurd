import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signupApi } from "../redux/api";
import { useDispatch, useSelector } from "react-redux";

export default function Signup() {
  let dispatch = useDispatch();
  let selector = useSelector((state) => state);
  console.log(selector);
  let [email, setemail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  let [password, setpassword] = useState("");
  let [name, setname] = useState("");
  const navigate =useNavigate()
  let handlesubmit = async (e) => {
    e.preventDefault();
    let data =await dispatch(signupApi({ email, password, isAdmin, name }));
       if(data.payload
    .message=="User registered successfully"){
    navigate('/signin')
  }
  };





  return (
    <div>
      <div class="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign up
          </h2>
          <p class="mt-2 text-center text-sm text-gray-600 max-w">
            Or
            <div></div>
            <Link
              to="/signin"
              class="font-medium text-blue-600 hover:text-blue-500"
            >
              Login to your account
            </Link>
          </p>
        </div>

        <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form class="space-y-6" onSubmit={handlesubmit}>
              <div>
                <label
                  for="text"
                  class="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <div class="mt-1">
                  <input
                    value={name}
                    onChange={(e) => setname(e.target.value)}
                    id="text"
                    name="text"
                    type="text"
                    required
                    class="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Enter your Name"
                  />
                </div>
              </div>
              <div>
                <label
                  for="email"
                  class="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <div class="mt-1">
                  <input
                    id="email"
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                    name="email"
                    type="email"
                    autocomplete="email"
                    required
                    class="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Enter your email address"
                  />
                </div>
              </div>

              <div>
                <label
                  for="password"
                  class="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div class="mt-1">
                  <input
                    value={password}
                    onChange={(e) => setpassword(e.target.value)}
                    id="password"
                    name="password"
                    type="password"
                    autocomplete="current-password"
                    required
                    class="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Enter your password"
                  />
                </div>
              </div>

              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <input
                    checked={isAdmin}
                    onChange={(e) => setIsAdmin(e.target.checked)}
                    id="remember_me"
                    name="remember_me"
                    type="checkbox"
                    class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label
                    for="remember_me"
                    class="ml-2 block text-sm text-gray-900"
                  >
                    Want to be admin
                  </label>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Sign Up
                </button>
              </div>
            </form>
            <div class="mt-6">
              <div class="relative">
                <div class="absolute inset-0 flex items-center">
                  <div class="w-full border-t border-gray-300"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
