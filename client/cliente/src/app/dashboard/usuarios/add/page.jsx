"use client";
import { useRouter } from "next/navigation";
import { create } from "../../../lib/actions";
import styles from "@/app/ui/dashboard/users/addUser/addUser.module.css";

const AddUserPage = () => {
  const router = useRouter();

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
    const senha = event.target.senha.value;
    const permissao = event.target.permissao.value;

    const regexNome = /^[a-zA-Z\s]*$/;
    const regexMatricula = /^\d{6}$/;
    const regexTelefone = /^\d{11}$/;
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const regexCpf = /^\d{11}$/;
    const regexSenha = /^(.){8,}$/;

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

    if (!regexEmail.test(email)) {
      document.getElementById("email-error").innerText =
        "Insira um email válido.";
      return;
    }

    if (!regexTelefone.test(telefone)) {
      document.getElementById("telefone-error").innerText =
        "Insira um telefone válido.";
      return;
    }
    if (!regexCpf.test(cpf)) {
      document.getElementById("cpf-error").innerText = "Insira um CPF válido.";
      return;
    }

    if (!regexSenha.test(senha)) {
      document.getElementById("senha-error").innerText =
        "Insira uma senha com mais de 8 dígitos.";
      return;
    }

    const user = {
      matricula,
      nome,
      email,
      telefone,
      cpf,
      senha,
      permissao,
    };

    const response = await create(user, "/users");
    if (response) {
      alert("Usuário criado com sucesso!");
      router.push("/dashboard/usuarios");
      router.refresh();
    } else {
      alert("Erro ao  usuário!");
    }
  };

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
            type="text"
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
