import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../api/slice.js";
import { useState , useEffect } from "react";
import axios from "axios";

export default function Login() {

  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const { loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginUrl , setLoginUrl] = useState(null);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/auth", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then((response) => {
        if (response.status === 200) {
          return response.data;
        }
        throw new Error("Something went wrong!");
      })
      .then((data) => setLoginUrl(data.url))
      .catch((error) => console.error(error));
  }, []);

  const handleOnLogin = (e) => {
    e.preventDefault();
  
    let userCredentials = {};
  
    // Check if the input value is in email format
    const isEmail = (input) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(input);
    };
  
    if (isEmail(credential)) {
      userCredentials = {
        email: credential,
        password,
      };
    } else {
      userCredentials = {
        mobile_no: credential,
        password,
      };
    }
  
    /** Dispatch the action of login */
    dispatch(loginUser(userCredentials)).then((action) => {
      if (action.payload) {
        const userRole = action.payload.role;
        if (userRole === "admin") {
          console.log(`This is ${userRole} `);
          navigate("/admin/dashboard");
        } else {
          console.log(`This is ${userRole}: `);
          navigate("/");
        }
        setCredential("");
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
        <form className="space-y-6" action="#" method="POST">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900">
              Email address / Phone Number
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={credential}
                onChange={(e) => setCredential(e.target.value)}
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
              onClick={handleOnLogin}
              type="submit"
              className="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              {loading ? "Loading..." : "Sign In"}
            </button>
            {error && <div className="">{error}</div>}
          </div>
          <div className="flex justify-center  items-center mt-4 gap-4">
            <Link to="" className="text-sm  text-red-600 hover:text-indigo-500">
              Forgot password
            </Link>
          </div>
          <div className=" flex justify-center items-center text-sm text-black before:flex-1 before:border-t before:border-gray-200 before:me-6 after:flex-1 after:border-t after:border-gray-200 after:ms-6  dark:before:border-neutral-600 dark:after:border-neutral-600">
            or continue with
          </div>
          <div className="flex justify-center items-center gap-8">
            
          {loginUrl != null && (
              <a
                href={loginUrl}
                className="flex w-full items-center gap-2 justify-center rounded-md bg-white px-3 py-1.5 text-xs  border border-slate-600    font-semibold leading-6 text-black shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                <i className="fa-brands fa-google"></i>
                Google Sign In
              </a>
            )}

            <button
              type="submit"
              className="flex w-full items-center gap-2 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-xs font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              <i className="fa-brands fa-facebook"></i>
              Sign in with Facebook
              
            </button>
          </div>
        </form>

        <div className="flex justify-center  items-center mt-4 gap-4">
          <p href="#" className="text-sm text-gray-500">
            Not a member?
          </p>
          <Link
            href={"/signup"}
            className="text-xs font-semibold text-red-600 hover:text-indigo-500">
            Sign Up
          </Link>
          <p href="#" className="text-sm text-gray-500">
            /
          </p>
          <Link
            to={"/"}
            className="text-sm text-center text-indigo-600 hover:text-indigo-500">
            Go to home
          </Link>
        </div>
      </div>
    </div>
  );
}