import styles from "./Input.module.css";

const Input = (props) => {
  let inputElement = null;
  const inputStyles = [styles.InputElement];
  let validationError = null;
  if (props.invalid && props.touched) {
    inputStyles.push(styles.Invalid);
    validationError = (
      <p className={styles.ValidationError}>Please enter a valid value</p>
    );
  }

  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          {...props.elementConfig}
          value={props.value}
          className={inputStyles.join(" ")}
          onChange={props.changed}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          {...props.elementConfig}
          value={props.value}
          className={inputStyles.join(" ")}
          onChange={props.changed}
        />
      );
      break;
    case "select":
      inputElement = (
        <select
          value={props.value}
          className={inputStyles.join(" ")}
          onChange={props.changed}
        >
          {props.elementConfig.options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          {...props.elementConfig}
          value={props.value}
          className={inputStyles.join(" ")}
          onChange={props.changed}
        />
      );
  }
  return (
    <div className={styles.Input}>
      <label className={styles.Label}>{props.label}</label>
      {inputElement}
      {validationError}
    </div>
  );
};

export default Input;
