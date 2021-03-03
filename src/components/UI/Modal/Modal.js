import { Component } from "react";
import { Aux } from "../../../hoc/Aux/Aux";
import Backdrop from "../BackDrop/BackDrop";
import styles from "./Modal.module.css";

class Modal extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.show !== this.props.show;
  }

  componentDidUpdate(prevProps, prevState) {}

  render() {
    return (
      <Aux>
        <Backdrop show={this.props.show} clicked={this.props.modalClose} />
        <div
          className={styles.Modal}
          style={{
            transform: this.props.show ? "translateY(0)" : "translateY(-100vh)",
            opacity: this.props.show ? "1" : "0",
          }}
        >
          {this.props.children}
        </div>
      </Aux>
    );
  }
}

export default Modal;
