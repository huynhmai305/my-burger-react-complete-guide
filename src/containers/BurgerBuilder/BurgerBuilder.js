import { useState, useEffect, useCallback } from "react";
import { BuildControls } from "../../components/Burger/BuildControls/BuildControls";
import Burger from "../../components/Burger/Burger";
import OrderSumary from "../../components/Burger/OrderSummary/OrderSummary";
import Modal from "../../components/UI/Modal/Modal";
import { Aux } from "../../hoc/Aux/Aux";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandle from "../../hoc/withErrorHandle/withErrorHandle";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions/index";

const BurgerBuilder = (props) => {
  const [purchasing, setPurchasing] = useState(false);
  const dispatch = useDispatch();

  const ings = useSelector((state) => state.burgerBuilder.ingredients);
  const price = useSelector((state) => state.burgerBuilder.totalPrice);
  const error = useSelector((state) => state.burgerBuilder.error);
  const isAuthenticated = useSelector((state) => state.auth.token !== null);

  const onIngredientAdded = (ingName) =>
    dispatch(actions.addIngredient(ingName));
  const onIngredientRemoved = (ingName) =>
    dispatch(actions.removeIngredient(ingName));
  const onInitIngredients = useCallback(
    () => dispatch(actions.initIngredient()),
    [dispatch]
  );
  const onInitPurchase = () => dispatch(actions.purchaseInit());
  const onSetAuthRedirectPath = (path) =>
    dispatch(actions.setAuthRedirectPath(path));

  const updatePurchaseable = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((item) => ingredients[item])
      .reduce((total, item) => total + item, 0);
    return sum > 0;
  };

  const purchaseHandle = () => {
    if (isAuthenticated) {
      setPurchasing(true);
    } else {
      onSetAuthRedirectPath("/checkout");
      props.history.push("/auth");
    }
  };

  const purchaseCancelHandle = () => {
    setPurchasing(false);
  };

  const purchaseContinueHandle = () => {
    onInitPurchase();
    props.history.push("/checkout");
  };

  useEffect(() => {
    onInitIngredients();
  }, [onInitIngredients]);

  const disableIngredient = { ...ings };
  for (let i in disableIngredient) {
    disableIngredient[i] = disableIngredient[i] <= 0;
  }

  let renderOrderSumary = null,
    burger = error ? <p>Ingredient can't be loaded!</p> : <Spinner />;

  if (ings) {
    renderOrderSumary = (
      <OrderSumary
        ingredients={ings}
        purchaseCanceled={purchaseCancelHandle}
        purchaseContinued={purchaseContinueHandle}
        price={price}
      />
    );
    burger = (
      <Aux>
        <Burger ingredients={ings} />
        <BuildControls
          added={onIngredientAdded}
          removed={onIngredientRemoved}
          disabled={disableIngredient}
          price={price}
          purchaseable={updatePurchaseable(ings)}
          ordered={purchaseHandle}
          isAuth={isAuthenticated}
        />
      </Aux>
    );
  }

  return (
    <Aux>
      <Modal show={purchasing} modalClose={purchaseCancelHandle}>
        {renderOrderSumary}
      </Modal>
      {burger}
    </Aux>
  );
};

export default withErrorHandle(BurgerBuilder, axios);
