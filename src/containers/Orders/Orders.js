import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import { Component } from "react";
import withErrorHandle from "../../hoc/withErrorHandle/withErrorHandle";

class Orders extends Component {
  state = {
    orders: [],
    loading: true,
  };

  componentDidMount() {
    axios
      .get("/orders.json")
      .then((rs) => {
        const fetchedOrders = [];
        for (let key in rs.data) {
          fetchedOrders.push({ ...rs.data[key], id: key });
        }
        this.setState({ orders: fetchedOrders, loading: false });
      })
      .catch((err) => this.setState({ loading: false }));
  }

  render() {
    return (
      <div>
        {this.state.orders.map((order) => (
          <Order
            key={order.id}
            ingredients={order.ingredients}
            price={order.price}
          />
        ))}
      </div>
    );
  }
}

export default withErrorHandle(Orders, axios);
