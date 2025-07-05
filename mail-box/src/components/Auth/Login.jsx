import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authAction } from "../../store/Auth";
import SignUp from "./SignUp"; 

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
        localStorage.setItem("email", email);
        setError("");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-700">
      {/* Animated floating shapes */}
      <svg className="absolute left-0 top-0 w-96 h-96 opacity-30 animate-float-slow z-0" viewBox="0 0 200 200"><circle cx="100" cy="100" r="100" fill="#a5b4fc" /></svg>
      <svg className="absolute right-0 bottom-0 w-80 h-80 opacity-20 animate-float-fast z-0" viewBox="0 0 200 200"><rect width="200" height="200" rx="60" fill="#f472b6" /></svg>
      <svg className="absolute left-1/2 top-1/4 w-40 h-40 opacity-20 animate-float-medium z-0" viewBox="0 0 200 200"><ellipse cx="100" cy="100" rx="100" ry="60" fill="#c4b5fd" /></svg>
      {toggleAuth ? (
        <SignUp />
      ) : (
        <div className="relative z-10 w-full max-w-md p-10 bg-white/60 dark:bg-gray-900/70 rounded-3xl shadow-2xl backdrop-blur-lg flex flex-col gap-8 animate-fade-in-up border border-white/30 dark:border-gray-700/40">
          {/* Logo and tagline */}
          <div className="flex flex-col items-center gap-2">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-lg mb-2">
              {/* Placeholder for logo icon */}
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
            </div>
            <h2 className="text-3xl font-extrabold text-gray-800 dark:text-gray-100 font-sans tracking-tight">Welcome Back</h2>
            <p className="text-center text-gray-500 dark:text-gray-400 text-base">Sign in to your mailbox</p>
          </div>
          <form className="space-y-7" onSubmit={handleLogin}>
            {/* Email input with placeholder only */}
            <div className="relative">
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-purple-500 transition-all duration-300 shadow-sm placeholder-gray-400 dark:placeholder-gray-500"
                placeholder="Email"
                  />
                </div>
            {/* Password input with placeholder only */}
            <div className="relative">
                  <input
                    id="password"
                    name="password"
                type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-purple-500 transition-all duration-300 shadow-sm pr-12 placeholder-gray-400 dark:placeholder-gray-500"
                    placeholder="Password"
                  />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute top-3 right-3 text-gray-400 hover:text-blue-500 dark:hover:text-purple-400 transition-colors"
                tabIndex={-1}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.657.403-3.22 1.125-4.575M15 12a3 3 0 11-6 0 3 3 0 016 0zm6.364-2.364A9.956 9.956 0 0021.9 12c0 5.523-4.477 10-10 10a9.956 9.956 0 01-4.364-.964" /></svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm6.364-2.364A9.956 9.956 0 0021.9 12c0 5.523-4.477 10-10 10a9.956 9.956 0 01-4.364-.964" /></svg>
                )}
              </button>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                  className="h-4 w-4 text-blue-500 dark:text-purple-400 focus:ring-blue-400 dark:focus:ring-purple-500 border-gray-300 dark:border-gray-700 rounded transition-colors"
                  />
                <label className="ml-2 text-sm text-gray-700 dark:text-gray-300">Remember me</label>
              </div>
              <button type="button" className="text-sm text-blue-500 dark:text-purple-400 hover:underline transition-colors">Forgot Password?</button>
            </div>
            {error && (
              <div className="text-red-500 text-center text-sm animate-shake animate-fade-in-down">{error}</div>
            )}
                <button
                  type="submit"
              className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-purple-500 animate-fade-in-up"
                >
                  Log In
                </button>
                <button
                  type="button"
              className="w-full py-3 px-4 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 font-semibold shadow transition-all duration-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                  onClick={() => dispatch(authAction.toggleAuth())}
                >
              Don&apos;t have an account? <span className="text-blue-500 dark:text-purple-400">Sign Up</span>
                </button>
            </form>
        </div>
      )}
      {/* Custom keyframes for floating shapes and shake animation */}
      <style>{`
        @keyframes float-slow { 0% { transform: translateY(0); } 50% { transform: translateY(-30px); } 100% { transform: translateY(0); } }
        @keyframes float-medium { 0% { transform: translateY(0); } 50% { transform: translateY(-15px); } 100% { transform: translateY(0); } }
        @keyframes float-fast { 0% { transform: translateY(0); } 50% { transform: translateY(-50px); } 100% { transform: translateY(0); } }
        .animate-float-slow { animation: float-slow 8s ease-in-out infinite; }
        .animate-float-medium { animation: float-medium 6s ease-in-out infinite; }
        .animate-float-fast { animation: float-fast 10s ease-in-out infinite; }
        @keyframes fade-in-up { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in-up { animation: fade-in-up 0.8s cubic-bezier(.39,.575,.565,1) both; }
        @keyframes fade-in-down { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in-down { animation: fade-in-down 0.5s cubic-bezier(.39,.575,.565,1) both; }
        @keyframes shake { 10%, 90% { transform: translateX(-1px); } 20%, 80% { transform: translateX(2px); } 30%, 50%, 70% { transform: translateX(-4px); } 40%, 60% { transform: translateX(4px); } }
        .animate-shake { animation: shake 0.4s cubic-bezier(.36,.07,.19,.97) both; }
      `}</style>
    </div>
  );
}

export default Login;
