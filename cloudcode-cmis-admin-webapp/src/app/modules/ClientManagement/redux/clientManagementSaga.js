import { takeEvery, put, fork, call, all } from "redux-saga/effects";
import { clientReducerActions } from "..";
import { clientReducerCallTypes } from "..";
import {
  getAllClientsApi,
  findClientsApi,
  createClientApi,
  updateClientApi,
  getClientApi,
  getAllSrmClientsApi, 
  findSrmClientsApi ,
  updateSrmClientApi,
  getSrmClientApi
} from "..";

import { toast } from "react-toastify";

function* onLoadClientStartAsync({ payload }) {
  try {
    yield put(
      clientReducerActions.startCall({
        callType: clientReducerCallTypes.action,
      })
    );

    const response = yield call(getClientApi, payload.id);

    if (response.status === 200) {
      let foundClient = response.data;
      yield put(clientReducerActions.clientFetched({ foundClient }));
    } else {
      toast.error("There was an error retrieving client information");
    }
  } catch (error) {
    if (error.message) {
      toast.error(error.message);
    } else {
      toast.error(error.response.data);
    }
  }
}


function* onLoadSrmClientStartAsync({ payload }) {
  try {
    yield put(
      clientReducerActions.startCall({
        callType: clientReducerCallTypes.action,
      })
    );

    const response = yield call(getSrmClientApi, payload.id, payload.caseWorkerId);

    if (response.status === 200) {
      let foundClient = response.data;
      yield put(clientReducerActions.clientFetched({ foundClient }));
    } else {
      toast.error("There was an error retrieving client information");
    }
  } catch (error) {
    if (error.message) {
      toast.error(error.message);
    } else {
      toast.error(error.response.data);
    }
  }
}


function* onLoadClientsStartAsync() {
  try {
    yield put(
      clientReducerActions.startCall({ callType: clientReducerCallTypes.list })
    );

    const response = yield call(getAllClientsApi);

    if (response.status === 200) {
      let totalCount = response.data.length;
      let entities = response.data;
      yield put(clientReducerActions.clientsFetched({ totalCount, entities }));
    } else {
      toast.error("There was an error retrieving clients information");
    }
  } catch (error) {
    toast.error(error.response.data);
  }
}


function* onLoadSrmClientsStartAsync({payload}) {
  try {
    yield put(
      clientReducerActions.startCall({ callType: clientReducerCallTypes.list })
    );

    const response = yield call(getAllSrmClientsApi, payload.caseWorkerId);

    if (response.status === 200) {
      let totalCount = response.data.length;
      let entities = response.data;
      yield put(clientReducerActions.clientsFetched({ totalCount, entities }));
    } else {
      toast.error("There was an error retrieving clients information");
    }
  } catch (error) {
    toast.error(error.response.data);
  }
}


function* onFindClientsStartAsync({ payload }) {
  try {
    yield put(
      clientReducerActions.startCall({ callType: clientReducerCallTypes.list })
    );

    const response = yield call(findClientsApi, payload.queryParams);

    if (response.status === 200) {
      let totalCount = response.data.length;
      let entities = response.data;
      yield put(clientReducerActions.clientsFetched({ totalCount, entities }));
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

function* onFindSrmClientsStartAsync({ payload }) {
  try {
    yield put(
      clientReducerActions.startCall({ callType: clientReducerCallTypes.list })
    );

    const response = yield call(findSrmClientsApi, payload.caseWorkerId, payload.queryParams);

    if (response.status === 200) {
      let totalCount = response.data.length;
      let entities = response.data;
      yield put(clientReducerActions.clientsFetched({ totalCount, entities }));
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


function* onCreateClientStartAsync({ payload }) {
  try {
    yield put(
      clientReducerActions.startCall({
        callType: clientReducerCallTypes.action,
      })
    );

    const response = yield call(createClientApi, payload.client);

    if (response.status === 200) {
      toast.success("Client created successfully");

      yield call(onLoadClientsStartAsync);
    } else {
      let errorMsg = "There was an error creating client information.";

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

function* onUpdateClientStartAsync({ payload }) {
  try {
    yield put(
      clientReducerActions.startCall({
        callType: clientReducerCallTypes.action,
      })
    );

    const response = yield call(updateClientApi, payload.id, payload.client);

    if (response.status === 200) {
      yield call(onLoadClientsStartAsync);
      toast.success("Client updated successfully");
    } else {
      let errorMsg = "There was an error updating client information.";

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

function* onUpdateSrmClientStartAsync({ payload }) {
  try {
    yield put(
      clientReducerActions.startCall({
        callType: clientReducerCallTypes.action,
      })
    );

    const response = yield call(updateSrmClientApi, payload.id,payload.caseWorkerId, payload.client);

    if (response.status === 200) {
      yield call(onLoadSrmClientsStartAsync,{payload});
      toast.success("Client updated successfully");
    } else {
      let errorMsg = "There was an error updating client information.";

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
  FetchClients: "[FetchClients] Fetch Clients API Action",
  FindClients: "[FindClients] Find Clients API Action",
  CreateClient: "[CreateClient] Create Client API Action",
  UpdateClient: "[UpdateClient] Update Client API Action",
  FetchClient: "[FetchClient] Fetch Client API Action",
  FetchSrmClients: "[FetchSrmClients] Fetch SRM Clients API Action",
  FindSrmClients: "[FindSrmClients] Find SRM Clients API Action",
  UpdateSrmClient: "[UpdateSrmClient] Update SRM Client API Action",
  FetchSrmClient: "[FetchSrmClient] Fetch SRM Client API Action"
};

export const actions = {
  fetchClients: () => ({
    type: actionTypes.FetchClients,
    payload: { undefined },
  }),
  fetchSrmClients: (caseWorkerId) => ({
    type: actionTypes.FetchSrmClients,
    payload: { caseWorkerId: caseWorkerId },
  }),  
  fetchClient: (id) => ({
    type: actionTypes.FetchClient,
    payload: { id: id },
  }),
  fetchSrmClient: (id, caseWorkerId) => ({
    type: actionTypes.FetchSrmClient,
    payload: { id: id, caseWorkerId: caseWorkerId },
  }),
  findClients: (queryParams) => ({
    type: actionTypes.FindClients,
    payload: { queryParams: queryParams },
  })
  ,
  findSrmClients: (caseWorkerId, queryParams) => ({
    type: actionTypes.FindSrmClients,
    payload: { queryParams: queryParams, caseWorkerId: caseWorkerId },
  }),
  createClient: (client) => ({
    type: actionTypes.CreateClient,
    payload: { client: client },
  }),
  updateClient: (id, client) => ({
    type: actionTypes.UpdateClient,
    payload: { id: id, client: client },
  }),
  updateSrmClient: (id, caseWorkerId, client) => ({
    type: actionTypes.UpdateSrmClient,
    payload: { id: id, client: client, caseWorkerId: caseWorkerId },
  }),
};
function* fetchClients() {
  yield takeEvery(actionTypes.FetchClients, onLoadClientsStartAsync);
}

function* fetchSrmClients() {
  yield takeEvery(actionTypes.FetchSrmClients, onLoadSrmClientsStartAsync);
}

function* findClients() {
  yield takeEvery(actionTypes.FindClients, onFindClientsStartAsync);
}

function* findSrmClients() {
  yield takeEvery(actionTypes.FindSrmClients, onFindSrmClientsStartAsync);
}


function* createClient() {
  yield takeEvery(actionTypes.CreateClient, onCreateClientStartAsync);
}

function* updateClient() {
  yield takeEvery(actionTypes.UpdateClient, onUpdateClientStartAsync);
}
function* updateSrmClient() {
  yield takeEvery(actionTypes.UpdateSrmClient, onUpdateSrmClientStartAsync);
}
function* fetchClient() {
  yield takeEvery(actionTypes.FetchClient, onLoadClientStartAsync);
}

function* fetchSrmClient() {
  yield takeEvery(actionTypes.FetchSrmClient, onLoadSrmClientStartAsync);
}

const fSagas = [
  fork(fetchClients),
  fork(findClients),
  fork(createClient),
  fork(updateClient),
  fork(fetchClient),

  fork(fetchSrmClients),
  fork(findSrmClients),
  fork(updateSrmClient),
  fork(fetchSrmClient),

];
export function* saga() {
  yield all([...fSagas]);
}
