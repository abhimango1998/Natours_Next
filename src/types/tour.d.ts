export interface StartLocation {
  type: "Point";
  coordinates: [number, number]; // [longitude, latitude]
  address: string;
  description: string;
}

export interface Location {
  type: "Point";
  coordinates: [number, number];
  description: string;
  day: number;
  _id: string;
  id: string;
}

export interface Guide {
  _id: string;
  name: string;
  email: string;
  photo: string;
  role: "lead-guide" | "guide"; // extend if there are more roles
}

export interface Review {
  _id: string;
  review: string;
  rating: number;
  createdAt: string; // ISO date string
  user: {
    id: string;
    name: string;
    photo: string;
  };
}

export interface Tour {
  startLocation: StartLocation;
  _id: string;
  id: string;
  name: string;
  duration: number;
  maxGroupSize: number;
  difficulty: "easy" | "medium" | "difficult"; // enforce enum
  ratingsAverage: number;
  ratingsQuantity: number;
  price: number;
  summary: string;
  description: string;
  imageCover: string;
  images: string[];
  startDates: string[]; // ISO date strings
  secretTour: boolean;
  locations: Location[];
  guides: Guide[];
  slug: string;
  durationWeeks: number;
  reviews?: Review[];
}
