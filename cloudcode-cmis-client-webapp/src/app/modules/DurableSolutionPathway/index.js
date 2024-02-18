/* Redux, Saga, Action Creators, Axios and API Related */

import {
  getClientDspApi
} from "../DurableSolutionPathway/redux/clientDurableSolutionPathwayAPI";

import {
  actions as dspReducerActions,
  reducer as dspReducer,
  callTypes as dspReducerCallTypes,
} from "../DurableSolutionPathway/redux/clientDurableSolutionPathwaySlice";

import {
  actions as dspSagaActions,
  saga as dspSaga,
} from "../DurableSolutionPathway/redux/clientDurableSolutionPathwaySaga";

import endPoint from "../../../config/endPoints";

/* Components Related */

import { ClientDSPViewForm } from "./pages/ClientDSPViewForm";

import styles from "../DurableSolutionPathway/css/dsp.module.css";

export {
  /* Redux, Saga, Action Creators, Axios and API Related */

  endPoint,
  getClientDspApi,
  dspReducerActions,
  dspReducer,
  dspReducerCallTypes,
  dspSagaActions,
  dspSaga,
  /* Components Related */

  ClientDSPViewForm,
  /* Styles */
  styles

};
