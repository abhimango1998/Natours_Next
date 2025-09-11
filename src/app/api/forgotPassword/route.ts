import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { email } = await request.json();
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/users/forgotPassword`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    }
  );

  const data = await res.json();

  return NextResponse.json(data);
}
