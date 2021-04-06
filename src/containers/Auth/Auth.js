import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import styles from "./Auth.module.css";
import * as actions from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";
import { Redirect } from "react-router";
import { updateObject, checkValidity } from "../../shared/utility";
import icon from "../../assets/images/icon.png";

const Auth = () => {
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

  const error = useSelector((state) => state.auth.error);
  const loading = useSelector((state) => state.auth.loading);
  const authRedirectPath = useSelector((state) => state.auth.authRedirectPath);
  const buildingBurger = useSelector((state) => state.burgerBuilder.building);
  const isAuthenticated = useSelector((state) => state.auth.token !== null);

  const dispatch = useDispatch();
  const onAuth = (email, password, isSignup) =>
    dispatch(actions.auth(email, password, isSignup));
  const onSetAuthRedirectPath = useCallback(
    () => dispatch(actions.setAuthRedirectPath("/")),
    [dispatch]
  );

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
    onAuth(controls.email.value, controls.password.value, isSignUp);
  };

  const switchAuthModeHandle = () => {
    setIsSignUp(!isSignUp);
  };

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

  if (loading) {
    form = <Spinner />;
  }

  let errorMessage = null;
  if (error) {
    errorMessage = (
      <div className={styles.Error}>
        <img src={icon} alt="icon" />
        <p>{error.message}</p>
      </div>
    );
  }

  let authRedirect = null;
  if (isAuthenticated) {
    authRedirect = <Redirect to={authRedirectPath} />;
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

export default Auth;
