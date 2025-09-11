import { Tour } from "@/types/tour";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const TourCard = ({ tour }: { tour: Tour }) => {
  return (
    <div className="rounded-2xl shadow-lg border border-gray-200 bg-white overflow-hidden hover:shadow-xl transition-shadow">
      <Image
        src={"https://www.marveltours.in/frontend/new/images/kerala.jpg"}
        alt={tour.name}
        width={400}
        height={300}
        className="h-48 w-full object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl text-gray-700 font-semibold">{tour.name}</h2>
        <p className="text-gray-600 text-sm mt-2 line-clamp-3">
          {tour.description}
        </p>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-lg font-bold text-blue-600">${tour.price}</span>
          <Link
            href={`/${tour.slug}`}
            className="cursor-pointer px-4 py-2 rounded-xl bg-blue-600 text-white text-sm hover:bg-blue-700 transition-colors"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TourCard;
