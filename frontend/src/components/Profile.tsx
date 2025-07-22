import React, { useEffect, useState } from "react";

interface User {
  name: string;
  email: string;
  avatarUrl: string;
  bio: string;
}

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/auth/getuser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token") || "",
          },
        });

        if (!res.ok) {
          console.error("Failed to fetch user");
          setLoading(false);
          return;
        }

        const data: User = await res.json();
        setUser(data);
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return <p className="text-center mt-6">Loading profile...</p>;
  }

  if (!user) {
    return (
      <p className="text-center mt-6 text-red-500">
        Failed to load profile. Please try logging in again.
      </p>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-md rounded-xl p-6 w-full max-w-md text-center">
        {/* Avatar */}
        <img
          src={user.avatarUrl || "https://via.placeholder.com/100"}
          alt="avatar"
          className="w-24 h-24 rounded-full object-cover mx-auto"
        />

        {/* Name */}
        <h2 className="text-2xl font-bold mt-4">{user.name}</h2>
        <p className="text-gray-500">{user.email}</p>

        {/* Bio */}
        <p className="mt-2 text-gray-700">
          {user.bio ? user.bio : "No bio yet."}
        </p>
      </div>
    </div>
  );
}
