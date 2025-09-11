// app/tours/[slug]/page.tsx
import Image from "next/image";
import { notFound } from "next/navigation";
import { Tour } from "@/types/tour";
import { getTour } from "@/lib/api/toursApi";

export default async function TourDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const tour: Tour = await getTour(slug);

  if (!tour) {
    notFound();
  }

  return (
    <main className="container mx-auto px-4 py-10">
      {/* Hero Section */}
      <section className="relative w-full h-96 rounded-2xl overflow-hidden shadow-lg">
        <Image
          src={
            tour.imageCover.startsWith("https://")
              ? tour.imageCover
              : "https://www.marveltours.in/frontend/new/images/kerala.jpg"
          }
          alt={tour.name}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white text-center">
            {tour.name}
          </h1>
        </div>
      </section>

      {/* Summary Info */}
      <section className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <InfoCard label="Duration" value={`${tour.duration} days`} />
        <InfoCard label="Group Size" value={tour.maxGroupSize} />
        <InfoCard label="Difficulty" value={tour.difficulty} />
        <InfoCard label="Price" value={`$${tour.price}`} />
      </section>

      {/* Ratings */}
      <section className="mt-6">
        <p className="text-lg font-semibold">
          ⭐ {tour.ratingsAverage} ({tour.ratingsQuantity} reviews)
        </p>
      </section>

      {/* Description */}
      <section className="mt-8">
        <h2 className="text-2xl font-bold mb-2">Summary</h2>
        <p className="text-gray-700">{tour.summary}</p>

        <h2 className="text-2xl font-bold mt-6 mb-2">Description</h2>
        <p className="text-gray-700 whitespace-pre-line">{tour.description}</p>
      </section>

      {/* Images Gallery */}
      <section className="mt-10">
        <h2 className="text-2xl font-bold mb-4">Gallery</h2>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {tour.images.map((img, i) => (
            <Image
              key={i}
              src={
                img.startsWith("https://")
                  ? img
                  : "https://www.marveltours.in/frontend/new/images/kerala.jpg"
              }
              alt={`${tour.name} image ${i + 1}`}
              width={400}
              height={250}
              className="rounded-xl object-cover w-full h-64"
            />
          ))}
        </div>
      </section>

      {/* Start Dates */}
      <section className="mt-10">
        <h2 className="text-2xl font-bold mb-4">Upcoming Dates</h2>
        <ul className="list-disc pl-6 text-gray-700">
          {tour.startDates.map((date, i) => (
            <li key={i}>{new Date(date).toDateString()}</li>
          ))}
        </ul>
      </section>

      {/* Start Location */}
      <section className="mt-10">
        <h2 className="text-2xl font-bold mb-4">Start Location</h2>
        <p className="text-gray-700">{tour.startLocation.description}</p>
        <p className="text-gray-500">{tour.startLocation.address}</p>
      </section>

      {/* Locations */}
      <section className="mt-10">
        <h2 className="text-2xl font-bold mb-4">Itinerary</h2>
        <ol className="space-y-4">
          {tour.locations.map((loc) => (
            <li
              key={loc._id}
              className="p-4 border rounded-xl bg-gray-50 shadow-sm"
            >
              <p className="font-semibold">Day {loc.day}</p>
              <p className="text-gray-700">{loc.description}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Guides */}
      <section className="mt-10">
        <h2 className="text-2xl font-bold mb-4">Guides</h2>
        <div className="flex flex-wrap gap-6">
          {tour.guides.map((guide) => (
            <div
              key={guide._id}
              className="flex items-center gap-4 p-4 rounded-xl border shadow-sm bg-white"
            >
              <Image
                src={`/${guide.photo}`}
                alt={guide.name}
                width={64}
                height={64}
                className="rounded-full object-cover"
              />
              <div>
                <p className="font-semibold">{guide.name}</p>
                <p className="text-sm text-gray-500">{guide.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section className="mt-10">
        <h2 className="text-2xl font-bold mb-4">Reviews</h2>
        <div className="space-y-6">
          {tour.reviews?.map((review) => (
            <div
              key={review._id}
              className="p-6 rounded-xl border bg-white shadow-md"
            >
              <div className="flex items-center gap-4 mb-3">
                <Image
                  src={`/${review.user.photo}`}
                  alt={review.user.name}
                  width={48}
                  height={48}
                  className="rounded-full"
                />
                <div>
                  <p className="font-semibold">{review.user.name}</p>
                  <p className="text-yellow-500">⭐ {review.rating}</p>
                </div>
              </div>
              <p className="text-gray-700">{review.review}</p>
              <p className="text-xs text-gray-400 mt-2">
                {new Date(review.createdAt).toDateString()}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

/* Small info card component for reuse */
function InfoCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="p-6 rounded-xl border bg-white shadow-md text-center">
      <p className="text-gray-500 text-sm">{label}</p>
      <p className="text-lg font-bold">{value}</p>
    </div>
  );
}
