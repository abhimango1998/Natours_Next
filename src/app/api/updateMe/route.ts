import { BASE_API_URL } from "@/lib/constants";
import { getTokenFromCookie } from "@/lib/utils/authHelper";
import { NextResponse } from "next/server";

export async function PATCH(request: Request) {
  const formData = await request.formData();
  console.log("-----formData----", formData);
  const photo = formData.get("photo");

  console.log("----photo----", photo);

  const token = await getTokenFromCookie();

  const res = await fetch(`${BASE_API_URL}/users/updateMe`, {
    method: "PATCH",
    body: formData,
    headers: {
      Cookie: `jwt=${token}`,
    },
  });

  const data = await res.json();

  return NextResponse.json(data, { status: res.status });
}
