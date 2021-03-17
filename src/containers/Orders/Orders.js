import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import { Component } from "react";
import { connect } from "react-redux";
import withErrorHandle from "../../hoc/withErrorHandle/withErrorHandle";
import * as actions from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";

class Orders extends Component {
  componentDidMount() {
    this.props.fetchOrders();
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

    return renderOrders;
  }
}

const mapStateToProps = (state) => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchOrders: () => dispatch(actions.fetchOrders()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandle(Orders, axios));
