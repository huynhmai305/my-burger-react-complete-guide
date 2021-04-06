import { useState } from "react";
import { Aux } from "../Aux/Aux";
import { SideDrawer } from "../../components/Navigation/SideDrawer/SideDrawer";
import { Toolbar } from "../../components/Navigation/Toolbar/Toolbar";
import styles from "./Layout.module.css";
import { connect } from "react-redux";

const Layout = (props) => {
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
        isAuth={props.isAuthenticated}
        drawerToggleClicked={sideDrawerToggleHandle}
      />
      <SideDrawer
        isAuth={props.isAuthenticated}
        open={showSideDrawer}
        closed={sideDrawerClosedHandle}
      />
      <main className={styles.content}>{props.children}</main>
    </Aux>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

export default connect(mapStateToProps)(Layout);
