// components/UserPhotoForm.js
import { useUserContext } from "@/context/UserContext";
import Image from "next/image";
import { useState } from "react";

export default function UserPhotoForm({ userImg }: { userImg: string }) {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState("");
  const { setUser } = useUserContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files.length > 0) {
      setFile(files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("photo", file);

    setStatus("Uploading...");

    const res = await fetch("/api/updateMe", {
      method: "PATCH", // or "POST"
      body: formData,
    });

    const data = await res.json();
    console.log("-----data----", data);

    if (res.ok) {
      setStatus("Upload successful!");
      setUser(data.data.user); // Update user context with new user data
    } else {
      setStatus("Upload failed.");
    }
  };

  return (
    <div>
      <Image
        src={file ? URL.createObjectURL(file) : userImg}
        alt="user-img"
        width={200}
        height={200}
      />
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          name="photo"
          accept="image/*"
          onChange={handleChange}
        />
        <button type="submit" className="cursor-pointer">
          Upload Photo
        </button>
        <p>{status}</p>
      </form>
    </div>
  );
}
