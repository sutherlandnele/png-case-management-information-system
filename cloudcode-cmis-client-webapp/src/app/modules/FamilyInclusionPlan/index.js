/* Redux, Saga, Action Creators, Axios and API Related */

import {
  getClientFipApi,
} from "../FamilyInclusionPlan/redux/clientFamilyInclusionPlanAPI";

import {
  actions as fipReducerActions,
  reducer as fipReducer,
  callTypes as fipReducerCallTypes,
} from "../FamilyInclusionPlan/redux/clientFamilyInclusionPlanSlice";

import {
  actions as fipSagaActions,
  saga as fipSaga,
} from "../FamilyInclusionPlan/redux/clientFamilyInclusionPlanSaga";

import endPoint from "../../../config/endPoints";

/* Components Related */

import { ClientFIPViewForm } from "./pages/ClientFIPViewForm";

export {
  /* Redux, Saga, Action Creators, Axios and API Related */

  endPoint,
  getClientFipApi,
  fipReducerActions,
  fipReducer,
  fipReducerCallTypes,
  fipSagaActions,
  fipSaga,
  /* Components Related */

  ClientFIPViewForm,
  /* Styles */
 
};
