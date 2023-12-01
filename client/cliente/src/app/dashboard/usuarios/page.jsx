import Link from "next/link";
import styles from "@/app/ui/dashboard/users/users.module.css";
import nextAuth, { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/route";

import { deleteUser, listarUsers } from "@/app/lib/actions";

const getUsers = async () => {
  const users = await getWithToken("http://localhost:3000/users");
  return users;
}


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
}



const UsersPage = async () => {
  const user = await listarUsers();

  
  
  
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Link href="/dashboard/usuarios/add">
          <button className={styles.addButton}>Adicionar Usuário</button>
        </Link>
      </div>
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
                  <form action={deleteUser}>
                    <input type="hidden" name="id" value={user.id} />

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
    </div>
  );
};

export default UsersPage;
