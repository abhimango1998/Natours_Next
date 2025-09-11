import { cookies } from "next/headers";

export const getTokenFromCookie = async () => {
  const cookieStore = await cookies();
  const jwtCookie = cookieStore.get("jwt");
  return jwtCookie ? jwtCookie.value : null;
};
