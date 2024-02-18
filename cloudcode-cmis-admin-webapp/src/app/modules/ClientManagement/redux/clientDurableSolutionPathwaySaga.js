import { takeEvery, put, fork, call, all } from "redux-saga/effects";
import { dspReducerActions } from "..";
import { dspReducerCallTypes } from "..";
import { 
  getAllDSPsApi,
  getClientDspApi, 
  createClientDSPApi, 
  updateClientDSPApi,
  getAllSrmDSPsApi,
  createSrmClientDSPApi,
  updateSrmClientDSPApi,
  getSrmClientDspApi
} from "..";
import { toast } from "react-toastify";

function* onLoadDspsStartAsync() {
  try {
    yield put(
      dspReducerActions.startCall({
        callType: dspReducerCallTypes.list,
      })
    );

    const response = yield call(getAllDSPsApi);

    if (response.status === 200) {
      let totalCount = response.data.length;
      let entities = response.data;
      yield put(
        dspReducerActions.dspsFetched({
          totalCount,
          entities,
        })
      );
    } else {
      let errorMsg = "There was an error retrieving dsps information.";
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

function* onLoadSrmDspsStartAsync({payload}) {
  try {
    yield put(
      dspReducerActions.startCall({
        callType: dspReducerCallTypes.list,
      })
    );

    const response = yield call(getAllSrmDSPsApi,payload.caseWorkerId);

    if (response.status === 200) {
      let totalCount = response.data.length;
      let entities = response.data;
      yield put(
        dspReducerActions.dspsFetched({
          totalCount,
          entities,
        })
      );
    } else {
      let errorMsg = "There was an error retrieving dsps information.";
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

function* onLoadClientDspStartAsync({payload}) {
  try {
    yield put(
      dspReducerActions.startCall({
        callType: dspReducerCallTypes.action,
      })
    );

    const response = yield call(getClientDspApi, payload.clientId);

    if (response.status === 200) {
      let foundDsp = response.data;
      //console.log(foundDsp);
      yield put(
        dspReducerActions.dspFetched({
          foundDsp
        })
      );
    } else {
      let errorMsg = "There was an error retrieving dsp information.";
      toast.error(errorMsg);
    }
  } catch (error) {
    if (error.message) {
      toast.error(error.message);
      //console.log(error.message);

    } else {
      toast.error(error.response.data);
      //console.log(error.response.data);

    }
  }
}

function* onLoadSrmClientDspStartAsync({payload}) {
  try {
    yield put(
      dspReducerActions.startCall({
        callType: dspReducerCallTypes.action,
      })
    );

    const response = yield call(getSrmClientDspApi, payload.clientId, payload.caseWorkerId);

    if (response.status === 200) {
      let foundDsp = response.data;
      //console.log(foundDsp);
      yield put(
        dspReducerActions.dspFetched({
          foundDsp
        })
      );
    } else {
      let errorMsg = "There was an error retrieving dsp information.";
      toast.error(errorMsg);
    }
  } catch (error) {
    if (error.message) {
      toast.error(error.message);
      //console.log(error.message);

    } else {
      toast.error(error.response.data);
      //console.log(error.response.data);

    }
  }
}


function* onCreateDspStartAsync({ payload }) {
  try {
    yield put(
      dspReducerActions.startCall({
        callType: dspReducerCallTypes.action,
      })
    );

    const response = yield call(createClientDSPApi, payload.dsp);

    if (response.status === 200) {
      toast.success("Client durable solution pathway created successfully");

      yield call(onLoadDspsStartAsync);
    } else {
      let errorMsg = "There was an error creating client dsp information.";

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

function* onCreateSrmDspStartAsync({ payload }) {
  try {
    yield put(
      dspReducerActions.startCall({
        callType: dspReducerCallTypes.action,
      })
    );

    const response = yield call(createSrmClientDSPApi,payload.caseWorkerId, payload.dsp);

    if (response.status === 200) {
      toast.success("Client durable solution pathway created successfully");

      yield call(onLoadSrmDspsStartAsync,{payload});
    } else {
      let errorMsg = "There was an error creating client dsp information.";

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


function* onUpdateDspStartAsync({ payload }) {
  try {
    yield put(
      dspReducerActions.startCall({
        callType: dspReducerCallTypes.action,
      })
    );

    const response = yield call(updateClientDSPApi, payload.id, payload.dsp);

    if (response.status === 200) {
      yield call(onLoadDspsStartAsync);
      toast.success("Client durable solution pathway updated successfully");
    } else {
      let errorMsg = "There was an error updating client dsp information.";

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

function* onUpdateSrmDspStartAsync({ payload }) {
  try {
    yield put(
      dspReducerActions.startCall({
        callType: dspReducerCallTypes.action,
      })
    );

    const response = yield call(updateSrmClientDSPApi, payload.id, payload.caseWorkerId, payload.dsp);

    if (response.status === 200) {
      yield call(onLoadSrmDspsStartAsync,{payload});
      toast.success("Client durable solution pathway updated successfully");
    } else {
      let errorMsg = "There was an error updating client dsp information.";

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
    FetchClientDsps: "[FetchClientDsps] Fetch All Dsps API Action",
    FetchClientDsp: "[FetchClientDsp] Fetch All Dsp API Action",
    CreateClientDsp: "[CreateClientDsp] Create Client Dsp API Action",
    UpdateClientDsp: "[UpdateClientDsp] Update Client Dsp API Action",
    FetchSrmClientDsps: "[FetchSrmClientDsps] Fetch All Srm Dsps API Action",
    FetchSrmClientDsp: "[FetchSrmClientDsp] Fetch All Srm Dsp API Action",
    CreateSrmClientDsp: "[CreateSrmClientDsp] Create Srm Client Dsp API Action",
    UpdateSrmClientDsp: "[UpdateSrmClientDsp] Update Srm Client Dsp API Action"
};

export const actions = {
    fetchAllDsps: () => ({ type: actionTypes.FetchClientDsps, payload: { undefined },}),
    fetchClientDsp: (clientId) => ({ type: actionTypes.FetchClientDsp, payload: { clientId },}),
    createClientDsp: (dsp) => ({ type: actionTypes.CreateClientDsp,payload: { dsp: dsp }, }),
    updateClientDsp: (id, dsp) => ({ type: actionTypes.UpdateClientDsp, payload: { id: id, dsp: dsp },}),
    fetchSrmAllDsps: (caseWorkerId) => ({ type: actionTypes.FetchSrmClientDsps, payload: { caseWorkerId },}),
    fetchSrmClientDsp: (clientId, caseWorkerId) => ({ type: actionTypes.FetchSrmClientDsp, payload: { clientId,caseWorkerId },}),
    createSrmClientDsp: (caseWorkerId,dsp) => ({ type: actionTypes.CreateSrmClientDsp,payload: { caseWorkerId,dsp: dsp }, }),
    updateSrmClientDsp: (id,caseWorkerId, dsp) => ({ type: actionTypes.UpdateSrmClientDsp, payload: { id: id,caseWorkerId, dsp: dsp },})    
};

function* fetchClientDsps() {
  yield takeEvery(actionTypes.FetchClientDsps,onLoadDspsStartAsync);
}


function* fetchSrmClientDsps() {
  yield takeEvery(actionTypes.FetchSrmClientDsps,onLoadSrmDspsStartAsync);
}

function* fetchClientDsp() {
  yield takeEvery(actionTypes.FetchClientDsp,onLoadClientDspStartAsync);
}


function* fetchSrmClientDsp() {
  yield takeEvery(actionTypes.FetchSrmClientDsp,onLoadSrmClientDspStartAsync);
}


function* createClientDsp() {
  yield takeEvery(actionTypes.CreateClientDsp, onCreateDspStartAsync);
}


function* createSrmClientDsp() {
  yield takeEvery(actionTypes.CreateSrmClientDsp, onCreateSrmDspStartAsync);
}


function* updateClientDsp() {
  yield takeEvery(actionTypes.UpdateClientDsp, onUpdateDspStartAsync);
}


function* updateSrmClientDsp() {
  yield takeEvery(actionTypes.UpdateSrmClientDsp, onUpdateSrmDspStartAsync);
}

const fSagas = [
    fork(fetchClientDsps),
    fork(fetchClientDsp),
    fork(createClientDsp),
    fork(updateClientDsp),
    fork(fetchSrmClientDsps),
    fork(fetchSrmClientDsp),
    fork(createSrmClientDsp),
    fork(updateSrmClientDsp)
];

export function* saga() {
  yield all([...fSagas]);
}
