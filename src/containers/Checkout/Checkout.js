import React from "react";
import { useSelector } from "react-redux";
import CheckoutSumary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { Redirect, Route } from "react-router-dom";
import ContactData from "./ContactData/ContactData";

const Checkout = (props) => {
  const ings = useSelector((state) => state.burgerBuilder.ingredients);
  const purchased = useSelector((state) => state.order.purchased);

  const checkoutCanceledHandle = () => {
    props.history.goBack();
  };

  const checkoutContinuedHandle = () => {
    props.history.replace("/checkout/contact-data");
  };

  let summary = <Redirect to="/" />;
  if (ings) {
    const purchasedRedirect = purchased ? <Redirect to="/" /> : null;
    summary = (
      <div>
        {purchasedRedirect}
        <CheckoutSumary
          ingredients={ings}
          checkoutCanceled={checkoutCanceledHandle}
          checkoutContinued={checkoutContinuedHandle}
        />
        <Route
          path={props.match.path + "/contact-data"}
          component={ContactData}
        />
      </div>
    );
  }
  return summary;
};

export default Checkout;
