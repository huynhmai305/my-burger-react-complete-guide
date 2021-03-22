import { NavigationItem } from "./NavigationItem/NavigationItem";
import styles from "./NavigationItems.module.css";

export const NavigationItems = (props) => (
  <ul className={styles.NavigationItems}>
    <NavigationItem link="/" exact>
      Builder burger
    </NavigationItem>
    {props.isAuthenticated ? (
      <NavigationItem link="/orders">Orders</NavigationItem>
    ) : null}
    {!props.isAuthenticated ? (
      <NavigationItem link="/auth">Authenticate</NavigationItem>
    ) : (
      <NavigationItem link="/logout">Logout</NavigationItem>
    )}
  </ul>
);
