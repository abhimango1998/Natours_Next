"use client";
import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const BookTourBtn = ({ tourID }: { tourID: string }) => {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/bookings/checkout-session/${tourID}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );

      if (!res.ok) {
        throw new Error("Creating bookings checkout sessions got failed!");
      }

      const data = await res.json();
      const sessionId = data.session?.id;

      if (!sessionId) throw new Error("No session id returned from server");

      const stripe = await stripePromise;
      const { error } = await stripe!.redirectToCheckout({ sessionId });

      if (error) {
        // Stripe will return an error object if redirect fails
        alert(error.message);
        setLoading(false);
      }
      //   if redirect is successful, user leaves the page; no further code runs
    } catch (err) {
      console.error(err);
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert("Payment failed");
      }
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className=" ml-4 cursor-pointer px-6 py-2 rounded-lg bg-green-500/80 text-white hover:bg-green-600 transition-colors duration-200"
    >
      Book Tour
    </button>
  );
};

export default BookTourBtn;
