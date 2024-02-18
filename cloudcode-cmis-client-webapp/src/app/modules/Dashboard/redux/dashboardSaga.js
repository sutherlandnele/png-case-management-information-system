import { takeEvery, put, fork, call, all } from "redux-saga/effects";
import { dashboardReducerActions } from "..";
import { dashboardReducerCallTypes } from "..";
import { getDashboardTableApi, getDashboardSummaryApi,findDashboardTableDataApi } from "..";
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
      let errorMsg =
        "There was an error retrieving dashboard table information.";
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
function* onLoadDashboardSummaryStartAsync() {
  try {
    yield put(
      dashboardReducerActions.startCall({
        callType: dashboardReducerCallTypes.list,
      })
    );

    const response = yield call(getDashboardSummaryApi);

    if (response.status === 200) {
      let totalCount = response.data.length;
      let entities = response.data;
      yield put(
        dashboardReducerActions.dashboardSummaryFetched({
          totalCount,
          entities,
        })
      );
    } else {
      let errorMsg =
        "There was an error retrieving dashboard summary information.";
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


const actionTypes = {
  FetchDashboardTable: "[FetchDashboardTable] Fetch Dashboard Table API Action",
  FetchDashboardSummary: "[FetchDashboardSummary] Fetch Dashboard Summary Table API Action",
  FindDashboardTableData: "[FindDashboardTableData] Find Dashboard Table API Action"

};
export const actions = {
  fetchDashboardTable: () => ({
    type: actionTypes.FetchDashboardTable,
    payload: { undefined },
  }),
  fetchDashboardSummary: () => ({
    type: actionTypes.FetchDashboardSummary,
    payload: { undefined },
  }),
  findDashboardTableData: (queryParams) => ({
    type: actionTypes.FindDashboardTableData,
    payload: { queryParams: queryParams },
  }),
};

function* fetchDashboardTable() {
  yield takeEvery(
    actionTypes.FetchDashboardTable,
    onLoadDashboardTableStartAsync
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

const fSagas = [
  
  fork(fetchDashboardTable),   
  fork(fetchDashboardSummary),
  fork(findDashboardTableData)


];

export function* saga() {
  yield all([...fSagas]);
}
