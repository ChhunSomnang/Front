import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../api/slice";

export default function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const { loading, error } = useSelector((state) => state.user);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isFormValid, setIsFormValid] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length >= 8 && confirmPassword === password) {
      setIsFormValid(true);

      const response = {
        name: name,
        email: email,
        phone_number: phoneNumber,
        password: password,
        password_confirmation: confirmPassword,
      };

      dispatch(registerUser(response))
        .then((action) => {
          if (action.payload) {
              setName("");
              setEmail("");
              setPhoneNumber("");
              setPassword("");
              setConfirmPassword("");
            }
            navigate("/");
        })
        .catch((e) => {
          console.error("Error registering user:", e.messages);
        });

      console.log("User data:", response);

    } else {
      setIsFormValid(false);
      console.log("Please Fill in the requirement");
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900">
                *Enter Name
              </label>
            </div>
            <div className="mt-2">
              <input
                id="name"
                name="name"
                value={name}
                type="text"
                onChange={(e) => setName(e.target.value)}
                required
                className="block p-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
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
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="phoneNumber"
              className="block text-sm font-medium leading-6 text-gray-900">
              Phone Number
            </label>
            <div className="mt-2">
              <input
                id="phoneNumber"
                name="phoneNumber"
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required

                className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900">
                *Create Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="block p-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            {password.length < 8 && (
              <p className="text-red-500 text-xs">
                *Your password must contain at least 8 characters
              </p>
            )}
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium leading-6 text-gray-900">
                Confirm Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={confirmPassword}
                required
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="block p-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            {confirmPassword !== password && (
              <p className="text-red-500 text-xs">
                *Your password doesn't match
              </p>
            )}
          </div>
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              {loading ? "Loading..." : "Sign In"}
            </button>
            {isFormValid && (
              <p className="text-green-500 text-xs">
                Your login has been submitted
              </p>
            )}
            {isFormValid === false && (
              <p className="text-red-500 text-xs">
                Your login does not match requirement
              </p>
            )}
            {error && <div className="">{error}</div>}
          </div>
          <div className="py-3 flex justify-center items-center text-sm text-black before:flex-1 before:border-t before:border-gray-200 before:me-6 after:flex-1 after:border-t after:border-gray-200 after:ms-6  dark:before:border-neutral-600 dark:after:border-neutral-600">
            or sign up with
          </div>
          <div className="flex justify-center items-center gap-8">
            <button
              type="button"
              className="flex w-full items-center gap-2 justify-center rounded-md bg-white px-3 py-1.5 text-xs border border-slate-600 font-semibold leading-6 text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Sign Up with Google
            </button>


            <button
              type="button"
              className="flex w-full items-center gap-2 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-xs font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Sign Up with Facebook
            </button>
          </div>
        </form>

        <div className="flex justify-center items-center mt-4 gap-4">
          <p className="text-sm text-gray-500">Already have an account?</p>
          <Link to={"/login"} className="text-sm text-red-600 hover:text-indigo-500">
            Login
          </Link>
          <p className="text-xs text-gray-500">/</p>
          <Link to={"/"} className="text-sm text-indigo-600 hover:text-indigo-500">
            Go to home
          </Link>
        </div>
      </div>
    </div>
  );
}
