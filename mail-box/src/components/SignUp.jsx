function SignUp() {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-xs p-8 bg-white rounded shadow-md">
          <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">SignUp</h2>
          <form id="sign" className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <input
              type="password"
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
    )
  }
  
  export default SignUp
  