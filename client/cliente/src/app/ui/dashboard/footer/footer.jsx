import styles from "./footer.module.css";

const Footer = () => {
  return (
    <div className={styles.container}>
      <span className={styles.logo}>Lucas Lopes</span>
      <span className={styles.text}>© Todos os direitos reservados.</span>
    </div>
  );
};

export default Footer;
