import Link from "next/link";
import Image from "next/image";
import styles from "../../../ui/dashboard/ativos/ativos.module.css";
import { deleteAtivo, getAll, solicitarAtivo, getToke } from "@/app/lib/actions";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/route";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";

const AtivosPage = async () => {
  const session = await getServerSession(nextAuthOptions);
  const decoded = jwt.decode(session.token);
  if (decoded.permissao != "ADMINISTRADOR") {
    redirect("/dashboard");s
  }
  const ativos = await getAll("/ativos");
  
  
  const user = decoded.id
  

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
            <td>ID</td>
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
              <td>{ativo.id}</td>
              <td>{ativo.CGR}</td>

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
                  <form action={solicitarAtivo}>
                    <input
                      type="hidden"
                      name="ativo"
                      value={ativo.id}
                    />
                    <input type="hidden" name="usuario" value={user} />

                    <input type="hidden" name="descricao" value={"requisao de ativo"} />

                    <button className={`${styles.button} ${styles.view}`}>
                      Solicitar
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

export default AtivosPage;
