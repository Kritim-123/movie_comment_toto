import { useState, useEffect } from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Profile from "./components/Profile";

export default function App() {
  const [showSignup, setShowSignup] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch("http://localhost:4000/api/auth/getuser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
        });

        if (res.ok) {
          setIsLoggedIn(true);
        } else {
          localStorage.removeItem("token"); // ✅ auto-logout if invalid token
        }
      } catch (error) {
        console.error("Token validation failed", error);
        localStorage.removeItem("token");
      } finally {
        setLoading(false);
      }
    };

    validateToken();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {isLoggedIn ? (
        <div className="w-full max-w-md">
          <Profile />
          <button
            onClick={handleLogout}
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      ) : showSignup ? (
        <div>
          <Signup onSignup={() => setIsLoggedIn(true)} />
          <p className="mt-4 text-sm text-center">
            Already have an account?{" "}
            <button
              className="text-blue-500 hover:underline"
              onClick={() => setShowSignup(false)}
            >
              Click here to login
            </button>
          </p>
        </div>
      ) : (
        <div>
          <Login onLogin={() => setIsLoggedIn(true)} />
          <p className="mt-4 text-sm text-center">
            Don’t have an account?{" "}
            <button
              className="text-blue-500 hover:underline"
              onClick={() => setShowSignup(true)}
            >
              Click here to sign up
            </button>
          </p>
        </div>
      )}
    </div>
  );
}
