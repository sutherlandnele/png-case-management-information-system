import { takeEvery, put, fork, call, all } from "redux-saga/effects";
import { fipReducerActions } from "..";
import { fipReducerCallTypes } from "..";
import { 
  getClientFipApi, 
  getAllFIPsApi,
  createClientFIPApi, 
  updateClientFIPApi, 
  getAllSrmFIPsApi,
  createSrmClientFIPApi,
  updateSrmClientFIPApi,
  getSrmClientFipApi
} from "..";
import { toast } from "react-toastify";

function* onLoadFipsStartAsync() {
  try {
    yield put(
      fipReducerActions.startCall({
        callType: fipReducerCallTypes.list,
      })
    );

    const response = yield call(getAllFIPsApi);

    if (response.status === 200) {
      let totalCount = response.data.length;
      let entities = response.data;
      yield put(
        fipReducerActions.fipsFetched({
          totalCount,
          entities,
        })
      );
    } else {
      let errorMsg = "There was an error retrieving fips information.";
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

function* onCreateFipStartAsync({ payload }) {
  try {
    yield put(
      fipReducerActions.startCall({
        callType: fipReducerCallTypes.action,
      })
    );

    const response = yield call(createClientFIPApi, payload.fip);

    if (response.status === 200) {
      toast.success("Client family inclusion plan created successfully");

      yield call(onLoadFipsStartAsync);
    } else {
      let errorMsg = "There was an error creating client fip information.";

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

function* onUpdateFipStartAsync({ payload }) {
  try {
    yield put(
      fipReducerActions.startCall({
        callType: fipReducerCallTypes.action,
      })
    );

    const response = yield call(updateClientFIPApi, payload.id, payload.fip);

    if (response.status === 200) {
      yield call(onLoadFipsStartAsync);
      toast.success("Client family inclusion plan updated successfully");
    } else {
      let errorMsg = "There was an error updating client fip information.";

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

function* onLoadClientFipStartAsync({payload}) {
  try {
    yield put(
      fipReducerActions.startCall({
        callType: fipReducerCallTypes.list,
      })
    );

    const response = yield call(getClientFipApi,payload.clientId);

    if (response.status === 200) {
      let foundFip = response.data;
      yield put(
        fipReducerActions.fipFetched({
       
          foundFip,
        })
      );
    } else {
      let errorMsg = "There was an error retrieving fip information.";
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



function* onLoadSrmFipsStartAsync({payload}) {
  try {
    yield put(
      fipReducerActions.startCall({
        callType: fipReducerCallTypes.list,
      })
    );

    const response = yield call(getAllSrmFIPsApi,payload.caseWorkerId);

    if (response.status === 200) {
      let totalCount = response.data.length;
      let entities = response.data;
      yield put(
        fipReducerActions.fipsFetched({
          totalCount,
          entities,
        })
      );
    } else {
      let errorMsg = "There was an error retrieving fips information.";
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

function* onCreateSrmFipStartAsync({ payload }) {
  try {
    yield put(
      fipReducerActions.startCall({
        callType: fipReducerCallTypes.action,
      })
    );

    const response = yield call(createSrmClientFIPApi, payload.caseWorkerId, payload.fip);

    if (response.status === 200) {
      toast.success("Client family inclusion plan created successfully");

      yield call(onLoadSrmFipsStartAsync,{payload});
    } else {
      let errorMsg = "There was an error creating client fip information.";

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

function* onUpdateSrmFipStartAsync({ payload }) {
  try {
    yield put(
      fipReducerActions.startCall({
        callType: fipReducerCallTypes.action,
      })
    );

    const response = yield call(updateSrmClientFIPApi, payload.id,payload.caseWorkerId, payload.fip);

    if (response.status === 200) {
      yield call(onLoadSrmFipsStartAsync,{payload});
      toast.success("Client family inclusion plan updated successfully");
    } else {
      let errorMsg = "There was an error updating client fip information.";

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

function* onLoadSrmClientFipStartAsync({payload}) {
  try {
    yield put(
      fipReducerActions.startCall({
        callType: fipReducerCallTypes.list,
      })
    );

    const response = yield call(getSrmClientFipApi,payload.clientId,payload.caseWorkerId);

    if (response.status === 200) {
      let foundFip = response.data;
      yield put(
        fipReducerActions.fipFetched({
       
          foundFip,
        })
      );
    } else {
      let errorMsg = "There was an error retrieving fip information.";
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
    FetchClientFips: "[FetchClientFips] Fetch All Fips API Action",
    FetchClientFip: "[FetchClientFip] Fetch Client Fip API Action",
    CreateClientFip: "[CreateClientFip] Create Client Fip API Action",
    UpdateClientFip: "[UpdateClientFip] Update Client Fip API Action",

    FetchSrmClientFips: "[FetchSrmClientFips] Fetch All Srm Fips API Action",
    FetchSrmClientFip: "[FetchSrmClientFip] Fetch Srm Client Fip API Action",
    CreateSrmClientFip: "[CreateSrmClientFip] Create Srm Client Fip API Action",
    UpdateSrmClientFip: "[UpdateSrmClientFip] Update Srm Client Fip API Action",

};
export const actions = {
    fetchAllFips: () => ({ type: actionTypes.FetchClientFips, payload: { undefined },}),
    fetchClientFip: (clientId) => ({ type: actionTypes.FetchClientFip, payload: { clientId:clientId },}),
    createClientFip: (fip) => ({ type: actionTypes.CreateClientFip,payload: { fip: fip }, }),
    updateClientFip: (id, fip) => ({ type: actionTypes.UpdateClientFip, payload: { id: id, fip: fip },}),

    fetchAllSrmFips: (caseWorkerId) => ({ type: actionTypes.FetchSrmClientFips, payload: { caseWorkerId },}),
    fetchSrmClientFip: (clientId,caseWorkerId) => ({ type: actionTypes.FetchSrmClientFip, payload: { clientId:clientId,caseWorkerId },}),
    createSrmClientFip: (caseWorkerId,fip) => ({ type: actionTypes.CreateSrmClientFip,payload: { caseWorkerId,fip: fip }, }),
    updateSrmClientFip: (id,caseWorkerId, fip) => ({ type: actionTypes.UpdateSrmClientFip, payload: { id: id, caseWorkerId,fip: fip },})    
  };

function* fetchClientFips() {
  yield takeEvery(actionTypes.FetchClientFips,onLoadFipsStartAsync);
}

function* fetchClientFip() {
  yield takeEvery(actionTypes.FetchClientFip,onLoadClientFipStartAsync);
}

function* createClientFip() {
  yield takeEvery(actionTypes.CreateClientFip, onCreateFipStartAsync);
}

function* updateClientFip() {
  yield takeEvery(actionTypes.UpdateClientFip, onUpdateFipStartAsync);
}


function* fetchSrmClientFips() {
  yield takeEvery(actionTypes.FetchSrmClientFips,onLoadSrmFipsStartAsync);
}

function* fetchSrmClientFip() {
  yield takeEvery(actionTypes.FetchSrmClientFip,onLoadSrmClientFipStartAsync);
}

function* createSrmClientFip() {
  yield takeEvery(actionTypes.CreateSrmClientFip, onCreateSrmFipStartAsync);
}

function* updateSrmClientFip() {
  yield takeEvery(actionTypes.UpdateSrmClientFip, onUpdateSrmFipStartAsync);
}

const fSagas = [
    fork(fetchClientFips),
    fork(fetchClientFip),
    fork(createClientFip),
    fork(updateClientFip),
    fork(fetchSrmClientFips),
    fork(fetchSrmClientFip),
    fork(createSrmClientFip),
    fork(updateSrmClientFip)
];

export function* saga() {
  yield all([...fSagas]);
}
