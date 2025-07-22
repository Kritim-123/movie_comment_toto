import { useState } from "react";
import Login from "./components/Login.tsx";
import Signup from "./components/Signup.tsx";

export default function App() {
  const [showSignup, setShowSignup] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {showSignup ? <Signup /> : <Login />}

      <p className="mt-4 text-sm">
        {showSignup ? (
          <>
            Already have an account?{" "}
            <button
              className="text-blue-500 hover:underline"
              onClick={() => setShowSignup(false)}
            >
              Click here to login
            </button>
          </>
        ) : (
          <>
            Don’t have an account?{" "}
            <button
              className="text-blue-500 hover:underline"
              onClick={() => setShowSignup(true)}
            >
              Click here to sign up
            </button>
          </>
        )}
      </p>
    </div>
  );
}
