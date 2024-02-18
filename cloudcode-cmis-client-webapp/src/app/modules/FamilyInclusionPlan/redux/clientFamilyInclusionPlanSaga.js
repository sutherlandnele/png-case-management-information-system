import { takeEvery, put, fork, call, all } from "redux-saga/effects";
import { fipReducerActions } from "..";
import { fipReducerCallTypes } from "..";
import { getClientFipApi } from "..";
import { toast } from "react-toastify";

function* onLoadClientFipStartAsync({payload}) {
  try {
    yield put(
      fipReducerActions.startCall({
        callType: fipReducerCallTypes.list,
      })
    );

    const response = yield call(getClientFipApi,payload.clientId);

    if (response.status === 200) {
      let entity = response.data;
      yield put(
        fipReducerActions.fipFetched({
       
          entity,
        })
      );
    } else {
      let errorMsg = "There was an error retrieving fip information.";
      toast.error(errorMsg);
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
    FetchClientFip: "[FetchClientFip] Fetch Client Fip API Action",

};
export const actions = {
    fetchClientFip: (clientId) => ({ type: actionTypes.FetchClientFip, payload: { clientId:clientId },}),
  };

function* fetchClientFips() {
  yield takeEvery(actionTypes.FetchClientFip,onLoadClientFipStartAsync);
}


const fSagas = [
    fork(fetchClientFips)
];

export function* saga() {
  yield all([...fSagas]);
}
