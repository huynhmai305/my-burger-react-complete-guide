import { useState } from "react";
import { Aux } from "../Aux/Aux";
import { useSelector } from "react-redux";
import { SideDrawer } from "../../components/Navigation/SideDrawer/SideDrawer";
import { Toolbar } from "../../components/Navigation/Toolbar/Toolbar";
import styles from "./Layout.module.css";

const Layout = (props) => {
  const isAuthenticated = useSelector((state) => state.auth.token !== null);

  const [showSideDrawer, setShowSideDrawer] = useState(false);

  const sideDrawerClosedHandle = () => {
    setShowSideDrawer(false);
  };

  const sideDrawerToggleHandle = () => {
    setShowSideDrawer(!showSideDrawer);
  };

  return (
    <Aux>
      <Toolbar
        isAuth={isAuthenticated}
        drawerToggleClicked={sideDrawerToggleHandle}
      />
      <SideDrawer
        isAuth={isAuthenticated}
        open={showSideDrawer}
        closed={sideDrawerClosedHandle}
      />
      <main className={styles.content}>{props.children}</main>
    </Aux>
  );
};

export default Layout;
