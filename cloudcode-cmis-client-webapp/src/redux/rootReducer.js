import { all } from "redux-saga/effects";
import { combineReducers } from "redux";

//import * as auth from "../app/modules/Auth/_redux/authRedux";
import { uiReducer } from "../app/modules/UI";

import {
  referenceReducer,
  referenceSaga,
} from "../app/modules/ReferenceInfoManagement";
import {
  caseWorkerReducer,
  caseWorkerSaga,
} from "../app/modules/CaseWorkerManagement";
import {
  clientEngagementReducer,
  clientEngagementSaga,
} from "../app/modules/RecordOfEngagement";

import { fipReducer, fipSaga } from "../app/modules/FamilyInclusionPlan";

import { dspReducer, dspSaga } from "../app/modules/DurableSolutionPathway";

import { dashboardReducer, dashboardSaga } from "../app/modules/Dashboard";
import { clientReducer,clientSaga } from "../app/modules/ClientManagement";
import { authReducerActions } from "../app/modules/Auth";
import storage from "redux-persist/lib/storage";
import { authReducer, authSaga } from "../app/modules/Auth";
import { feedbackReducer, feedbackSaga } from "../app/modules/Feedback";

export const appReducer = combineReducers({
  auth: authReducer,
  ui: uiReducer,
  reference: referenceReducer,
  caseWorker: caseWorkerReducer,
  engagement: clientEngagementReducer,
  fip: fipReducer,
  dsp: dspReducer,
  dashboard: dashboardReducer,
  feedback: feedbackReducer,
  client: clientReducer,
});

export const rootReducer = (state, action) => {
  if ( action.type.localeCompare(authReducerActions.loggedOut) === 0) {
      // for all keys defined in your persistConfig(s)
      storage.removeItem('persist:reference-entities');
      storage.removeItem('persist:case-worker-entities');
      storage.removeItem('persist:user-access-key');
      state = undefined;
  }
  return appReducer(state, action);
};


export function* rootSaga() {
  yield all([
    authSaga(),
    referenceSaga(),
    caseWorkerSaga(),
    clientEngagementSaga(),
    fipSaga(),
    dspSaga(),
    dashboardSaga(),
    clientSaga(),
    feedbackSaga()
  ]);
}
