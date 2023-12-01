import { MdSupervisedUserCircle } from "react-icons/md";
import styles from "./card.module.css";

const Card = ({ count, desc }) => {
  
  return (
    <div className={styles.container}>
      <MdSupervisedUserCircle size={24} />
      <div className={styles.texts}>
        <span className={styles.title}>{desc}</span>
        <span className={styles.number}>{count}</span>
      </div>
    </div>
  );
};

export default Card;
