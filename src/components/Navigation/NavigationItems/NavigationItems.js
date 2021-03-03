import { NavigationItem } from "./NavigationItem/NavigationItem";
import styles from "./NavigationItems.module.css";

export const NavigationItems = (props) => (
  <ul className={styles.NavigationItems}>
    <NavigationItem link="/" active>
      Builder burger
    </NavigationItem>
    <NavigationItem link="/">Checkout</NavigationItem>
  </ul>
);
