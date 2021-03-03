import { Component } from "react";
import { Aux } from "../Aux/Aux";
import { SideDrawer } from "../../components/Navigation/SideDrawer/SideDrawer";
import { Toolbar } from "../../components/Navigation/Toolbar/Toolbar";
import styles from "./Layout.module.css";

class Layout extends Component {
  state = {
    showSideDrawer: false,
  };

  sideDrawerClosedHandle = () => {
    this.setState({ showSideDrawer: false });
  };

  sideDrawerToggleHandle = () => {
    this.setState((prevState) => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  };

  render() {
    return (
      <Aux>
        <Toolbar DrawerToggleClicked={this.sideDrawerToggleHandle} />
        <SideDrawer
          open={this.state.showSideDrawer}
          closed={this.sideDrawerClosedHandle}
        />
        <main className={styles.content}>{this.props.children}</main>
      </Aux>
    );
  }
}

export default Layout;
