"use client";

import React, { useState } from "react";
import { useUserContext } from "@/context/UserContext";
import UserPhotoForm from "@/components/UserPhotoForm";

const ProfilePage = () => {
  const { user } = useUserContext();

  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  if (!user) {
    return <div>Please log in to view your profile.</div>;
  }

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("New password and confirm password do not match.");
      return;
    }

    try {
      const res = await fetch("/api/updatePassword", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentPassword,
          password,
          confirmPassword,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Password updated successfully!");
        setCurrentPassword("");
        setPassword("");
        setConfirmPassword("");
      } else {
        setMessage(data.message || "Failed to update password.");
      }
    } catch (error) {
      setMessage("Something went wrong. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>

      <div className="mb-6">
        <UserPhotoForm userImg={user.photo} />
        <p>
          <strong>Full Name:</strong> {user.name}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
      </div>

      <h2 className="text-xl font-semibold mb-2">Change Password</h2>
      {message && <p className="mb-2 text-red-600">{message}</p>}

      <form onSubmit={handlePasswordChange} className="flex flex-col gap-3">
        <input
          type="password"
          placeholder="Current Password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          required
          className="p-2 border rounded"
        />

        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="p-2 border rounded"
        />

        <input
          type="password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="p-2 border rounded"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          Update Password
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;
