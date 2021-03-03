import { Aux } from "../../../hoc/Aux";
import Backdrop from "../BackDrop/BackDrop";
import styles from "./Modal.module.css";

const Modal = (props) => (
  <Aux>
    <Backdrop show={props.show} clicked={props.modalClose} />
    <div
      className={styles.Modal}
      style={{
        transform: props.show ? "translateY(0)" : "translateY(-100vh)",
        opacity: props.show ? "1" : "0",
      }}
    >
      {props.children}
    </div>
  </Aux>
);

export default Modal;
