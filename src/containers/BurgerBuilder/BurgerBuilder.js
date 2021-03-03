import { Component } from "react";
import { BuildControls } from "../../components/Burger/BuildControls/BuildControls";
import { Burger } from "../../components/Burger/Burger";
import OrderSumary from "../../components/Burger/OrderSumary/OrderSumary";
import Modal from "../../components/UI/Modal/Modal";
import { Aux } from "../../hoc/Aux";

const INGREDIENT_PRICE = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

export class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    totalPrice: 0,
    purchaseable: false,
    purchasing: false,
  };

  updatePurchaseable(ingredients) {
    const sum = Object.keys(ingredients)
      .map((item) => ingredients[item])
      .reduce((total, item) => total + item, 0);
    this.setState({ purchaseable: sum > 0 });
  }

  purchaseHandle = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandle = () => {
    this.setState({ purchasing: false });
  };

  addIngredient = (type) => {
    const updateArr = { ...this.state.ingredients };
    updateArr[type] = updateArr[type] + 1;
    const updatePrice = this.state.totalPrice + INGREDIENT_PRICE[type];
    this.setState({ ingredients: updateArr, totalPrice: updatePrice });
    this.updatePurchaseable(updateArr);
  };

  removeIngredient = (type) => {
    const updateArr = { ...this.state.ingredients };
    if (updateArr[type] <= 0) return;
    updateArr[type] = updateArr[type] - 1;
    const updatePrice = this.state.totalPrice - INGREDIENT_PRICE[type];
    this.setState({ ingredients: updateArr, totalPrice: updatePrice });
    this.updatePurchaseable(updateArr);
  };

  render() {
    const disableIngredient = { ...this.state.ingredients };
    for (let i in disableIngredient) {
      disableIngredient[i] = disableIngredient[i] <= 0;
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClose={this.purchaseCancelHandle}
        >
          <OrderSumary ingredients={this.state.ingredients} />
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          added={this.addIngredient}
          removed={this.removeIngredient}
          disabled={disableIngredient}
          price={this.state.totalPrice}
          purchaseable={!this.state.purchaseable}
          ordered={this.purchaseHandle}
        />
      </Aux>
    );
  }
}
