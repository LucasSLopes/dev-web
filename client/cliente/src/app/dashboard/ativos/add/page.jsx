'use client'
import React, { useState } from "react";
import styles from "@/app/ui/dashboard/users/addUser/addUser.module.css";
import nextAuth, { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/route";





const AddAtivosPage = async () => {
  return (
    <div className={styles.container}>
      <form className={styles.form} >
        <input type="text" placeholder="CGR" name="cgr" required />
        <input
          type="text"
          placeholder="Equipamento"
          name="equipamento"
          required
        />
        <input type="text" placeholder="Descrição" name="descricao" />
        <input type="text" placeholder="Marca" name="marca" />

        <select name="Status" id="status">
          <option value={"DISPONÍVEL"}>DISPONÍVEL</option>
          <option value={"ALOCADO"}>ALOCADO</option>
          <option value={"DEFEITO"}>DEFEITO</option>
        </select>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddAtivosPage;
