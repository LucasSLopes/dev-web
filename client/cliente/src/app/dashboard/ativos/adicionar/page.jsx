"use client";
import { useRouter } from "next/navigation";
import { create } from "../../../lib/actions";
import styles from "@/app/ui/dashboard/users/addUser/addUser.module.css";

const AddAtivosPage = async () => {
  const router = useRouter();



  const clearError = (fieldName) => {
    document.getElementById(`${fieldName}-error`).innerText = ""; // Limpa o texto de erro do campo especificado
  };
  const handleFieldClick = (fieldName) => {
    clearError(fieldName); // Chama a função para limpar o texto de erro do campo
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const CGR = event.target.CGR.value;
    const equipamento = event.target.equipamento.value;
    const descricao = event.target.descricao.value;
    const marca = event.target.marca.value;
    const status = event.target.status.value;

    const regexCGR = /^\d{6}$/;

    if (!regexCGR.test(CGR)) {
      document.getElementById("cgr-error").innerText =
        "A CGR deve ter exatamente 6 números.";
      return;
    }

    if (equipamento.length < 2) {
      document.getElementById("equipamento-error").innerText =
        "Equipamento deve ter no mínimo 2 caracteres.";
      return;
    }
    if (descricao.length < 2) {
      document.getElementById("descricao-error").innerText =
        "Descricao deve ter no mínimo 2 caracteres.";
      return;
    }
    if (marca.length < 2) {
      document.getElementById("marca-error").innerText =
        "Marca deve ter no mínimo 2 caracteres.";
      return;
    }
    const ativo = {
      CGR: CGR,
      equipamento: equipamento,
      descricao: descricao,
      marca: marca,
      status: status,
    };
    const response = await create(ativo, "/ativos");
    if (response) {
      alert("Ativo adicionado com sucesso!");
      router.push("/dashboard/ativos");
      router.refresh();
    } else {
      alert("Erro ao adicionar ativo!");
    }

  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="CGR"
            name="CGR"
            onClick={() => handleFieldClick("cgr")}
          />

          <span id="cgr-error" className={styles.error}></span>
        </div>
        <div>
          <input
            type="text"
            placeholder="Equipamento"
            name="equipamento"
            onClick={() => handleFieldClick("equipamento")}
          />
          <span id="equipamento-error" className={styles.error}></span>
        </div>

        <div>
          <input
            type="text"
            placeholder="Descricao"
            name="descricao"
            onClick={() => handleFieldClick("descricao")}
          />
          <span id="descricao-error" className={styles.error}></span>
        </div>

        <div>
          <input
            type="text"
            placeholder="Marca"
            name="marca"
            onClick={() => handleFieldClick("marca")}
          />
          <span id="marca-error" className={styles.error}></span>
        </div>

        <div>
          <select name="status" id="status">
            <option value={"DISPONIVEL"}>DISPONIVEL</option>
            <option value={"ALOCADO"}>ALOCADO</option>
            <option value={"DEFEITO"}>DEFEITO</option>
          </select>
        </div>
        <button type="submit">Criar Ativo</button>
      </form>
    </div>
  );
};

export default AddAtivosPage;
