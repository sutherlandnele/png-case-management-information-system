import { takeEvery, put, fork, call, all } from "redux-saga/effects";
import { clientEngagementReducerActions } from "..";
import { clientEngagementReducerCallTypes } from "..";
import {getAllClientEngagementsApi } 
from "..";
import { toast } from "react-toastify";

function* onLoadClientEngagementsStartAsync({ payload }) {
  try {
    yield put(
      clientEngagementReducerActions.startCall({
        callType: clientEngagementReducerCallTypes.list,
      })
    );

    const response = yield call(getAllClientEngagementsApi, payload.clientId);

    if (response.status === 200) {
      let totalCount = response.data.length;
      let entities = response.data;
      yield put(
        clientEngagementReducerActions.engagementsFetched({
          totalCount,
          entities,
        })
      );
    } else {
      let errorMsg = "There was an error retrieving clients information.";

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
    FetchClientEngagements: "[FetchClientEngagements] Fetch Client Engagements API Action",
};
export const actions = {
    fetchClientEngagements: (clientId) => ({ type: actionTypes.FetchClientEngagements, payload: { clientId: clientId },}),

  };

function* fetchClientEngagements() {
  yield takeEvery(actionTypes.FetchClientEngagements,onLoadClientEngagementsStartAsync);
}


const fSagas = [
    fork(fetchClientEngagements),

];

export function* saga() {
  yield all([...fSagas]);
}
