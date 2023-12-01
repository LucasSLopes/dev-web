import Link from "next/link";
import Image from "next/image";
import styles from "../../ui/dashboard/ativos/ativos.module.css";
import { AtivosComponent } from "@/app/component/ativos/ativosComponent";
const AtivosPage = async () => {
  return (
    <>
      <AtivosComponent />
    </>
  );
};

export default AtivosPage;
