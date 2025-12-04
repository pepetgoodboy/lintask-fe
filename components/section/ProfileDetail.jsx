"use client";

import { useState, useEffect } from "react";
import { apiFetch } from "@/lib/apiClient";

export default function ProfileDetail() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");

  async function fetchProfileData() {
    try {
      const res = await apiFetch("http://localhost:5000/api/v1/auth/profile");

      if (!res.ok) {
        throw new Error("Failed to fetch profile");
      }

      const data = await res.json();
      console.log(data);
      setProfile(data.data);
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => {
    fetchProfileData();
  }, []);

  return (
    <div className="flex flex-col mt-4 gap-1">
      <p className="text-lg text-gray-700">Name : {profile?.name}</p>
      <p className="text-lg text-gray-700">Email : {profile?.email}</p>
    </div>
  );
}
