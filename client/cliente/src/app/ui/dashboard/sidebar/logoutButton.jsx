"use client";
import { signOut } from "next-auth/react";
import styles from "./sidebar.module.css";
import { MdLogout } from "react-icons/md";

const LogoutButton = () => {
  const handleLogout = async (event) => {
    event.preventDefault();
    console.log("logout");
    await signOut({ redirect: false})

  };

  return (
    <>
      <button className={styles.logout} onClick={handleLogout}>
        <MdLogout />
        Logout
      </button>
    </>
  );
};

export default LogoutButton;
