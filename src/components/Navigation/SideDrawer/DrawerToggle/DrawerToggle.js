import styles from "./DrawerToggle.module.css";

export const DrawerToggle = (props) => (
  <div className={styles.DrawerToggle} onClick={props.clicked}>
    <div></div>
    <div></div>
    <div></div>
  </div>
);
