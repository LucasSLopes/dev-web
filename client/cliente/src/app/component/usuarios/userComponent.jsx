'use client'
import Link from "next/link";
import styles from "@/app/ui/dashboard/users/users.module.css";
import nextAuth, { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/route";
import {
  getWithToken,
  postWithToken,
  deleteWithToken,
} from "@/app/component/auth/fetchWithToken";
import { deleteButton } from "@/app/component/usuarios/deleteButton";

const getUsers = async () => {
  const users = await getWithToken("http://localhost:3000/users");
  return users;
};

const createUser = async () => {
  const user = await postWithToken("http://localhost:3000/users", {
    matricula: "875432",
    nome: "Victoria Castro",
    cpf: "87877873",
    telefone: "85998249533",
    email: "vicCastro@gmail.com",
    permissao: "USUARIO",
    senha: "teste1234",
  });
  return user;
};

export const UsersTable = async () => {
  const user = await getUsers();

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <td>Nome</td>
          <td>Email</td>
          <td>Telefone</td>
          <td>Permissão</td>
        </tr>
      </thead>
      <tbody>
        {user.map((user) => (
          <tr key={user.id}>
            <td>
              <span>{user.nome}</span>
            </td>
            <td>{user.email}</td>
            <td>{user.telefone}</td>
            <td>{user.permissao}</td>
            <td>
              <div className={styles.buttons}>
                <Link href={`/dashboard/users/${user.id}`}>
                  <button className={`${styles.button} ${styles.view}`}>
                    Detalhes
                  </button>
                </Link>
                <form act>
                  <input type="hidden" name="id" />

                  <button className={`${styles.button} ${styles.delete}`}>
                    Deletar
                  </button>
                </form>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
