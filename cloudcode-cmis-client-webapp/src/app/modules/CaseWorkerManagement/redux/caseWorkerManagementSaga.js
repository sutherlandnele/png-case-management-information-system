import { takeEvery, put, fork, call, all } from "redux-saga/effects";
import {
  caseWorkerReducerCallTypes,
  caseWorkerReducerActions,
  getClientCaseWorkerApi,
} from "..";
import { toast } from "react-toastify";

function* onLoadCaseWorkerStartAsync({ payload }) {
  try {
    yield put(
      caseWorkerReducerActions.startCall({
        callType: caseWorkerReducerCallTypes.list,
      })
    );

    const response = yield call(getClientCaseWorkerApi, payload.clientId);

    if (response.status === 200) {
      let entity = response.data;
      yield put(caseWorkerReducerActions.caseWorkerFetched({ entity }));
    } else {
      let errorMsg = "There was an error retrieving case workers information.";
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
  FetchCaseWorker: "[FetchCaseWorker] Fetch Client Case Worker API Action",
};
export const actions = {
  fetchCaseWorker: (clientId) => ({
    type: actionTypes.FetchCaseWorker,
    payload: { clientId: clientId },
  }),
};
function* fetchCaseWorker() {
  yield takeEvery(actionTypes.FetchCaseWorker, onLoadCaseWorkerStartAsync);
}

const fSagas = [fork(fetchCaseWorker)];
export function* saga() {
  yield all([...fSagas]);
}
