import { NavigationItem } from "./NavigationItem/NavigationItem";
import styles from "./NavigationItems.module.css";

export const NavigationItems = (props) => (
  <ul className={styles.NavigationItems}>
    <NavigationItem link="/" exact>
      Builder burger
    </NavigationItem>
    <NavigationItem link="/orders">Orders</NavigationItem>
  </ul>
);
