import { Aux } from "../../../hoc/Aux/Aux";
import { Logo } from "../../Logo/Logo";
import Backdrop from "../../UI/BackDrop/BackDrop";
import { NavigationItems } from "../NavigationItems/NavigationItems";
import styles from "./SideDrawer.module.css";

export const SideDrawer = (props) => {
  let attachedStyles = [styles.SideDrawer, styles.Close];
  if (props.open) {
    attachedStyles = [styles.SideDrawer, styles.Open];
  }
  return (
    <Aux>
      <Backdrop show={props.open} clicked={props.closed} />
      <div className={attachedStyles.join(" ")}>
        <div className={styles.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems isAuthenticated={props.isAuth} />
        </nav>
      </div>
    </Aux>
  );
};
