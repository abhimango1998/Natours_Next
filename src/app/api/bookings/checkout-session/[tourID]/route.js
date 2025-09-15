import { getTokenFromCookie } from "@/lib/utils/authHelper";
import { NextResponse } from "next/server";

export async function POST(req, { params }) {
  const tourId = (await params).tourID;
  const token = await getTokenFromCookie();
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/bookings/checkout-session/${tourId}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json", Cookie: `jwt=${token}` },
    }
  );

  const data = await res.json();

  return NextResponse.json(data, { status: res.status });
}
