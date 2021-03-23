import React from "react";
import { connect } from "react-redux";
import { Button } from "../../../components/UI/Button/Button";
import styles from "./ContactData.module.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import * as actions from "../../../store/actions/index";
import withErrorHandle from "../../../hoc/withErrorHandle/withErrorHandle";
import { updateObject, checkValidity } from "../../../shared/utility";

class ContactData extends React.Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Street",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      zipcode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Zipcode",
        },
        value: "",
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5,
          isNumberic: true,
        },
        valid: false,
        touched: false,
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Country",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your Email",
        },
        value: "",
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" },
          ],
        },
        value: "fastest",
        validation: {},
        valid: true,
      },
    },
    formIsValid: false,
  };

  orderHandle = (e) => {
    e.preventDefault();
    const formData = {};
    for (let key in this.state.orderForm) {
      formData[key] = this.state.orderForm[key].value;
    }
    const order = {
      ingredients: this.props.ings,
      price: this.props.price,
      orderData: formData,
      userId: this.props.userId,
    };
    this.props.onOrderBurger(order, this.props.token);
  };

  inputChangeHandle = (e, inputIdentifier) => {
    const updateOrderElement = updateObject(
      this.state.orderForm[inputIdentifier],
      {
        value: e.target.value,
        valid: checkValidity(
          e.target.value,
          this.state.orderForm[inputIdentifier].validation
        ),
        touched: true,
      }
    );
    const updateOrderForm = updateObject(this.state.orderForm, {
      [inputIdentifier]: updateOrderElement,
    });
    let formIsValid = true;
    for (let key in updateOrderForm) {
      formIsValid = updateOrderForm[key].valid && formIsValid;
    }
    this.setState({ orderForm: updateOrderForm, formIsValid });
  };

  render() {
    let formElementArr = [];
    for (let key in this.state.orderForm) {
      formElementArr.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }
    let form = (
      <form>
        {formElementArr.map((el) => (
          <Input
            key={el.id}
            elementType={el.config.elementType}
            elementConfig={el.config.elementConfig}
            shouldValidate={el.config.validation}
            value={el.config.value}
            changed={(e) => this.inputChangeHandle(e, el.id)}
            invalid={!el.config.valid}
            touched={el.config.touched}
          />
        ))}
        <Button
          btnType="Success"
          clicked={this.orderHandle}
          disabled={!this.state.formIsValid}
        >
          ORDER
        </Button>
      </form>
    );

    if (this.props.loading) {
      form = <Spinner />;
    }

    return (
      <div className={styles.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onOrderBurger: (orderData, token) =>
      dispatch(actions.purchaseBurger(orderData, token)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandle(ContactData, axios));
