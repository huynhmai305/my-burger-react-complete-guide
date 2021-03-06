import * as actions from "../actions";
import axios from "../../axios-orders";
import { put } from "@redux-saga/core/effects";

export function* initIngredientsSaga(action) {
  try {
    const response = yield axios.get("/ingredients.json");
    yield put(actions.setIngredients(response.data));
  } catch (err) {
    yield put(actions.fetchIngredientsFailed(err));
  }
}
