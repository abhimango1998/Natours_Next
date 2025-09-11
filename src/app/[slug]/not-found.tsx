// components/TourNotFound.tsx
import Link from "next/link";

const TourNotFound = () => {
  return (
    <div className="flex h-[70vh] flex-col items-center justify-center text-center px-4">
      <h1 className="text-6xl font-extrabold text-blue-600">Tour Not Found</h1>
      <p className="mt-4 text-lg text-gray-600 max-w-lg">
        Sorry, the tour you’re looking for doesn’t exist or may have been
        removed.
      </p>

      <Link
        href="/"
        className="mt-6 inline-block rounded-xl bg-blue-600 px-6 py-3 text-white font-medium shadow-md hover:bg-blue-700 transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default TourNotFound;
