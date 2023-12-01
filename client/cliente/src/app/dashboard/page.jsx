
import React from "react";
import styles from "../ui/dashboard/dashboard.module.css";
import Card from "../ui/dashboard/cards/cards";
import nextAuth, { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/route";


const fetchWithToken = async (url, token) => {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Erro ao fazer a requisição ${url}`);
  }

  return response.json();
};

const getCount = async () => {
  try {
    const token = await getServerSession(nextAuthOptions);

    const [ativos, usuarios, solicitacoes] = await Promise.all([
      fetchWithToken("http://localhost:3000/ativos/count", token.token),
      fetchWithToken("http://localhost:3000/users/count", token.token),
      fetchWithToken("http://localhost:3000/solicitacoes/count", token.token),
    ]);

    const contadores = [
      { desc: "Total de Usuários", count: usuarios },
      { desc: "Total de Ativos", count: ativos },
      { desc: "Total de Solicitações", count: solicitacoes },
    ]

    return contadores;
  } catch (error) {
    console.error("Erro ao buscar contagens:", error);
    throw error;
  }
};


const Dashboard = async () => {

  const contador = await getCount();
  // console.log(contador[0])
  const user = contador[0];

  return (
    <div className={styles.wrapper} id="dash">
      <div className={styles.main}>
        <div className={styles.cards}>
          <Card count={contador[0].count} desc={contador[0].desc} />
          <Card count={contador[1].count} desc={contador[1].desc} />
          <Card count={contador[2].count} desc={contador[2].desc} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
