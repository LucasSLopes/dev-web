import { ReactNode } from 'react';
import { LayoutProps } from '../../../.next/types/app/layout';
import Sidebar from "../ui/dashboard/sidebar/sidebar.";
import Navbar from "../ui/dashboard/navbar/navbar";

import styles from '@/app/ui/dashboard/dashboard.module.css';






const Layout = ({ children }: LayoutProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <Sidebar />
      </div>
      <div className={styles.content}>
        <Navbar />
        {children}
      </div>
    </div>
  );
};

export default Layout;
