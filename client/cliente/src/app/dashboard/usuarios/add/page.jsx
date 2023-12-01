"use client";
import { createUser } from "@/app/lib/actions";
import styles from "@/app/ui/dashboard/users/addUser/addUser.module.css";

const clearError = (fieldName) => {
  document.getElementById(`${fieldName}-error`).innerText = ""; // Limpa o texto de erro do campo especificado
};

const handleFieldClick = (fieldName) => {
  clearError(fieldName); // Chama a função para limpar o texto de erro do campo
};

const handleSubmit = async (event) => {
  event.preventDefault();

  const matricula = event.target.matricula.value;
  const nome = event.target.nome.value;
  const email = event.target.email.value;
  const telefone = event.target.telefone.value;
  const cpf = event.target.cpf.value;
  const rg = event.target.rg.value;
  const senha = event.target.senha.value;
  const permissao = event.target.permissao.value;

  const regexNome = /^[a-zA-Z\s]*$/;
  const regexMatricula = /^\d{6}$/;
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (nome.length < 6 || !regexNome.test(nome)) {
    let errorMessage = "";

    if (nome.length < 6) {
      errorMessage = "Nome deve ter no mínimo 6 caracteres.";
    } else {
      errorMessage = "Nome inválido! Use apenas letras e espaços.";
    }

    // Exibindo mensagem de erro
    document.getElementById("nome-error").innerText = errorMessage;
    return; // Impede o envio do formulário se o nome for inválido
  }
  if (!regexMatricula.test(matricula)) {
    document.getElementById("matricula-error").innerText =
      "A matrícula deve ter exatamente 6 números.";
    return;
  }

  console.log("Criando usuário...");

  // cpf: event.target.cpf.value,
  // telefone: event.target.telefone.value,
  // email: event.target.email.value,
  // permissao: event.target.permissao.value,
  // senha: event.target.senha.value,
};

const handleFormSubmit = (e) => {
  e.preventDefault();
  // Lógica de validação e exibição da mensagem de erro, se necessário
  setError("Preencha este campo corretamente.");
};

const AddUserPage = () => {
  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Nome"
            name="nome"
            onClick={() => handleFieldClick("nome")}
          />

          <span id="nome-error" className={styles.error}></span>
        </div>
        <div>
          <input
            type="text"
            placeholder="Matrícula"
            name="matricula"
            onClick={() => handleFieldClick("matricula")}
          />
          <span id="matricula-error" className={styles.error}></span>
        </div>

        <div>
          <input
            type="email"
            placeholder="email"
            name="email"
            onClick={() => handleFieldClick("email")}
          />
          <span id="email-error" className={styles.error}></span>
        </div>

        <div>
          <input
            type="phone"
            placeholder="Telefone"
            name="telefone"
            onClick={() => handleFieldClick("telefone")}
          />
          <span id="telefone-error" className={styles.error}></span>
        </div>

        <div>
          <input
            type="text"
            placeholder="CPF"
            name="cpf"
            onClick={() => handleFieldClick("cpf")}
          />
          <span id="cpf-error" className={styles.error}></span>
        </div>

        <div>
          <input
            type="text"
            placeholder="RG"
            name="rg"
            onClick={() => handleFieldClick("rg")}
          />
          <span id="rg-error" className={styles.error}></span>
        </div>

        <div>
          <input
            type="password"
            placeholder="Senha"
            name="senha"
            onClick={() => handleFieldClick("senha")}
          />
          <span id="senha-error" className={styles.error}></span>
        </div>

        <div>
          <select name="permissao" id="permissao">
            <option value={"USUARIO"}>USUÁRIO</option>
            <option value={"ADMINISTRADOR"}>ADMINISTRADOR</option>
          </select>
        </div>

        <button type="submit">Criar Usuário</button>
      </form>
    </div>
  );
};

export default AddUserPage;
