
import Link from "next/link";
import Image from "next/image";
import styles from "../../ui/dashboard/ativos/ativos.module.css";
import { fetchWithToken } from "@/app/component/auth/fetchWithToken";


const getAtivos = async () => {
  const ativos = await fetchWithToken("http://localhost:3000/ativos");
  return ativos;
}

export const AtivosComponent = async () => {
  const ativos = await getAtivos();
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Link href="/dashboard/ativos/add">
          <button className={styles.addButton}>Adicionar +</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>CGR</td>
            <td>Equipamento</td>
            <td>Desrição</td>
            <td>Marca</td>
            <td>Status</td>
          </tr>
        </thead>
        <tbody>

          {ativos.map((ativo) => (
            <tr key={ativo.id}>
              <td>
                <span>{ativo.CGR}</span>
              </td>
              <td>{ativo.equipamento}</td>
              <td>{ativo.descricao}</td>
              <td>{ativo.marca}</td>
              <td>{ativo.status}</td>
              <td>
                <div className={styles.buttons}>
                  <Link href={`/dashboard/ativos/${ativo.id}`}>
                    <button className={`${styles.button} ${styles.view}`}>
                      Detalhes
                    </button>
                  </Link>
                  <form>
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
    </div>
  );
};
