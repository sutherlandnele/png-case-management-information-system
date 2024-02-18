import { takeEvery, put, fork, call, all } from "redux-saga/effects";

import { dashboardReducerActions, 
  dashboardReducerCallTypes, 
  getDashboardTableApi, 
  getSrmDashboardTableApi,
  getDashboardSummaryApi,
  findDashboardTableDataApi,
  findSrmDashboardTableDataApi } from "..";

import { toast } from "react-toastify";


function* onLoadDashboardTableStartAsync() {
  try {
    yield put(
      dashboardReducerActions.startCall({
        callType: dashboardReducerCallTypes.list,
      })
    );

    const response = yield call(getDashboardTableApi);

    if (response.status === 200) {
      let totalCount = response.data.length;
      let entities = response.data;
      yield put(
        dashboardReducerActions.dashboardTableFetched({
          totalCount,
          entities,
        })
      );
    } else {
      let error = "There was an error retrieving dashboard table information.";
      dashboardReducerActions.catchError({error});
    }
  } catch (err) {
    const error = err.response.data;
    yield put(
      dashboardReducerActions.catchError({error}))
  }
}

function* onLoadSrmDashboardTableStartAsync({payload}) {
  try {
    yield put(
      dashboardReducerActions.startCall({
        callType: dashboardReducerCallTypes.list,
      })
    );

    const response = yield call(getSrmDashboardTableApi, payload.caseWorkerId);

    if (response.status === 200) {
      let totalCount = response.data.length;
      let entities = response.data;
      yield put(
        dashboardReducerActions.dashboardTableFetched({
          totalCount,
          entities,
        })
      );
    } else {
      let error = "There was an error retrieving dashboard table information.";
      dashboardReducerActions.catchError({error});
    }
  } catch (err) {
    const error = err.response.data;
    yield put(
      dashboardReducerActions.catchError({error}))
  }
}

function* onLoadDashboardSummaryStartAsync() {
  try {
    yield put(
      dashboardReducerActions.startCall({
        callType: dashboardReducerCallTypes.list,
      })
    );

    const response = yield call(getDashboardSummaryApi);

    if (response.status === 200) {
      let entity = response.data;
      yield put(
        dashboardReducerActions.dashboardSummaryFetched({
          entity
        })
      );
    } else {
      let error = "There was an error retrieving dashboard summary information.";
      dashboardReducerActions.catchError({error});

    }
  } catch (err) {
    const error = err.response.data;
    yield put(
      dashboardReducerActions.catchError({error})
    );

  }
}

function* onFindDashboardTableDataStartAsync({ payload }) {
  try {
    yield put(
      dashboardReducerActions.startCall({ callType: dashboardReducerCallTypes.list })
    );

    const response = yield call(findDashboardTableDataApi, payload.queryParams);

    if (response.status === 200) {
      let totalCount = response.data.length;
      let entities = response.data;
      yield put(dashboardReducerActions.dashboardTableFetched({ totalCount, entities }));
    } else {
      let errorMsg = "There was an error retrieving dashboard table data information.";

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

function* onFindSrmDashboardTableDataStartAsync({ payload }) {
  try {
    yield put(
      dashboardReducerActions.startCall({ callType: dashboardReducerCallTypes.list })
    );

    const response = yield call(findSrmDashboardTableDataApi,payload.caseWorkerId, payload.queryParams);

    if (response.status === 200) {
      let totalCount = response.data.length;
      let entities = response.data;
      yield put(dashboardReducerActions.dashboardTableFetched({ totalCount, entities }));
    } else {
      let errorMsg = "There was an error retrieving dashboard table data information.";

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
  FetchDashboardTable: "[FetchDashboardTable] Fetch Dashboard Table API Action",
  FetchSrmDashboardTable: "[FetchSrmDashboardTable] Fetch SRM Dashboard Table API Action",
  FetchDashboardSummary: "[FetchDashboardSummary] Fetch Dashboard Summary Table API Action",
  FindDashboardTableData: "[FindDashboardTableData] Find Dashboard Table API Action",
  FindSrmDashboardTableData: "[FindSrmDashboardTableData] Find SRM Dashboard Table API Action"
};

export const actions = {
  fetchDashboardTable: () => ({
    type: actionTypes.FetchDashboardTable,
    payload: { undefined },
  }),
  fetchSrmDashboardTable: (caseWorkerId) => ({
    type: actionTypes.FetchSrmDashboardTable,
    payload: { caseWorkerId: caseWorkerId },
  }),
  fetchDashboardSummary: () => ({
    type: actionTypes.FetchDashboardSummary,
    payload: { undefined },
  }),
  findDashboardTableData: (queryParams) => ({
    type: actionTypes.FindDashboardTableData,
    payload: { queryParams: queryParams },
  }),
  findSrmDashboardTableData: (caseWorkerId, queryParams) => ({
    type: actionTypes.FindSrmDashboardTableData,
    payload: {caseWorkerId:caseWorkerId, queryParams: queryParams },
  }),
};

function* fetchDashboardTable() {
  yield takeEvery(
    actionTypes.FetchDashboardTable,
    onLoadDashboardTableStartAsync
  );
}

function* fetchSrmDashboardTable() {
  yield takeEvery(
    actionTypes.FetchSrmDashboardTable,
    onLoadSrmDashboardTableStartAsync
  );
}


function* fetchDashboardSummary() {
  yield takeEvery(
    actionTypes.FetchDashboardSummary,
    onLoadDashboardSummaryStartAsync
  );
}

function* findDashboardTableData() {
  yield takeEvery(
    actionTypes.FindDashboardTableData,
    onFindDashboardTableDataStartAsync
  );
}

function* findSrmDashboardTableData() {
  yield takeEvery(
    actionTypes.FindSrmDashboardTableData,
    onFindSrmDashboardTableDataStartAsync
  );
}

const fSagas = [
  
  fork(fetchDashboardTable),   
  fork(fetchSrmDashboardTable),   
  fork(fetchDashboardSummary),
  fork(findDashboardTableData),
  fork(findSrmDashboardTableData)
];

export function* saga() {
  yield all([...fSagas]);
}
