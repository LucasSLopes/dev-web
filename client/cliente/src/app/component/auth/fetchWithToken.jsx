import nextAuth, { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/route";
import { get } from "http";



const getToken = async () => {
  const ServerSession = await getServerSession(nextAuthOptions);
  const token = ServerSession.token;
  return token;
};


export const getWithToken = async (url) => {
  const token = await getToken();
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Erro ao fazer a requisição ${url}`);
  }

  return response.json();
};

export const postWithToken = async (url, body) => {
  const token = await getToken();
  console.log(body);
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`Erro ao fazer a requisição ${url}`);
  }

  return response.json();
}

export const deleteWithToken = async (id) => {
  const url = `http://localhost:3000/users/${id}`;
  const token = await getToken();
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Erro ao fazer a requisição ${url}`);
  }

  return response.json();
}

