import {all} from "redux-saga/effects";
import {combineReducers} from "redux";

//import * as auth from "../app/modules/Auth/redux/authRedux";
import { uiReducer } from "../app/modules/UI";

import { referenceReducer, referenceSaga } from "../app/modules/Administration/ReferenceInfoManagement";
import { caseWorkerReducer, caseWorkerSaga } from "../app/modules/Administration/CaseWorkerManagement";
import { userReducer, userSaga } from "../app/modules/Administration/UserManagement";
import { authReducerActions } from "../app/modules/Auth";
import storage from "redux-persist/lib/storage";
import { authReducer, authSaga } from "../app/modules/Auth";
import { feedbackReducer, feedbackSaga } from "../app/modules/Feedback";


import { 
  clientReducer, 
  clientSaga, 
  clientEngagementReducer, 
  clientEngagementSaga,
  fipReducer,
  fipSaga,
  dspReducer,
  dspSaga,
} from "../app/modules/ClientManagement";
import {dashboardReducer, dashboardSaga} from "../app/modules/Dashboard";

const appReducer = combineReducers({
  auth: authReducer,
  ui:uiReducer, 
  reference: referenceReducer,
  caseWorker: caseWorkerReducer,
  client: clientReducer,
  engagement: clientEngagementReducer,
  fip: fipReducer,
  dsp: dspReducer,
  dashboard: dashboardReducer,
  feedback: feedbackReducer,
  user:userReducer
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
    clientSaga(),
    clientEngagementSaga(),
    fipSaga(),
    dspSaga(),
    dashboardSaga(),
    feedbackSaga(),
    userSaga()
  ]);
}
