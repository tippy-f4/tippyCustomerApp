// @flow

import Router from "next/router";
import { call, takeEvery, put, select, take } from "redux-saga/effects";
import { types, actions } from "../modules/employee";
import { type TEmployee } from "../../typedef/api/employee";
import { type TError } from "../../typedef/api/error";
import employeeAPI from "../../services/employeeAPI";
import { throwError } from "../../helpers/util";
import { type Store } from "../modules";

function* startFetchDataSaga(action) {
  console.log(action);
  const { payload, error }: { payload: TEmployee, error: TError } = yield call(
    employeeAPI.fetchEmployee
  );
  if (payload && !error) {
    yield put(actions.successFetchData(payload));
    yield take(actions.successFetchData);
    yield call(Router.push, "/posted");
  } else if (error) {
    yield put(actions.failFetchData(error));
    yield take(actions.failFetchData);
    yield call(Router.push, "/posted");
  } else {
    throwError("bye");
  }
}

// $FlowFixMe TODO
export default function* cardSaga() {
  yield takeEvery(types.START_FETCH_DATA, startFetchDataSaga);
}
