/* Redux, Saga, Action Creators, Axios and API Related */

import {actions as clientReducerActions,reducer as clientReducer,callTypes as clientReducerCallTypes}  from "../ClientManagement/redux/clientManagementSlice";
import {getClientApi, getClientByUsernameApi} from "../ClientManagement/redux/clientManagementAPI";

import endPoint from "../../../config/endPoints";
import {actions as clientSagaActions,saga as clientSaga}  from "../ClientManagement/redux/clientManagementSaga";


/* Components Related */    


export {

    /* Redux, Saga, Action Creators, Axios and API Related */

    endPoint, 
    clientReducerActions, 
    clientReducer, 
    getClientApi,
    getClientByUsernameApi,
    clientReducerCallTypes, 
    clientSagaActions, 
    clientSaga,
  
    /* Components Related */  

   
    /* Styles */


};
