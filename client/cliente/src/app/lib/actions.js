'use server'
import { revalidatePath } from "next/cache";
import nextAuth, { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import cookie from "cookie";
import jwt from "jsonwebtoken";
import { get } from "http";


export const getToken = async () => {
  const ServerSession = await getServerSession(nextAuthOptions);
  const token = ServerSession.token;
  return token;
};

export const getUserPermission = async () => {
  const session = await getServerSession(nextAuthOptions);
  if (!session){
    redirect("/login");
  }
  const user = jwt.decode(session.token);
  if (user.permissao !== "ADMINISTRADOR"){
    console.log(user.permissao)
    redirect("/dashboard");
  }
}

const baseUrl = "http://localhost:3000";


export const create = async (data, path) => {
    const token = await getToken();
    console.log(data)
    try {
      const response = await fetch(baseUrl+path, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        return true;
      }
      console.log(response.status, response.body, response.ok);

    } catch (error) {}
   
    return false;
}


export const getAll = async (path) => {
  const url = baseUrl + path;
  console.log(url);
  const token = await getToken();
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Erro ao listar ${url}`);
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

  revalidatePath("/dashboard/users/");
};

export const deleteAtivo = async (data) => {
  const id = Object.fromEntries(data).id;
  console.log(id);
  const url = `http://localhost:3000/ativos/${id}`;
  const token = await getToken();
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  console.log(response.statusText,response.status)

  revalidatePath("/dashboard/ativos/");
};

export const aprovarSolicitacao = async (data) => {
  const id = Object.fromEntries(data).id;
  const url = `http://localhost:3000/solicitacoes/aprovar/${id}`;
  console.log(url);
  const token = await getToken();
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(response.statusText,response.status)

  revalidatePath("/dashboard/solicitacoes/");
}

export const negarSolicitacao = async (data) => {
  const id = Object.fromEntries(data).id;
  const url = `http://localhost:3000/solicitacoes/${id}`;
  console.log(url);
  const token = await getToken();
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(response.statusText,response.status)

  revalidatePath("/dashboard/solicitacoes/");
}


export const solicitarAtivo = async (data) => {
  const solicitacao = Object.fromEntries(data);
  const url = `http://localhost:3000/solicitacoes`;
  console.log(solicitacao)
  const token = await getToken();
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(solicitacao),
  });
  console.log(response.statusText,response.status, response.body)

  revalidatePath("/dashboard/solicitacoes/");
};

export const fecharEmprestimo = async (data) => {
  const emprestimo = Object.fromEntries(data);
  const url = baseUrl + "/emprestimos/" + emprestimo.id;
  const token = await getToken();
  const response = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(response.statusText, response.status, response.body);
  revalidatePath("/dashboard/emprestimos/");
}