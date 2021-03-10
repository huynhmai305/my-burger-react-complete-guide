import { Component } from "react";
import { Aux } from "../../../hoc/Aux/Aux";
import { Button } from "../../UI/Button/Button";

class OrderSumary extends Component {
  render() {
    const ingredientSumary = Object.keys(this.props.ingredients).map((key) => {
      return (
        <li key={key}>
          <span style={{ textTransform: "capitalize" }}>{key}:</span>&nbsp;
          {this.props.ingredients[key]}
        </li>
      );
    });

    return (
      <Aux>
        <h3>Your Order</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>{ingredientSumary}</ul>
        <p>
          <strong>Total price: {this.props.price.toFixed(2)}$</strong>
        </p>
        <p>Continue to Checkout?</p>
        <Button btnType="Danger" clicked={this.props.purchaseCanceled}>
          CANCEL
        </Button>
        <Button btnType="Success" clicked={this.props.purchaseContinued}>
          CONTINUE
        </Button>
      </Aux>
    );
  }
}

export default OrderSumary;
