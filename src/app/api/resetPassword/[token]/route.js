import { BASE_API_URL } from "@/lib/constants";
import { NextResponse } from "next/server";

export async function PATCH(request, { params }) {
  const resetToken = params.token;
  const { password, confirmPassword } = await request.json();

  const res = await fetch(`${BASE_API_URL}/users/resetPassword/${resetToken}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password, confirmPassword }),
  });

  const data = await res.json();

  return NextResponse.json(data, { status: res.status });
}
