import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginAdmin } from "../../api/slice.js";
import { useState , useEffect } from "react";
import axios from "axios";


const AdminLogin = () => {
    
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleOnLogin = (e) => {
    e.preventDefault();
  
    const userCredentials = {
      email,
      password,
    };
  
    /** Dispatch the action of login */
    dispatch(loginAdmin(userCredentials)).then((action) => {
      if (action.payload) {
        const userRole = action.payload.role;
        if (userRole === "customer") {
          console.log(`This is ${userRole} `);
          setError('Only admins can log in here.');          
        } else {
          navigate("/admin/dashboard");
          console.log(`This is ${userRole}: `);          
        }
        setEmail("");
        setPassword("");
      }
    });
  };
  
   
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Sign in to your account
      </h2>
    </div>

    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form className="space-y-6" onSubmit={handleOnLogin}>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium leading-6 text-gray-900">
            Email address
          </label>
          <div className="mt-2">
            <input
              id="email"
              name="email"
              type="text"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-gray-900">
              Password
            </label>
          </div>
          <div className="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        
        <div>
          <button

            type="submit"
            className="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Login
          </button>
          {error && <div className="mt-2 text-red-600 text-sm">{error}</div>}
        </div>
        
        <div className="flex justify-center items-center mt-4 gap-4">
          <Link to="" className="text-sm text-red-600 hover:text-indigo-500">
            Forgot password
          </Link>
       </div>
        
                       
      </form>
    </div>
  </div>
  )
}

export default AdminLogin