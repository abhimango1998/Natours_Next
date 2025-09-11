import { getTokenFromCookie } from "../utils/authHelper";

// /lib/auth.ts
export async function getUser() {
  const token = await getTokenFromCookie();
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
    headers: {
      Cookie: `jwt=${token}`,
    },
  });
  if (!res.ok) return null;
  const data = await res.json();
  return data.data.data;
}
