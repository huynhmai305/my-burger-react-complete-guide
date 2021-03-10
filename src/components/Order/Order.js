import styles from "./Order.module.css";

const Order = (props) => {
  const ingredients = [];
  for (let key in props.ingredients) {
    ingredients.push({ name: key, amount: props.ingredients[key] });
  }
  const renderIngredients = ingredients.map((ig) => (
    <span key={ig.name} className={styles.Ingredient}>
      {ig.name} ({ig.amount})
    </span>
  ));
  return (
    <div className={styles.Order}>
      <p>Ingredients: {renderIngredients}</p>
      <p>
        Price: <strong>${Number.parseFloat(props.price).toFixed(2)}</strong>
      </p>
    </div>
  );
};

export default Order;
