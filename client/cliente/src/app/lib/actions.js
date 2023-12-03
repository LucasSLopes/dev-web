'use server'
import { revalidatePath } from "next/cache";
import nextAuth, { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/dist/server/api-utils";

const getToken = async () => {
  const ServerSession = await getServerSession(nextAuthOptions);
  const token = ServerSession.token;
  return token;
};

const baseUrl = "http://localhost:3000";


export const create = async (data, url) => {
    const token = await getToken();
    try {
      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        return false;
      }

    } catch (error) {}
    return true;
}


export const getAll = async (path) => {
  const url = baseUrl + path;
  const token = await getToken();
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Erro ao listar usuários`);
  }

  return response.json();
};

export const deleteUser = async (data) => {
  const id = Object.fromEntries(data).id;

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

  revalidatePath("/dashboard/users/add");
};



