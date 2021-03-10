import styles from "./NavigationItem.module.css";
import { NavLink } from "react-router-dom";

export const NavigationItem = (props) => (
  <li className={styles.NavigationItem}>
    <NavLink
      to={props.link}
      activeClassName={styles.active}
      exact={props.exact}
    >
      {props.children}
    </NavLink>
  </li>
);
