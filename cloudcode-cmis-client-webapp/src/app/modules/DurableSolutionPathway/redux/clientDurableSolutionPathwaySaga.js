import { takeEvery, put, fork, call, all } from "redux-saga/effects";
import { dspReducerActions } from "..";
import { dspReducerCallTypes } from "..";
import { getClientDspApi } from "..";
import { toast } from "react-toastify";

function* onLoadClientDspStartAsync({ payload }) {
  try {
    yield put(
      dspReducerActions.startCall({
        callType: dspReducerCallTypes.list,
      })
    );

    const response = yield call(getClientDspApi, payload.clientId);

    if (response.status === 200) {
      let entity = response.data;
      yield put(
        dspReducerActions.dspFetched({
          entity
        })
      );
    } else {
      let errorMsg = "There was an error retrieving dsp information.";
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
    FetchClientDsp: "[FetchClientDsp] Fetch Client Dsp API Action",
};
export const actions = {
    fetchClientDsp: (clientId) => ({ type: actionTypes.FetchClientDsp, payload: { clientId:clientId },}),
  };

function* fetchClientDsps() {
  yield takeEvery(actionTypes.FetchClientDsp,onLoadClientDspStartAsync);
}


const fSagas = [
    fork(fetchClientDsps),

];

export function* saga() {
  yield all([...fSagas]);
}
