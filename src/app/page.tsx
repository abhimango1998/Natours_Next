// app/page.tsx
import TourCard from "@/components/TourCard";
import { getTours } from "@/lib/api/toursApi";
import { Tour } from "@/types/tour";

export default async function HomePage() {
  const tours = await getTours();

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Available Tours</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {tours?.data?.data.map((tour: Tour) => (
          <TourCard key={tour.id} tour={tour} />
        ))}
      </div>
    </main>
  );
}
