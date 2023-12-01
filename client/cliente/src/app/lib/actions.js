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


export const createUser = async (data) => {
    const user = Object.fromEntries(data);
    console.log(user);
}


export const listarUsers = async () => {
  const url = `http://localhost:3000/users`;
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

  revalidatePath("/dashboard/users");
};



