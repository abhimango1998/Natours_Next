import { NextResponse } from "next/server";

export async function POST() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/logout`, {
    method: "POST",
  });
  if (!res.ok) throw new Error("Logout failed");
  const data = await res.json();
  const nxtRes = NextResponse.json(data);
  const setCookie = res.headers.get("set-cookie");
  if (setCookie) {
    nxtRes.headers.set("set-cookie", setCookie);
  }
  return nxtRes;
}
