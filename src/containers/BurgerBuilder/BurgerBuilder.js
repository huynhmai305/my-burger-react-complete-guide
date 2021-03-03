import { Component } from "react";
import { BuildControls } from "../../components/Burger/BuildControls/BuildControls";
import { Burger } from "../../components/Burger/Burger";
import OrderSumary from "../../components/Burger/OrderSumary/OrderSumary";
import Modal from "../../components/UI/Modal/Modal";
import { Aux } from "../../hoc/Aux/Aux";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandle from "../../hoc/withErrorHandle/withErrorHandle";

const INGREDIENT_PRICE = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 0,
    purchaseable: false,
    purchasing: false,
    loading: false,
    error: false,
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

  purchaseContinueHandle = () => {
    this.setState({ loading: true });
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: "Mai Mai",
        address: {
          street: "18",
          zipcode: "12345",
          country: "Binh Dinh",
        },
        email: "huynhmai305+customer1@gmail.com",
      },
      deliveryMethod: "fastest",
    };
    axios
      .post("/orders.json", order)
      .then((res) => this.setState({ loading: false, purchasing: false }))
      .catch((err) => this.setState({ loading: false, purchasing: false }));
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

  componentDidMount() {
    axios
      .get("/ingredients.json")
      .then((rs) => this.setState({ ingredients: rs.data }))
      .catch((err) => this.setState({ error: true }));
  }

  render() {
    const disableIngredient = { ...this.state.ingredients };
    for (let i in disableIngredient) {
      disableIngredient[i] = disableIngredient[i] <= 0;
    }

    let renderOrderSumary = null,
      burger = this.state.error ? (
        <p>Ingredient can't be loaded!</p>
      ) : (
        <Spinner />
      );

    if (this.state.ingredients) {
      renderOrderSumary = (
        <OrderSumary
          ingredients={this.state.ingredients}
          purchaseCanceled={this.purchaseCancelHandle}
          purchaseContinued={this.purchaseContinueHandle}
          price={this.state.totalPrice}
        />
      );
      burger = (
        <Aux>
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

    if (this.state.loading) renderOrderSumary = <Spinner />;

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClose={this.purchaseCancelHandle}
        >
          {renderOrderSumary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

export default withErrorHandle(BurgerBuilder, axios);
