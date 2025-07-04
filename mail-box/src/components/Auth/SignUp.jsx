import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authAction } from "../../store/Auth";
import Login from "./Login";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const toggleAuth = useSelector((state) => state.auth.toggleAuth);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPass) {
      setError("Passwords do not match!");
      return;
    }
    setError("");
    try {
      const res = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDxCfHIwgrWuHlbXj3EbWcpiVthuK4RhjQ`,
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
      if (!res.ok) {
        const errorData = await res.json();
        setError(`Error: ${errorData.error.message}`);
        return;
      }
      const resData = await res.json();
      localStorage.setItem("email", resData.email);
      navigate('/inbox');
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
    setEmail("");
    setPassword("");
    setConfirmPass("");
  };

  return (
    < div>
      {toggleAuth ? (
        <div className="relative z-10 w-[150%] max-w-md p-10 bg-white/60 dark:bg-gray-900/70 rounded-3xl shadow-2xl backdrop-blur-lg flex flex-col gap-8 animate-fade-in-up border border-white/30 dark:border-gray-700/40">
          {/* Logo and tagline */}
          <div className="flex flex-col items-center gap-2">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-lg mb-2">
              {/* Placeholder for logo icon */}
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
            </div>
            <h2 className="text-3xl font-extrabold text-gray-800 dark:text-gray-100 font-sans tracking-tight">Create Account</h2>
            <p className="text-center text-gray-500 dark:text-gray-400 text-base">Sign up for your mailbox</p>
          </div>
          <form className="space-y-7" id="sign" onSubmit={handleSubmit}>
            <div className="relative">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-purple-500 transition-all duration-300 shadow-sm placeholder-gray-400 dark:placeholder-gray-500"
              />
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                minLength={6}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-purple-500 transition-all duration-300 shadow-sm pr-12 placeholder-gray-400 dark:placeholder-gray-500"
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
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPass}
                minLength={6}
                onChange={(e) => setConfirmPass(e.target.value)}
                placeholder="Confirm Password"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-purple-500 transition-all duration-300 shadow-sm pr-12 placeholder-gray-400 dark:placeholder-gray-500"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute top-3 right-3 text-gray-400 hover:text-blue-500 dark:hover:text-purple-400 transition-colors"
                tabIndex={-1}
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
              >
                {showConfirmPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.657.403-3.22 1.125-4.575M15 12a3 3 0 11-6 0 3 3 0 016 0zm6.364-2.364A9.956 9.956 0 0021.9 12c0 5.523-4.477 10-10 10a9.956 9.956 0 01-4.364-.964" /></svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm6.364-2.364A9.956 9.956 0 0021.9 12c0 5.523-4.477 10-10 10a9.956 9.956 0 01-4.364-.964" /></svg>
                )}
              </button>
            </div>
            {error && (
              <div className="text-red-500 text-center text-sm animate-shake animate-fade-in-down">{error}</div>
            )}
            <button
              type="submit"
              className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-purple-500 animate-fade-in-up"
            >
              Sign Up
            </button>
            <button
              type="button"
              onClick={() => dispatch(authAction.toggleAuth())}
              className="w-full py-3 px-4 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 font-semibold shadow transition-all duration-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              Have an account? <span className="text-blue-500 dark:text-purple-400">Login</span>
            </button>
          </form>
        </div>
      ) : (
        <Login />
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

export default SignUp;
