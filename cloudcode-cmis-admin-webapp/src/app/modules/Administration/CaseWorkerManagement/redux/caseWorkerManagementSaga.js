import { takeEvery, put, fork, call, all } from "redux-saga/effects";
import {
  getClientCaseWorkerApi,
  caseWorkerReducerCallTypes,
  caseWorkerReducerActions,
  findCaseWorkersApi,
  getAllCaseWorkersApi,
  createCaseWorkerApi,
  updateCaseWorkerApi,
  getSrmClientCaseWorkerApi
} from "..";
import { toast } from "react-toastify";

function* onLoadCaseWorkersStartAsync() {
  try {
    yield put(
      caseWorkerReducerActions.startCall({
        callType: caseWorkerReducerCallTypes.list,
      })
    );

    const response = yield call(getAllCaseWorkersApi);

    if (response.status === 200) {
      let totalCount = response.data.length;
      let entities = response.data;
      yield put(
        caseWorkerReducerActions.caseWorkersFetched({ totalCount, entities })
      );
    } else {
      let errorMsg = "There was an error retrieving case workers information.";
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

function* onLoadClientCaseWorkerStartAsync({ payload }) {
  try {
    if (!!payload.clientId) {
      yield put(
        caseWorkerReducerActions.startCall({
          callType: caseWorkerReducerCallTypes.list,
        })
      );

      const response = yield call(getClientCaseWorkerApi, payload.clientId);

      if (response.status === 200) {
        let foundCaseWorker = response.data;
        yield put(
          caseWorkerReducerActions.caseWorkerFetched({ foundCaseWorker })
        );
      } else {
        let errorMsg = "There was an error retrieving case worker information.";
        toast.error(errorMsg);
      }
    }
  } catch (error) {
    if (error.message) {
      toast.error(error.message);
    } else {
      toast.error(error.response.data);
    }
  }
}


function* onLoadSrmClientCaseWorkerStartAsync({ payload }) {
  try {
    if (!!payload.clientId) {
      yield put(
        caseWorkerReducerActions.startCall({
          callType: caseWorkerReducerCallTypes.list,
        })
      );

      const response = yield call(getSrmClientCaseWorkerApi, payload.clientId, payload.caseWorkerId);

      if (response.status === 200) {
        let foundCaseWorker = response.data;
        yield put(
          caseWorkerReducerActions.caseWorkerFetched({ foundCaseWorker })
        );
      } else {
        let errorMsg = "There was an error retrieving case worker information.";
        toast.error(errorMsg);
      }
    }
  } catch (error) {
    if (error.message) {
      toast.error(error.message);
    } else {
      toast.error(error.response.data);
    }
  }
}

function* onCreateCaseWorkerStartAsync({ payload }) {
  try {
    yield put(
      caseWorkerReducerActions.startCall({
        callType: caseWorkerReducerCallTypes.action,
      })
    );

    const response = yield call(createCaseWorkerApi, payload.caseWorker);

    if (response.status === 200) {
      toast.success("Case worker created successfully");

      yield call(onLoadCaseWorkersStartAsync);
    } else {
      let errorMsg = "There was an error creating case worker information.";

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

function* onUpdateCaseWorkerStartAsync({ payload }) {
  try {
    yield put(
      caseWorkerReducerActions.startCall({
        callType: caseWorkerReducerCallTypes.action,
      })
    );

    const response = yield call(
      updateCaseWorkerApi,
      payload.id,
      payload.caseWorker
    );

    if (response.status === 200) {
      yield call(onLoadCaseWorkersStartAsync);
      toast.success("Case worker updated successfully");
    } else {
      let errorMsg = "There was an error updating case worker information.";

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

function* onFindCaseWorkersStartAsync({ payload }) {
  try {
    yield put(
      caseWorkerReducerActions.startCall({
        callType: caseWorkerReducerCallTypes.list,
      })
    );

    const response = yield call(findCaseWorkersApi, payload.queryParams);

    if (response.status === 200) {
      let totalCount = response.data.length;
      let entities = response.data;
      yield put(
        caseWorkerReducerActions.caseWorkersFetched({ totalCount, entities })
      );
    } else {
      let errorMsg = "There was an error finding case worker information.";

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
  FetchCaseWorkers: "[FetchCaseWorkers] Fetch Case Workers API Action",
  FetchCaseWorker: "[FetchCaseWorker] Fetch Client Case Worker API Action",
  FetchSrmCaseWorker: "[FetchSrmCaseWorker] Fetch Srm Client Case Worker API Action",
  FindCaseWorkers: "[FindCaseWorkers] Find Case Workers API Action",
  UpdateCaseWorker: "[UpdateCaseWorker] Update Case Worker API Action",
  CreateCaseWorker: "[CreateCaseWorker] Create Case Worker API Action",
};
export const actions = {
  fetchCaseWorkers: () => ({
    type: actionTypes.FetchCaseWorkers,
    payload: { undefined },
  }),
  fetchCaseWorker: (clientId) => ({
    type: actionTypes.FetchCaseWorker,
    payload: { clientId: clientId },
  }),
  fetchSrmCaseWorker: (clientId, caseWorkerId) => ({
    type: actionTypes.FetchSrmCaseWorker,
    payload: { clientId: clientId, caseWorkerId},
  }),
  findCaseWorkers: (queryParams) => ({
    type: actionTypes.FindCaseWorkers,
    payload: { queryParams: queryParams },
  }),
  createCaseWorker: (caseWorker) => ({
    type: actionTypes.CreateCaseWorker,
    payload: { caseWorker: caseWorker },
  }),
  updateCaseWorker: (id, caseWorker) => ({
    type: actionTypes.UpdateCaseWorker,
    payload: { id: id, caseWorker: caseWorker },
  }),
};
function* fetchCaseWorkers() {
  yield takeEvery(actionTypes.FetchCaseWorkers, onLoadCaseWorkersStartAsync);
}

function* fetchCaseWorker() {
  yield takeEvery(
    actionTypes.FetchCaseWorker,
    onLoadClientCaseWorkerStartAsync
  );
}

function* fetchSrmCaseWorker() {
  yield takeEvery(
    actionTypes.FetchSrmCaseWorker,
    onLoadSrmClientCaseWorkerStartAsync
  );
}

function* findCaseWorkers() {
  yield takeEvery(actionTypes.FindCaseWorkers, onFindCaseWorkersStartAsync);
}

function* createCaseWorker() {
  yield takeEvery(actionTypes.CreateCaseWorker, onCreateCaseWorkerStartAsync);
}

function* updateCaseWorker() {
  yield takeEvery(actionTypes.UpdateCaseWorker, onUpdateCaseWorkerStartAsync);
}
const fSagas = [
  fork(fetchCaseWorkers),
  fork(fetchCaseWorker),
  fork(fetchSrmCaseWorker),
  fork(createCaseWorker),
  fork(updateCaseWorker),
  fork(findCaseWorkers),
];
export function* saga() {
  yield all([...fSagas]);
}
