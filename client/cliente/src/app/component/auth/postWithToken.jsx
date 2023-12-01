import nextAuth, { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/route";

export const PostWithToken = async (url, data) => {
  const ServerSession = await getServerSession(nextAuthOptions);
  const token = ServerSession.token;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: data,
  });

  if (!response.ok) {
    throw new Error(`Erro ao fazer a requisição ${url}`);
  }

  return response.json();
};
