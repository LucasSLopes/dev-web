import { ReactNode } from 'react';
import Image from "next/image";
import MenuLink from './menuLink/menuLink';
import {
  MdDashboard,
  MdSupervisedUserCircle,
  MdHeadsetMic,
  MdLogout,
} from "react-icons/md";
import { IoDesktop } from "react-icons/io5";
import { FaUserCircle, FaHandsHelping } from "react-icons/fa";
import { title } from 'process';
import styles from './sidebar.module.css';

import jwt from "jsonwebtoken";
import nextAuth, { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/route";
import dynamic from "next/dynamic";

const menuItems = [
  {
    title: "",
    list: [
      {
        title: "Dashboard",
        path: "/dashboard",
        icon: <MdDashboard />,
      },
      {
        title: "Usuarios",
        path: "/dashboard/usuarios",
        icon: <MdSupervisedUserCircle />,
      },
      {
        title: "Ativos",
        path: "/dashboard/ativos",
        icon: <IoDesktop />,
      },
      {
        title: "Solicitacoes",
        path: "/dashboard/solicitacoes",
        icon: <MdHeadsetMic />,
      },
      {
        title: "Emprestimos",
        path: "/dashboard/emprestimos",
        icon: <FaHandsHelping />,
      },
    ],
  },
];


const Sidebar = async () => {

const session = await getServerSession(nextAuthOptions);
const decoded = jwt.decode(session.token);
const LogoutButton = dynamic(() => import("./LogoutButton"), { ssr: false });
  return (
     

    <div className={styles.container}>
      <div className={styles.user}>
        <Image
          className={styles.userImage}
          src={"/noavatar.png"}
          alt="user image"
          width="80"
          height="80"
        />
        <div className={styles.userDetail}>
          <span className={styles.username}>{decoded.name}</span>
          <span className={styles.userTitle}>{decoded.permissao}</span>
        </div>
      </div>
      <ul className={styles.list}>
        {menuItems.map((cat) => (
          <li key={cat.title}>
            <span className={styles.cat}>{cat.title}</span>
            {cat.list.map((item) => (
              <MenuLink item={item} key={item.title} />
            ))}
          </li>
        ))}
      </ul>
      <LogoutButton />
    </div>
  ); 
};

export default Sidebar;
