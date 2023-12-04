import Link from "next/link";
import Image from "next/image";
import styles from "@/app/ui/dashboard/ativos/ativos.module.css";
import {
  getAll,
  aprovarSolicitacao,
  negarSolicitacao,
  getUserPermission,
} from "@/app/lib/actions";

const SolicitacaoPage = async () => {
  await getUserPermission();
  const solicitacoes = await getAll("/solicitacoes/pendentes");
  for (const solicitacao of solicitacoes) {
    console.log(solicitacao.id, solicitacao.mensagem, solicitacao.usuario.nome);
  }

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>ID</td>
            <td>Solicitante</td>
            <td>CGR</td>
            <td>Ativo</td>
            <td>Desrição</td>
            <td>Status</td>
          </tr>
        </thead>
        <tbody>
          {solicitacoes.map((solicitacao: any) => (
            <tr key={solicitacao.id}>
              <td>{solicitacao.id}</td>
              <td>{solicitacao.usuario.nome}</td>
              <td>{solicitacao.ativo.CGR}</td>
              <td>{solicitacao.ativo.equipamento}</td>
              <td>{solicitacao.mensagem}</td>
              <td>{solicitacao.status}</td>
              <td>
                <div className={styles.buttons}>
                  <form action={aprovarSolicitacao}>
                    <input type="hidden" name="id" value={solicitacao.id} />
                    <button className={`${styles.button} ${styles.view}`}>
                      Aprovar
                    </button>
                  </form>
                  <form action={negarSolicitacao}>
                    <input type="hidden" name="id" value={solicitacao.id} />
                    <button className={`${styles.button} ${styles.delete}`}>
                      Recusar
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

export default SolicitacaoPage;
