import Burger from "../../Burger/Burger";
import { Button } from "../../UI/Button/Button";
import styles from "./CheckoutSummary.module.css";

const CheckoutSumary = (props) => {
  return (
    <div className={styles.CheckoutSumary}>
      <h1>We hope it tastes well</h1>
      <div className={styles.Burger}>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button btnType="Danger" clicked={props.checkoutCanceled}>
        CANCEL
      </Button>
      <Button btnType="Success" clicked={props.checkoutContinued}>
        CONTINUE
      </Button>
    </div>
  );
};

export default CheckoutSumary;
