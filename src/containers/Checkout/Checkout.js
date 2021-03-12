import React from "react";
import CheckoutSumary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { Route } from "react-router-dom";
import ContactData from "./ContactData/ContactData";
import { connect } from "react-redux";

class Checkout extends React.Component {
  checkoutCanceledHandle = () => {
    this.props.history.goBack();
  };

  checkoutContinuedHandle = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
    return (
      <div>
        <CheckoutSumary
          ingredients={this.props.ings}
          checkoutCanceled={this.checkoutCanceledHandle}
          checkoutContinued={this.checkoutContinuedHandle}
        />
        <Route
          path={this.props.match.path + "/contact-data"}
          component={ContactData}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.ingredients,
  };
};

export default connect(mapStateToProps)(Checkout);
