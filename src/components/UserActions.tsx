"use client";

import { useUserContext } from "@/context/UserContext";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useRef, useEffect } from "react";

const UserActions = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user, setUser } = useUserContext();

  // Close menu if clicked outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    const res = await fetch("/api/logout", {
      method: "POST",
    });

    if (res.ok) {
      setUser(null);
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
  };

  const navigateToProfile = () => {
    router.push("/profile");
    setOpen(false);
  };

  return (
    <div className="relative flex items-center space-x-4" ref={dropdownRef}>
      {!user ? (
        <Link
          href="/login"
          className="px-4 py-2 border border-green-600 text-green-600 rounded hover:bg-green-600 hover:text-white transition"
        >
          Login
        </Link>
      ) : (
        <>
          <div
            onClick={() => setOpen(!open)}
            className="h-10 w-10 rounded-full bg-green-500 flex items-center justify-center text-white font-bold cursor-pointer select-none"
          >
            <Image width={40} height={40} src={user.photo} alt="user-img" />
          </div>

          {open && (
            <div className="absolute right-0 top-12 w-56 bg-white rounded-lg shadow-lg border p-4">
              <div className="mb-3">
                <p className="font-semibold text-gray-800">{user.name}</p>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>
              <button
                onClick={navigateToProfile}
                className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition cursor-pointer"
              >
                Profile
              </button>
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition cursor-pointer"
              >
                Logout
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default UserActions;
