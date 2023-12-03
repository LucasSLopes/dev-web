import Link from "next/link";
import styles from "@/app/ui/dashboard/users/users.module.css";
import nextAuth, { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/route";

import { deleteUser, getAll } from "@/app/lib/actions";




const UsersPage = async () => {
  const user = await getAll("/users");

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Link href="/dashboard/usuarios/add">
          <button className={styles.addButton}>Adicionar Usuário +</button>
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
