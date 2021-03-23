import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Layout from "./hoc/Layout/Layout";
import { Switch, Route, Redirect } from "react-router-dom";
import Logout from "./containers/Logout/Logout";
import { connect } from "react-redux";
import { Component } from "react";
import * as actions from "./store/actions/index";
import { withRouter } from "react-router-dom";
import asyncComponent from "./hoc/asyncComponent/asyncComponent";

const asyncAuth = asyncComponent(() => import("./containers/Auth/Auth"));
const asyncCheckout = asyncComponent(() =>
  import("./containers/Checkout/Checkout")
);
const asyncOrders = asyncComponent(() => import("./containers/Orders/Orders"));

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }
  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={asyncAuth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/checkout" component={asyncCheckout} />
          <Route path="/orders" component={asyncOrders} />
          <Route path="/logout" component={Logout} />
          <Route path="/auth" component={asyncAuth} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      );
    }

    return (
      <div>
        <Layout>{routes}</Layout>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
