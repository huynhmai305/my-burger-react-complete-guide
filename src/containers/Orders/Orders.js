import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import { useEffect } from "react";
import { connect } from "react-redux";
import withErrorHandle from "../../hoc/withErrorHandle/withErrorHandle";
import * as actions from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";

const Orders = (props) => {
  const { fetchOrders } = props;

  useEffect(() => {
    fetchOrders(props.token, props.userId);
  }, [fetchOrders, props.token, props.userId]);

  let renderOrders = <Spinner />;

  if (!props.loading) {
    renderOrders = (
      <div>
        {props.orders.map((order) => (
          <Order
            key={order.id}
            ingredients={order.ingredients}
            price={order.price}
          />
        ))}
      </div>
    );
  }

  if (props.error) {
    renderOrders = props.error;
  }

  return renderOrders;
};

const mapStateToProps = (state) => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    error: state.order.error,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchOrders: (token, userId) =>
      dispatch(actions.fetchOrders(token, userId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandle(Orders, axios));
