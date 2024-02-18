import { takeEvery, put, fork, call, all } from "redux-saga/effects";
import { clientEngagementReducerActions } from "..";
import { clientEngagementReducerCallTypes } from "..";
import { 
  getAllClientEngagementsApi, 
  getEngagementByIdApi,
  findROEsApi,
  findClientROEsApi,
  getAllEngagementsApi, 
  createClientEngagementApi, 
  updateClientEngagementApi,
  getAllSrmEngagementsApi, 
  getSrmEngagementByIdApi, 
  getAllSrmClientEngagementsApi,
  createSrmClientEngagementApi, 
  findSrmROEsApi, 
  findSrmClientROEsApi
} 
from "..";
import { toast } from "react-toastify";


function* onLoadEngagementByIdStartAsync({ payload }) {
  try {
    yield put(
      clientEngagementReducerActions.startCall({
        callType: clientEngagementReducerCallTypes.action,
      })
    );

    const response = yield call(getEngagementByIdApi, payload.id);

    if (response.status === 200) {
      let foundEngagement = response.data;
      yield put(
        clientEngagementReducerActions.engagementFetched({
          foundEngagement
        })
      );
    } else {
      let errorMsg = "There was an error retrieving engagement information.";

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

function* onLoadSrmEngagementByIdStartAsync({ payload }) {
  try {
    yield put(
      clientEngagementReducerActions.startCall({
        callType: clientEngagementReducerCallTypes.action,
      })
    );

    const response = yield call(getSrmEngagementByIdApi, payload.id, payload.caseWorkerId);

    if (response.status === 200) {
      let foundEngagement = response.data;
      yield put(
        clientEngagementReducerActions.engagementFetched({
          foundEngagement
        })
      );
    } else {
      let errorMsg = "There was an error retrieving engagement information.";

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

function* onLoadSrmClientEngagementsStartAsync({ payload }) {
  try {
    yield put(
      clientEngagementReducerActions.startCall({
        callType: clientEngagementReducerCallTypes.list,
      })
    );

    const response = yield call(getAllSrmClientEngagementsApi, payload.clientId, payload.caseWorkerId);

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

function* onFindRoesStartAsync({ payload }) {
  try {
    yield put(
      clientEngagementReducerActions.startCall({ callType: clientEngagementReducerCallTypes.list })
    );

    const response = yield call(findROEsApi, payload.queryParams);

    if (response.status === 200) {
      let totalCount = response.data.length;
      let entities = response.data;
      yield put(clientEngagementReducerActions.engagementsFetched({ totalCount, entities }));
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

function* onFindSrmRoesStartAsync({ payload }) {
  try {
    yield put(
      clientEngagementReducerActions.startCall({ callType: clientEngagementReducerCallTypes.list })
    );

    const response = yield call(findSrmROEsApi,payload.caseWorkerId, payload.queryParams);

    if (response.status === 200) {
      let totalCount = response.data.length;
      let entities = response.data;
      yield put(clientEngagementReducerActions.engagementsFetched({ totalCount, entities }));
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

function* onFindClientRoesStartAsync({ payload }) {
  try {
    yield put(
      clientEngagementReducerActions.startCall({ callType: clientEngagementReducerCallTypes.list })
    );

    const response = yield call(findClientROEsApi, payload.clientId, payload.queryParams);

    if (response.status === 200) {
      let totalCount = response.data.length;
      let entities = response.data;
      yield put(clientEngagementReducerActions.engagementsFetched({ totalCount, entities }));
    } else {
      let errorMsg = "There was an error retrieving engagements information.";

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

function* onFindSrmClientRoesStartAsync({ payload }) {
  try {
    yield put(
      clientEngagementReducerActions.startCall({ callType: clientEngagementReducerCallTypes.list })
    );

    const response = yield call(findSrmClientROEsApi, payload.clientId, payload.caseWorkerId, payload.queryParams);

    if (response.status === 200) {
      let totalCount = response.data.length;
      let entities = response.data;
      yield put(clientEngagementReducerActions.engagementsFetched({ totalCount, entities }));
    } else {
      let errorMsg = "There was an error retrieving engagements information.";

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

function* onLoadAllEngagementsStartAsync() {
  try {
    yield put(
      clientEngagementReducerActions.startCall({
        callType: clientEngagementReducerCallTypes.list,
      })
    );

    const response = yield call(getAllEngagementsApi);

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

function* onLoadAllSrmEngagementsStartAsync({payload}) {
  try {
    yield put(
      clientEngagementReducerActions.startCall({
        callType: clientEngagementReducerCallTypes.list,
      })
    );

    const response = yield call(getAllSrmEngagementsApi, payload.caseWorkerId);

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

function* onCreateEngagementStartAsync({ payload }) {
  try {
    yield put(
      clientEngagementReducerActions.startCall({
        callType: clientEngagementReducerCallTypes.action,
      })
    );

    const response = yield call(createClientEngagementApi, payload.engagement);

    if (response.status === 200) {
      toast.success("Client engagement created successfully");

      yield call(onLoadAllEngagementsStartAsync);
    } else {
      let errorMsg = "There was an error creating client engagement information.";

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

function* onCreateSrmEngagementStartAsync({ payload }) {
  try {
    yield put(
      clientEngagementReducerActions.startCall({
        callType: clientEngagementReducerCallTypes.action,
      })
    );

    const response = yield call(createSrmClientEngagementApi, payload.caseWorkerId, payload.engagement);

    if (response.status === 200) {
      toast.success("Client engagement created successfully");

      yield call(onLoadAllSrmEngagementsStartAsync,{payload});
    } else {
      let errorMsg = "There was an error creating client engagement information.";

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

function* onUpdateEngagementStartAsync({ payload }) {
  try {
    yield put(
      clientEngagementReducerActions.startCall({
        callType: clientEngagementReducerCallTypes.action,
      })
    );

    const response = yield call(updateClientEngagementApi, payload.id, payload.engagement);

    if (response.status === 200) {
      yield call(onLoadAllEngagementsStartAsync);
      toast.success("Client engagement updated successfully");
    } else {
      let errorMsg = "There was an error updating client engagement information.";

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
    FetchEngagementById: "[FetchEngagementById] Fetch Client Engagements API Action",
    FindClientEngagements: "[FindClientEngagements] Find Client Engagements API Action",
    FindClientEngagementsByClientId: "[FindClientEngagementsByClientId] Find Client Engagements By Client API Action",
    FetchAllEngagements: "[FetchAllEngagements] Fetch All Engagements API Action",
    CreateClientEngagement: "[CreateClientEngagement] Create Client Engagement API Action",
    UpdateClientEngagement: "[UpdateClientEngagement] Update Client Engagement API Action",
    FetchSrmClientEngagements: "[FetchSrmClientEngagements] Fetch Srm Client Engagements API Action",
    FetchSrmEngagementById: "[FetchSrmEngagementById] Fetch Srm Engagements API Action",
    FindSrmClientEngagements: "[FindSrmClientEngagements] Find Srm Client Engagements API Action",
    FindSrmClientEngagementsByClientId: "[FindSrmClientEngagementsByClientId] Find Srm Client Engagements By Client API Action",
    FetchAllSrmEngagements: "[FetchAllSrmEngagements] Fetch All Srm Engagements API Action",
    CreateSrmClientEngagement: "[CreateSrmClientEngagement] Create Srm Client Engagement API Action",
};
export const actions = {
    fetchAllEngagements: () => ({ type: actionTypes.FetchAllEngagements, payload: { undefined },}),
    fetchAllSrmEngagements: (caseWorkerId) => ({ type: actionTypes.FetchAllSrmEngagements, payload: { caseWorkerId: caseWorkerId },}),

    fetchEngagementById: (id) => ({ type: actionTypes.FetchEngagementById, payload: { id },}),
    fetchSrmEngagementById: (id, caseWorkerId) => ({ type: actionTypes.FetchSrmEngagementById, payload: { id, caseWorkerId: caseWorkerId },}),

    findEngagements: (queryParams) => ({ type: actionTypes.FindClientEngagements, payload: { queryParams },}),
    findSrmEngagements: (caseWorkerId, queryParams) => ({ type: actionTypes.FindSrmClientEngagements, payload: { queryParams, caseWorkerId: caseWorkerId },}),

    findEngagementsByClientId: (clientId, queryParams) => ({ type: actionTypes.FindClientEngagementsByClientId, payload: { clientId, queryParams },}),
    findSrmEngagementsByClientId: (clientId, caseWorkerId, queryParams) => ({ type: actionTypes.FindSrmClientEngagementsByClientId, payload: { clientId,caseWorkerId, queryParams },}),
            
    fetchClientEngagements: (clientId) => ({ type: actionTypes.FetchClientEngagements, payload: { clientId: clientId },}),
    fetchSrmClientEngagements: (clientId, caseWorkerId) => ({ type: actionTypes.FetchSrmClientEngagements, payload: { clientId: clientId,caseWorkerId },}),
    
    createSrmClientEngagement: (caseWorkerId, engagement) => ({ type: actionTypes.CreateSrmClientEngagement,payload: { caseWorkerId, engagement: engagement }, }),

    createClientEngagement: (engagement) => ({ type: actionTypes.CreateClientEngagement,payload: { engagement: engagement }, }),
    updateClientEngagement: (id, engagement) => ({ type: actionTypes.UpdateClientEngagement, payload: { id: id, engagement: engagement },})
  };

function* fetchClientEngagements() {
  yield takeEvery(actionTypes.FetchClientEngagements,onLoadClientEngagementsStartAsync);
}

function* fetchSrmClientEngagements() {
  yield takeEvery(actionTypes.FetchSrmClientEngagements,onLoadSrmClientEngagementsStartAsync);
}

function* fetchEngagementById() {
  yield takeEvery(actionTypes.FetchEngagementById,onLoadEngagementByIdStartAsync);
}

function* fetchSrmEngagementById() {
  yield takeEvery(actionTypes.FetchSrmEngagementById,onLoadSrmEngagementByIdStartAsync);
}

function* findEngagementsByClientId() {
  yield takeEvery(actionTypes.FindClientEngagementsByClientId,onFindClientRoesStartAsync);
}

function* findSrmEngagementsByClientId() {
  yield takeEvery(actionTypes.FindSrmClientEngagementsByClientId,onFindSrmClientRoesStartAsync);
}

function* findClientEngagements() {
  yield takeEvery(actionTypes.FindClientEngagements,onFindRoesStartAsync);
}

function* findSrmClientEngagements() {
  yield takeEvery(actionTypes.FindSrmClientEngagements,onFindSrmRoesStartAsync);
}

function* fetchAllEngagements() {
    yield takeEvery(actionTypes.FetchAllEngagements,onLoadAllEngagementsStartAsync);
}
function* fetchAllSrmEngagements() {
  yield takeEvery(actionTypes.FetchAllSrmEngagements,onLoadAllSrmEngagementsStartAsync);
}
function* createClientEngagement() {
  yield takeEvery(actionTypes.CreateClientEngagement, onCreateEngagementStartAsync);
}
function* createSrmClientEngagement() {
  yield takeEvery(actionTypes.CreateSrmClientEngagement, onCreateSrmEngagementStartAsync);
}


function* updateClientEngagement() {
  yield takeEvery(actionTypes.UpdateClientEngagement, onUpdateEngagementStartAsync);
}

const fSagas = [
    fork(fetchClientEngagements),
    fork(fetchEngagementById),
    fork(fetchAllEngagements),
    fork(createClientEngagement),
    fork(updateClientEngagement),
    fork(findClientEngagements),
    fork(findEngagementsByClientId),    
    fork(fetchSrmClientEngagements),
    fork(fetchSrmEngagementById),
    fork(fetchAllSrmEngagements),
    fork(createSrmClientEngagement),
    fork(findSrmClientEngagements),
    fork(findSrmEngagementsByClientId)
];

export function* saga() {
  yield all([...fSagas]);
}
