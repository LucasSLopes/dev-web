import Link from "next/link";
import styles from "@/app/ui/dashboard/users/users.module.css";

import { deleteUser, getAll, getUserPermission } from "@/app/lib/actions";

const UsersPage = async () => {
  await getUserPermission();
  const user = await getAll("/users");

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Link href="/dashboard/usuarios/adicionar">
          <button className={styles.addButton}>Adicionar Usuário +</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>ID</td>
            <td>Nome</td>
            <td>Email</td>
            <td>Telefone</td>
            <td>Permissão</td>
          </tr>
        </thead>
        <tbody>
          {user.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.nome}</td>
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
