// src/pages/Profile.jsx
import React, { useEffect, useState } from "react";
import { getProfile } from "../api/api";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("access_token"); // login se store kiya hoga

  useEffect(() => {
    if (!token) return setError("User not logged in");

    const fetchProfile = async () => {
      try {
        const res = await getProfile(token);
        setProfile(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch profile");
      }
    };

    fetchProfile();
  }, [token]);

  if (error) return <p className="text-red-500">{error}</p>;
  if (!profile) return <p>Loading profile...</p>;

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded">
      <h2 className="text-xl font-bold mb-4">Profile Info</h2>
      <p><strong>Username:</strong> {profile.username}</p>
      <p><strong>Country:</strong> {profile.country}</p>
      <p><strong>Currency:</strong> {profile.currency}</p>
      <p><strong>Basic used:</strong> {profile.basic_count}</p>
      <p><strong>Deep used:</strong> {profile.deep_count}</p>
      <p><strong>Paid user:</strong> {profile.is_paid ? "Yes" : "No"}</p>
    </div>
  );
}