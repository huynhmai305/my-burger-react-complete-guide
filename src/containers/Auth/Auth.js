import { useState, useEffect } from "react";
import { Button } from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import styles from "./Auth.module.css";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";
import { Redirect } from "react-router";
import { updateObject, checkValidity } from "../../shared/utility";

const Auth = (props) => {
  const [controls, setControls] = useState({
    email: {
      elementType: "input",
      elementConfig: {
        type: "email",
        placeholder: "Mail address",
      },
      value: "",
      validation: {
        required: true,
        isEmail: true,
      },
      valid: false,
      touched: false,
    },
    password: {
      elementType: "input",
      elementConfig: {
        type: "password",
        placeholder: "Password",
      },
      value: "",
      validation: {
        required: true,
        minLength: 6,
      },
      valid: false,
      touched: false,
    },
  });
  const [formIsValid, setFormIsValid] = useState(false);
  const [isSignUp, setIsSignUp] = useState(true);

  const inputChangeHandle = (e, inputIdentifier) => {
    const updateControlsForm = updateObject(controls, {
      [inputIdentifier]: updateObject(controls[inputIdentifier], {
        value: e.target.value,
        valid: checkValidity(
          e.target.value,
          controls[inputIdentifier].validation
        ),
        touched: true,
      }),
    });
    let formValid = true;
    for (let element in updateControlsForm) {
      formValid = updateControlsForm[element].valid && formValid;
    }
    setControls(updateControlsForm);
    setFormIsValid(formValid);
  };

  const submitHandle = (e) => {
    e.preventDefault();
    props.onAuth(controls.email.value, controls.password.value, isSignUp);
  };

  const switchAuthModeHandle = () => {
    setIsSignUp(!isSignUp);
  };

  const { buildingBurger, authRedirectPath, onSetAuthRedirectPath } = props;

  useEffect(() => {
    if (!buildingBurger && authRedirectPath !== "/") {
      onSetAuthRedirectPath();
    }
  }, [buildingBurger, authRedirectPath, onSetAuthRedirectPath]);

  const formElements = [];
  for (let key in controls) {
    formElements.push({
      id: key,
      config: controls[key],
    });
  }

  let form = formElements.map((el) => (
    <Input
      key={el.id}
      elementType={el.config.elementType}
      elementConfig={el.config.elementConfig}
      value={el.config.value}
      changed={(e) => inputChangeHandle(e, el.id)}
      shouldValidate={el.config.validation}
      invalid={!el.config.valid}
      touched={el.config.touched}
    />
  ));

  if (props.loading) {
    form = <Spinner />;
  }

  let errorMessage = null;
  if (props.error) {
    errorMessage = <p className={styles.Error}>{props.error.message}</p>;
  }

  let authRedirect = null;
  if (props.isAuthenticated) {
    authRedirect = <Redirect to={props.authRedirectPath} />;
  }
  return (
    <div className={styles.Auth}>
      {authRedirect}
      {errorMessage}
      <form onSubmit={submitHandle}>
        {form}
        <Button btnType="Success" disabled={!formIsValid}>
          SUBMIT
        </Button>
      </form>
      <Button btnType="Danger" clicked={switchAuthModeHandle}>
        SWITCH TO {isSignUp ? "SIGNIN" : "SIGNUP"}
      </Button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth.auth,
    error: state.auth.error,
    loading: state.auth.loading,
    isAuthenticated: state.auth.token !== null,
    buildingBurger: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignup) =>
      dispatch(actions.auth(email, password, isSignup)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath("/")),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
