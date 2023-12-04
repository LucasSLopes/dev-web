import Link from "next/link";
import styles from "@/app/ui/dashboard/ativos/ativos.module.css";
import nextAuth, { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/route";
import { getUserPermission, getAll, fecharEmprestimo } from "@/app/lib/actions";

const EmprestimoPage = async () => {
  await getUserPermission();
  const emprestimos = await getAll("/emprestimos/ativos");
  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>ID</td>
            <td>Matrícula</td>
            <td>Usuário</td>
            <td>CGR</td>
            <td>Ativo</td>
          </tr>
        </thead>
        <tbody>
          {emprestimos.map((emprestimo) => (
            <tr key={emprestimo.id}>
              <td>{emprestimo.id}</td>
              <td>{emprestimo.usuario.matricula}</td>
              <td>{emprestimo.usuario.nome}</td>
              <td>{emprestimo.ativo.CGR}</td>
              <td>{emprestimo.ativo.equipamento +' '+ emprestimo.ativo.descricao}</td>
              <td>
                <div className={styles.buttons}>
                  <form action={fecharEmprestimo}>
                    <input type="hidden" name="id" value={emprestimo.id} />
                    <button className={`${styles.button} ${styles.delete}`}>
                      Fechar
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

export default EmprestimoPage;
