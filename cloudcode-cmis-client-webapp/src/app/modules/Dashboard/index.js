//index.js
import Biography from "./pages/Biography";
import endPoint from "../../../config/endPoints";
import {getDashboardSummaryApi,findDashboardTableDataApi, getDashboardTableApi} from "../Dashboard/redux/dashboardAPI";
import {actions as dashboardReducerActions,reducer as dashboardReducer,callTypes as dashboardReducerCallTypes}  from "../Dashboard/redux/dashboardSlice";

import {actions as dashboardSagaActions,saga as dashboardSaga}  from "../Dashboard/redux/dashboardSaga";



export {

    endPoint,
    getDashboardSummaryApi, 
    getDashboardTableApi,
    dashboardReducerActions,
    dashboardReducer,
    dashboardReducerCallTypes,
    findDashboardTableDataApi,
    dashboardSagaActions,
    dashboardSaga,
    Biography

}