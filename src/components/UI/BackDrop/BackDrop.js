import styles from "./Backdrop.module.css";

const Backdrop = (props) =>
  props.show && <div className={styles.Backdrop} onClick={props.clicked}></div>;

export default Backdrop;
