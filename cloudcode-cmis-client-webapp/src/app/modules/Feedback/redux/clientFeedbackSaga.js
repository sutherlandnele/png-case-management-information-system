import { takeEvery, put, fork, call, all } from "redux-saga/effects";
import { 
  createFeedbackApi,
  feedbackReducerActions,
  feedbackReducerCallTypes 
} 
from "..";

import { toast } from "react-toastify";

function* onCreateFeedbacksStartAsync({payload}) {
  try {

    yield put(
      feedbackReducerActions.startCall({
        callType: feedbackReducerCallTypes.action,
      })
    );

    const response = yield call(createFeedbackApi, payload.feedback);

    if (response.status === 200) {
      let entity = response.data;
      yield put(
        feedbackReducerActions.feedbackCreated({
          entity,
        })
      );
    } else {
      let errorMsg = "There was an error creating the feedback.";

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
    CreateFeedback: "[CreateFeedback] Create Feedback API Action"
  };

export const actions = {
    createFeedback: (feedback) => ({ type: actionTypes.CreateFeedback, payload: { feedback },}),

  };

function* createFeedback() {
  yield takeEvery(actionTypes.CreateFeedback,onCreateFeedbacksStartAsync);
}

const fSagas = [
    fork(createFeedback),
];

export function* saga() {
  yield all([...fSagas]);
}
