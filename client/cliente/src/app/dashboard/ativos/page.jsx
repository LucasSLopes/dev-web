import Link from "next/link";
import Image from "next/image";
import styles from "../../ui/dashboard/ativos/ativos.module.css";
import { deleteAtivo, getAll } from "@/app/lib/actions";


const AtivosPage = async () => {
    const ativos = await getAll("/ativos");

    return (
      <div className={styles.container}>
        <div className={styles.top}>
          <Link href="/dashboard/ativos/adicionar">
            <button className={styles.addButton}>Adicionar Ativo+</button>
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
                    <form action={deleteAtivo}>  
                      <input type="hidden" name="id" value={ativo.id} />
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
}


export default AtivosPage;
