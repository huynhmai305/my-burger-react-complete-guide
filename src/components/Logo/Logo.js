import burgerLogo from "../../assets/images/burger-logo.png";
import styles from "./Logo.module.css";

export const Logo = (props) => (
  <div className={styles.Logo} style={{ height: props.height }}>
    <img src={burgerLogo} alt="logo" />
  </div>
);
