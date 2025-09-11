import { getTokenFromCookie } from "../utils/authHelper";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const getTours = async () => {
  const response = await fetch(`${BASE_URL}/tours`);
  if (!response.ok) return;
  return response.json();
};

export const getTour = async (slug: string) => {
  const token = await getTokenFromCookie();
  const response = await fetch(`${BASE_URL}/tours/${slug}`, {
    headers: {
      // Authorization: token ? `Bearer ${token}` : "",
      Cookie: `jwt=${token}`, // Manually set the cookie header
    },
  });

  if (!response.ok) return;

  const data = await response.json();
  return data?.data?.tour;
};
