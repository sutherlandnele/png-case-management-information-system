import { takeEvery, put, fork, call, all } from "redux-saga/effects";
import { 
  getAllFeedbacksApi,
  findFeedbacksApi,
  feedbackReducerActions,
  feedbackReducerCallTypes,
  getAllSrmFeedbacksApi, 
  findSrmFeedbacksApi
} 
from "..";

import { toast } from "react-toastify";

function* onLoadFeedbacksStartAsync() {
  try {
    yield put(
      feedbackReducerActions.startCall({
        callType: feedbackReducerCallTypes.list,
      })
    );

    const response = yield call(getAllFeedbacksApi);

    if (response.status === 200) {
      let totalCount = response.data.length;
      let entities = response.data;
      yield put(
        feedbackReducerActions.feedbacksFetched({
          totalCount,
          entities,
        })
      );
    } else {
      let errorMsg = "There was an error retrieving feedback information.";

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

function* onFindFeedbacksStartAsync({payload}) {
  try {
    yield put(
      feedbackReducerActions.startCall({
        callType: feedbackReducerCallTypes.list,
      })
    );

    const response = yield call(findFeedbacksApi, payload.queryParams);

    if (response.status === 200) {
      let totalCount = response.data.length;
      let entities = response.data;
      yield put(
        feedbackReducerActions.feedbacksFetched({
          totalCount,
          entities,
        })
      );
    } else {
      let errorMsg = "There was an error retrieving feedback information.";

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

function* onLoadSrmFeedbacksStartAsync({payload}) {
  try {
    yield put(
      feedbackReducerActions.startCall({
        callType: feedbackReducerCallTypes.list,
      })
    );

    const response = yield call(getAllSrmFeedbacksApi,payload.caseWorkerId);

    if (response.status === 200) {
      let totalCount = response.data.length;
      let entities = response.data;
      yield put(
        feedbackReducerActions.feedbacksFetched({
          totalCount,
          entities,
        })
      );
    } else {
      let errorMsg = "There was an error retrieving feedback information.";

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

function* onFindSrmFeedbacksStartAsync({payload}) {
  try {
    yield put(
      feedbackReducerActions.startCall({
        callType: feedbackReducerCallTypes.list,
      })
    );

    const response = yield call(findSrmFeedbacksApi, payload.caseWorkerId, payload.queryParams);

    if (response.status === 200) {
      let totalCount = response.data.length;
      let entities = response.data;
      yield put(
        feedbackReducerActions.feedbacksFetched({
          totalCount,
          entities,
        })
      );
    } else {
      let errorMsg = "There was an error retrieving feedback information.";

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
    FetchClientFeedbacks: "[FetchClientFeedbacks] Fetch Client Feedbacks API Action",
    FindClientFeedbacks: "[FindClientFeedbacks] Find Client Feedbacks API Action",
    FetchSrmClientFeedbacks: "[FetchSrmClientFeedbacks] Fetch Srm Client Feedbacks API Action",
    FindSrmClientFeedbacks: "[FindSrmClientFeedbacks] Find Srm Client Feedbacks API Action",
};
export const actions = {
    fetchAllClientFeedbacks: () => ({ type: actionTypes.FetchClientFeedbacks, payload: { undefined },}),
    findAllClientFeedbacks: (queryParams) => ({ type: actionTypes.FindClientFeedbacks, payload: { queryParams },}),
    fetchAllSrmClientFeedbacks: (caseWorkerId) => ({ type: actionTypes.FetchSrmClientFeedbacks, payload: { caseWorkerId },}),
    findAllSrmClientFeedbacks: (caseWorkerId,queryParams) => ({ type: actionTypes.FindSrmClientFeedbacks, payload: { caseWorkerId, queryParams },}),
  };

function* fetchAllClientFeedbacks() {
  yield takeEvery(actionTypes.FetchClientFeedbacks,onLoadFeedbacksStartAsync);
}

function* findAllClientFeedbacks() {
  yield takeEvery(actionTypes.FindClientFeedbacks,onFindFeedbacksStartAsync);
}

function* fetchAllSrmClientFeedbacks() {
  yield takeEvery(actionTypes.FetchSrmClientFeedbacks,onLoadSrmFeedbacksStartAsync);
}

function* findAllSrmClientFeedbacks() {
  yield takeEvery(actionTypes.FindSrmClientFeedbacks,onFindSrmFeedbacksStartAsync);
}

const fSagas = [
    fork(fetchAllClientFeedbacks),
    fork(findAllClientFeedbacks),
    fork(fetchAllSrmClientFeedbacks),
    fork(findAllSrmClientFeedbacks)
];

export function* saga() {
  yield all([...fSagas]);
}
