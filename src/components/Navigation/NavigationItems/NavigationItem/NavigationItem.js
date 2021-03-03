import styles from "./NavigationItem.module.css";

export const NavigationItem = (props) => (
  <li className={styles.NavigationItem}>
    <a href={props.link} className={props.active && styles.active}>
      {props.children}
    </a>
  </li>
);
