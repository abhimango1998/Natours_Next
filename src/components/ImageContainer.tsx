"use client";
import { useUserContext } from "@/context/UserContext";
import { BASE_API_URL } from "@/lib/constants";
import { Tour } from "@/types/tour";
import Image from "next/image";
import React, { useState } from "react";

const ImageContainer = ({ tour }: { tour: Tour }) => {
  const { user } = useUserContext();
  const [currCoverImg, setCurrImg] = useState(tour.imageCover);
  const [file, setFile] = useState<File | null>(null);
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files.length > 0) {
      setFile(files[0]);
    }
  };

  const handleUploadPhoto = async () => {
    if (!file) {
      alert("No file selected!");
      return;
    }
    const formData = new FormData();

    formData.append("imageCover", file);

    const res = await fetch(`${BASE_API_URL}/tours/${tour._id}`, {
      method: "PATCH",
      credentials: "include",
      body: formData,
    });

    const data = await res.json();

    if (!res.ok) {
      alert("Photo not updated!");
    } else {
      setCurrImg(data.data.data.imageCover);
      alert("Image Updated successfully");
      setFile(null);
    }
  };

  return (
    <>
      {user?.role === "admin" && (
        <>
          <div className=" bg-gray-900 px-2 py-1 cursor-pointer">
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </div>
          {file && (
            <button
              className="bg-green-400  px-2 py-1"
              onClick={handleUploadPhoto}
            >
              Update
            </button>
          )}
        </>
      )}
      <Image
        src={
          file
            ? URL.createObjectURL(file)
            : currCoverImg.startsWith("https://")
            ? currCoverImg
            : "https://www.marveltours.in/frontend/new/images/kerala.jpg"
        }
        alt={"Tour cover img"}
        width={400}
        height={300}
        className="h-48 w-full object-cover"
      />
    </>
  );
};

export default ImageContainer;
