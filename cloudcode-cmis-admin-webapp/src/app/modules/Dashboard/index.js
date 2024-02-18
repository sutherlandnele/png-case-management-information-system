//index.js
import {Dashboard} from "./pages/Dashboard";
import endPoint from "../../../config/endPoints";
import {getDashboardSummaryApi,findDashboardTableDataApi, getDashboardTableApi,findSrmDashboardTableDataApi, getSrmDashboardTableApi} from "../Dashboard/redux/dashboardAPI";
import {actions as dashboardReducerActions,reducer as dashboardReducer,callTypes as dashboardReducerCallTypes}  from "../Dashboard/redux/dashboardSlice";

import {actions as dashboardSagaActions,saga as dashboardSaga}  from "../Dashboard/redux/dashboardSaga";



export {

    Dashboard, 
    endPoint,
    getDashboardSummaryApi, 
    getDashboardTableApi,
    getSrmDashboardTableApi,
    dashboardReducerActions,
    dashboardReducer,
    dashboardReducerCallTypes,
    findDashboardTableDataApi,
    findSrmDashboardTableDataApi,
    dashboardSagaActions,
    dashboardSaga

}