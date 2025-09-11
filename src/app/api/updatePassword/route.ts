import { BASE_API_URL } from "@/lib/constants";
import { getTokenFromCookie } from "@/lib/utils/authHelper";
import { NextResponse } from "next/server";

export async function PATCH(request: Request) {
  const { currentPassword, password, confirmPassword } = await request.json();

  const token = await getTokenFromCookie();

  const response = await fetch(`${BASE_API_URL}/users/updatePassword`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Cookie: `jwt=${token}`,
    },
    body: JSON.stringify({ currentPassword, password, confirmPassword }),
  });

  console.log("-----------data", response);
  const data = await response.json();

  return NextResponse.json(data, { status: response.status });
}
