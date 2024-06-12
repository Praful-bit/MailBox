import { useState } from "react";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (password !== confirmPass) {
      alert("Passwords do not match!");
      return;
    }
    
        try{
            const res =await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDxCfHIwgrWuHlbXj3EbWcpiVthuK4RhjQ`,{ method:"POST",
                body:JSON.stringify({
                    email:email,
                    password:password,
                    returnSecureToken: true,
                }),
                headers:{
                    "Content-Type":"application/json"
                },
              });
              const resData = await res.json()
              console.log(resData)
        }catch(err){
            console.log(err)
        }
     
    
    setEmail("");
    setPassword("");
    setConfirmPass("");
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-xs p-8 bg-white rounded shadow-md">
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">
          SignUp
        </h2>
        <form id="sign" className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <input
            type="password"
            value={password}
            min={6}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <input
            type="password"
            value={confirmPass}
            min={6}
            onChange={(e) => setConfirmPass(e.target.value)}
            placeholder="Confirm Password"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            Sign Up
          </button>
          <div className="text-center">
            <a href="#" className="text-sm text-blue-600 hover:underline">
              Have an account? Login
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
