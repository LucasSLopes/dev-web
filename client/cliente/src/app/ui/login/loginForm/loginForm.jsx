
"use client";
import styles from "./loginForm.module.css";
import { useFormState } from "react-dom";
const LoginForm = () => {
  return (
    <form action='' className={styles.form}>
      <h1>Login</h1>
      <input type="text" placeholder="username" name="username" />
      <input type="password" placeholder="senha" name="senha" />
      <button>Login</button>
    </form>
  );
};

export default LoginForm;