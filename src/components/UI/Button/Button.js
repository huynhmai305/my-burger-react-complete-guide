import styles from "./Button.module.css";

export const Button = (props) => (
  <button
    className={[styles.Button, styles[props.btnType]].join(" ")}
    onClick={props.clicked}
  >
    {props.children}
  </button>
);
