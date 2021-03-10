import React from "react";
import CheckoutSumary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { Route } from "react-router-dom";
import ContactData from "./ContactData/ContactData";

class Checkout extends React.Component {
  state = {
    ingredients: null,
    totalPrice: 0,
  };

  componentWillMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let price = 0;
    for (let param of query.entries()) {
      // param exp: ["bacon", "1"]
      if (param[0] === "price") {
        price = param[1];
      } else {
        ingredients[param[0]] = +param[1]; // +'1' => 1: convert string to number
      }
    }
    this.setState({ ingredients: ingredients, totalPrice: price });
  }

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
          ingredients={this.state.ingredients}
          checkoutCanceled={this.checkoutCanceledHandle}
          checkoutContinued={this.checkoutContinuedHandle}
        />
        <Route
          path={this.props.match.path + "/contact-data"}
          render={(props) => (
            <ContactData
              ingredients={this.state.ingredients}
              price={this.state.totalPrice}
              {...props}
            />
          )}
        />
      </div>
    );
  }
}

export default Checkout;
