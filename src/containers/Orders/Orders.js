import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import withErrorHandle from "../../hoc/withErrorHandle/withErrorHandle";
import * as actions from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";

const Orders = (props) => {
  const dispatch = useDispatch();

  const orders = useSelector((state) => state.order.orders);
  const loading = useSelector((state) => state.order.loading);
  const error = useSelector((state) => state.order.error);
  const token = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.auth.userId);

  const fetchOrders = useCallback(
    (token, userId) => dispatch(actions.fetchOrders(token, userId)),
    [dispatch]
  );

  useEffect(() => {
    fetchOrders(token, userId);
  }, [fetchOrders, token, userId]);

  let renderOrders = <Spinner />;

  if (!loading) {
    renderOrders = (
      <div>
        {orders.map((order) => (
          <Order
            key={order.id}
            ingredients={order.ingredients}
            price={order.price}
          />
        ))}
      </div>
    );
  }

  if (error) {
    renderOrders = props.error;
  }

  return renderOrders;
};

export default withErrorHandle(Orders, axios);
