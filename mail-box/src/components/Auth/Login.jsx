import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authAction } from "../../store/Auth";
import SignUp from "./SignUp"; 

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const toggleAuth = useSelector((state) => state.auth.toggleAuth);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDxCfHIwgrWuHlbXj3EbWcpiVthuK4RhjQ`,
        {
          method: "POST",
          body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const resData = await res.json();
      if (resData.error) {
        setError("Invalid email or password. Please try again.");
      } else {
        dispatch(authAction.login(resData.idToken));
        // localStorage.setItem('email',resData.email)
        setError("");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div>
      {toggleAuth ? (
        <SignUp />
      ) : (
        <div className="min-h-screen flex items-center justify-center bg-violet-200 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <div>
              <h2 className="mt-6 font-serif text-center text-3xl font-extrabold text-gray-900">
                Log In To Your Account
              </h2>
            </div>
            <form className="mt-8 space-y-6" onSubmit={handleLogin}>
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="email-address" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm h-12"
                    placeholder="Email address"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm h-12"
                    placeholder="Password"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block font-serif text-lg text-gray-900">
                    Remember me
                  </label>
                </div>

                <div className="text-lg text-violet-600 cursor-pointer font-serif">
                  <button>Forget Password</button>
                </div>
              </div>

              {error && <div className="text-red-500 text-sm">{error}</div>}

              <div>
                <button
                  type="submit"
                  className="group relative font-serif w-full mb-2 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Log In
                </button>

                <button
                  type="button"
                  className="group relative font-serif w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={() => dispatch(authAction.toggleAuth())}
                >
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
