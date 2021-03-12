import { Component } from "react";
import { BuildControls } from "../../components/Burger/BuildControls/BuildControls";
import Burger from "../../components/Burger/Burger";
import OrderSumary from "../../components/Burger/OrderSummary/OrderSummary";
import Modal from "../../components/UI/Modal/Modal";
import { Aux } from "../../hoc/Aux/Aux";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandle from "../../hoc/withErrorHandle/withErrorHandle";
import { connect } from "react-redux";
import * as actionsType from "../../store/actions";

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
    loading: false,
    error: false,
  };

  updatePurchaseable(ingredients) {
    const sum = Object.keys(ingredients)
      .map((item) => ingredients[item])
      .reduce((total, item) => total + item, 0);
    return sum > 0;
  }

  purchaseHandle = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandle = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandle = () => {
    this.props.history.push("/checkout");
  };

  componentDidMount() {
    // axios
    //   .get("/ingredients.json")
    //   .then((rs) => this.setState({ ingredients: rs.data }))
    //   .catch((err) => this.setState({ error: true }));
  }

  render() {
    const disableIngredient = { ...this.props.ings };
    for (let i in disableIngredient) {
      disableIngredient[i] = disableIngredient[i] <= 0;
    }

    let renderOrderSumary = null,
      burger = this.state.error ? (
        <p>Ingredient can't be loaded!</p>
      ) : (
        <Spinner />
      );

    if (this.props.ings) {
      renderOrderSumary = (
        <OrderSumary
          ingredients={this.props.ings}
          purchaseCanceled={this.purchaseCancelHandle}
          purchaseContinued={this.purchaseContinueHandle}
          price={this.props.price}
        />
      );
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            added={this.props.onIngredientAdded}
            removed={this.props.onIngredientRemoved}
            disabled={disableIngredient}
            price={this.props.price}
            purchaseable={this.updatePurchaseable(this.props.ings)}
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

const mapStateToProps = (state) => {
  return {
    ings: state.ingredients,
    price: state.totalPrice,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingName) =>
      dispatch({ type: actionsType.ADD_INGREDIENTS, ingredientName: ingName }),
    onIngredientRemoved: (ingName) =>
      dispatch({
        type: actionsType.REMOVE_INGREDIENTS,
        ingredientName: ingName,
      }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandle(BurgerBuilder, axios));
