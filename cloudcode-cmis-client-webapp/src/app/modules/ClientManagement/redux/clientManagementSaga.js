import { takeEvery, put, fork, call, all } from "redux-saga/effects";
import { clientReducerActions, clientReducerCallTypes, getClientApi, getClientByUsernameApi } from "..";
import { toast } from "react-toastify";

function* onLoadClientStartAsync({ payload }) {
  try {
    yield put(
      clientReducerActions.startCall({
        callType: clientReducerCallTypes.action,
      })
    );

    const response = yield call(getClientApi, payload.id);

    if (response.status === 200) {
      let foundClient = response.data;
      yield put(clientReducerActions.clientFetched({ foundClient }));
    } else {
      toast.error("There was an error retrieving client information");
    }
  } catch (error) {
    if (error.message) {
      toast.error(error.message);
    } else {
      toast.error(error.response.data);
    }
  }
}

function* onLoadClientByUsername({ payload }) {
  try {
    yield put(
      clientReducerActions.startCall({
        callType: clientReducerCallTypes.action,
      })
    );

    const response = yield call(getClientByUsernameApi, payload.username);

    if (response.status === 200) {
      let foundClient = response.data;
      yield put(clientReducerActions.clientFetched({ foundClient }));
    } else {
      toast.error("There was an error retrieving client information");
    }
  } catch (error) {
    if (error.message) {
      toast.error(error.message);
    } else {
      toast.error(error.response.data);
    }
  }
}


const actionTypes = {
  FetchClient: "[FetchClient] Fetch Client API Action",
  FetchClientByUsername: "[FetchClientByUsername] Fetch Client by username API Action",

};
export const actions = {
  fetchClient: (id) => ({
    type: actionTypes.FetchClient,
    payload: { id: id },
  }),
  fetchClientByUsername: (username) => ({
    type: actionTypes.FetchClientByUsername,
    payload: { username: username },
  }),  
};

function* fetchClient() {
  yield takeEvery(actionTypes.FetchClient, onLoadClientStartAsync);
}

function* fetchClientByUsername() {
  yield takeEvery(actionTypes.FetchClientByUsername, onLoadClientByUsername);
}


const fSagas = [
  fork(fetchClient),
  fork(fetchClientByUsername)
];
export function* saga() {
  yield all([...fSagas]);
}
