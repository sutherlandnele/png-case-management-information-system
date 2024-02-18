/* Redux, Saga, Action Creators, Axios and API Related */

import {actions as clientReducerActions,reducer as clientReducer,callTypes as clientReducerCallTypes}  from "../ClientManagement/redux/clientManagementSlice";
import {getAllClientsApi, getClientApi, findClientsApi, createClientApi,updateClientApi,getAllSrmClientsApi, findSrmClientsApi ,updateSrmClientApi,getSrmClientApi} from "../ClientManagement/redux/clientManagementAPI";
import {getAllClientEngagementsApi,
    getEngagementByIdApi,
    findClientROEsApi,
    findROEsApi, 
    getAllEngagementsApi,
    createClientEngagementApi,
    updateClientEngagementApi,
    getAllSrmEngagementsApi, 
    getSrmEngagementByIdApi , 
    getAllSrmClientEngagementsApi 
    ,createSrmClientEngagementApi , 
    findSrmROEsApi, 
    findSrmClientROEsApi,
} from "../ClientManagement/redux/clientEngagementAPI";

import {getAllFIPsApi,getClientFipApi, createClientFIPApi,updateClientFIPApi,getAllSrmFIPsApi,createSrmClientFIPApi,updateSrmClientFIPApi,getSrmClientFipApi} from "../ClientManagement/redux/clientFamilyInclusionPlanAPI";
import {getAllDSPsApi, getClientDspApi, createClientDSPApi,updateClientDSPApi,getAllSrmDSPsApi,createSrmClientDSPApi,updateSrmClientDSPApi,getSrmClientDspApi} from "../ClientManagement/redux/clientDurableSolutionPathwayAPI";

import {actions as fipReducerActions,reducer as fipReducer,callTypes as fipReducerCallTypes}  from "../ClientManagement/redux/clientFamilyInclusionPlanSlice";
import {actions as dspReducerActions,reducer as dspReducer,callTypes as dspReducerCallTypes}  from "../ClientManagement/redux/clientDurableSolutionPathwaySlice";

import {actions as fipSagaActions,saga as fipSaga}  from "../ClientManagement/redux/clientFamilyInclusionPlanSaga";
import {actions as dspSagaActions,saga as dspSaga}  from "../ClientManagement/redux/clientDurableSolutionPathwaySaga";

import {getClientName} from "./redux/clientUtils";

import {actions as clientEngagementReducerActions, reducer as clientEngagementReducer, callTypes as clientEngagementReducerCallTypes} from "../ClientManagement/redux/clientEngagementSlice";
import endPoint from "../../../config/endPoints";
import {actions as clientSagaActions,saga as clientSaga}  from "../ClientManagement/redux/clientManagementSaga";
import {actions as clientEngagementSagaActions, saga as clientEngagementSaga} from "../ClientManagement/redux/clientEngagementSaga";
import styles from "../ClientManagement/css/clientManagement.module.css";
import RelatedDocuments from "./components/RelatedDocuments";

/* Components Related */    

import {ClientsListing} from "./pages/ClientsListing";
import {ClientDSPUpdateForm} from "./pages/ClientDSPUpdateForm";
import {ClientFIPUpdateForm} from "./pages/ClientFIPUpdateForm";
import {ClientROEsListing} from "./pages/ClientROEsListing";
import {ClientROEUpdateForm} from "./pages/ClientROEUpdateForm";
import ClientManagement from "./pages/ClientManagement";
import ClientROEManagement from "./pages/ClientROEManagement";
import {ClientROEsListingSearchForm} from "./components/ClientROEsListingSearchForm";
import {ClientsListingSearchForm} from "./components/ClientsListingSearchForm";
import SelectedClientDetails from "./components/SelectedClientDetails";
import { ClientModalUpdateForm } from "./components/ClientModalUpdateForm";
import {ClientDSPViewForm} from  "./pages/ClientDSPViewForm";
import {ClientFIPViewForm} from  "./pages/ClientFIPViewForm";
import {ClientROEViewForm} from  "./pages/ClientROEViewForm";
import {ClientROEsViewListing} from  "./pages/ClientROEsViewListing";




export {

    /* Redux, Saga, Action Creators, Axios and API Related */

    endPoint, 
    clientReducerActions, 
    clientReducer, 
    getAllClientsApi,
    getClientApi,
    getClientFipApi,
    findClientsApi,
    getClientDspApi,
    clientReducerCallTypes, 
    clientSagaActions, 
    clientSaga,
    getAllClientEngagementsApi,
    findROEsApi,
    findClientROEsApi,
    getAllEngagementsApi,
    getEngagementByIdApi,
    getAllSrmEngagementsApi, 
    getSrmEngagementByIdApi, 
    getAllSrmClientEngagementsApi, 
    createSrmClientEngagementApi, 
    findSrmROEsApi, 
    findSrmClientROEsApi,
    clientEngagementReducerActions,
    clientEngagementReducer,
    clientEngagementReducerCallTypes,
    clientEngagementSagaActions,
    clientEngagementSaga,
    createClientApi,
    updateClientApi,
    getAllSrmClientsApi, 
    findSrmClientsApi,
    updateSrmClientApi,
    getSrmClientApi,
    createClientEngagementApi,
    updateClientEngagementApi,
    getAllFIPsApi, 
    getAllSrmFIPsApi,
    createSrmClientFIPApi,
    updateSrmClientFIPApi,
    getSrmClientFipApi,
    createClientFIPApi,
    updateClientFIPApi,
    fipReducerActions,
    fipReducer,
    fipReducerCallTypes,
    fipSagaActions,
    fipSaga,
    getAllDSPsApi, 
    getAllSrmDSPsApi,
    createSrmClientDSPApi,
    updateSrmClientDSPApi,
    getSrmClientDspApi,
    createClientDSPApi,
    updateClientDSPApi,
    dspReducerActions,
    dspReducer,
    dspReducerCallTypes,
    dspSagaActions,
    dspSaga,
    getClientName,

    /* Components Related */  

    ClientsListing,
    ClientManagement,
    ClientROEManagement,
    ClientDSPUpdateForm,
    ClientFIPUpdateForm,
    ClientROEsListing,
    ClientROEUpdateForm,
    ClientROEsListingSearchForm,
    ClientsListingSearchForm,
    SelectedClientDetails,
    ClientModalUpdateForm,
    RelatedDocuments,
    ClientDSPViewForm,
    ClientFIPViewForm,
    ClientROEViewForm,
    ClientROEsViewListing,

    /* Styles */
    styles


};
