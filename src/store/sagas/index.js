import { takeEvery, all } from "redux-saga/effects";
import {
  logoutSaga,
  checkAuthTimeoutSaga,
  authUserSaga,
  authCheckStateSaga,
} from "./auth";
import { initIngredientSaga } from "./burgerBuilder";
import { fetchOrdersSaga, purchaseBurgerSaga } from "./order";
import * as actionTypes from "../actions/actionTypes";

export function* watchAuth() {
  yield all([
    takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
    takeEvery(actionTypes.AUTH_CHECK_TIME_OUT, checkAuthTimeoutSaga),
    takeEvery(actionTypes.AUTH_USER, authUserSaga),
    takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga),
  ]);
}

export function* watchBurgerBuilder() {
  yield takeEvery(actionTypes.INIT_INGREDIENTS, initIngredientSaga);
}

export function* watchOrder() {
  yield all([
    takeEvery(actionTypes.PURCHASE_BURGER, purchaseBurgerSaga),
    takeEvery(actionTypes.FETCH_ORDERS, fetchOrdersSaga),
  ]);
}

/**
 * NOTE
 * yield: chay tuan tu cac cau lenh, thuc thi xong tra ra kq moi chay tiep
 * put(action): dispatch 1 action
 * takeEvery(action, saga): theo doi action, neu action thay doi => call saga
 */
