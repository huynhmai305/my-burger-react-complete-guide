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
import * as actions from "../../store/actions/index";

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
  };

  updatePurchaseable(ingredients) {
    const sum = Object.keys(ingredients)
      .map((item) => ingredients[item])
      .reduce((total, item) => total + item, 0);
    return sum > 0;
  }

  purchaseHandle = () => {
    if (this.props.isAuthenticated) {
      this.setState({ purchasing: true });
    } else {
      this.props.onSetAuthRedirectPath("/checkout");
      this.props.history.push("/auth");
    }
  };

  purchaseCancelHandle = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandle = () => {
    this.props.onInitPurchase();
    this.props.history.push("/checkout");
  };

  componentDidMount() {
    this.props.onInitIngredients();
  }

  render() {
    const disableIngredient = { ...this.props.ings };
    for (let i in disableIngredient) {
      disableIngredient[i] = disableIngredient[i] <= 0;
    }

    let renderOrderSumary = null,
      burger = this.props.error ? (
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
            isAuth={this.props.isAuthenticated}
          />
        </Aux>
      );
    }

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
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
    onIngredientRemoved: (ingName) =>
      dispatch(actions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(actions.initIngredient()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
    onSetAuthRedirectPath: (path) =>
      dispatch(actions.setAuthRedirectPath(path)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandle(BurgerBuilder, axios));
