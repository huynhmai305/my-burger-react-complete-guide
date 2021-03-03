import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";
import styles from "./Burger.module.css";

export const Burger = (props) => {
  let renderIngredients = Object.keys(props.ingredients)
    .map((item) => {
      return [...Array(props.ingredients[item])].map((_, i) => {
        return <BurgerIngredient key={item + i} type={item} />;
      });
    })
    .reduce((arr, el) => arr.concat(el), []);
  if (renderIngredients.length === 0) {
    renderIngredients = <p>Please start adding ingredients</p>;
  }

  return (
    <div className={styles.burger}>
      <BurgerIngredient type="bread-top" />
      {renderIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};
