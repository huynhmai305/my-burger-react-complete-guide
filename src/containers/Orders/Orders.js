import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import { Component } from "react";
import { connect } from "react-redux";
import withErrorHandle from "../../hoc/withErrorHandle/withErrorHandle";
import * as actions from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";

class Orders extends Component {
  componentDidMount() {
    this.props.fetchOrders(this.props.token, this.props.userId);
  }

  render() {
    let renderOrders = (
      <div>
        {this.props.orders.map((order) => (
          <Order
            key={order.id}
            ingredients={order.ingredients}
            price={order.price}
          />
        ))}
      </div>
    );

    if (this.props.loading) {
      renderOrders = <Spinner />;
    }

    if (this.props.error) {
      renderOrders = this.props.error;
    }

    return renderOrders;
  }
}

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
