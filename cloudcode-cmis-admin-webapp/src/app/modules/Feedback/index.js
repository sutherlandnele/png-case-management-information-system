
import {getAllFeedbacksApi, findFeedbacksApi,getAllSrmFeedbacksApi, findSrmFeedbacksApi} from "../Feedback/redux/clientFeedbackAPI";
import {actions as feedbackReducerActions,reducer as feedbackReducer,callTypes as feedbackReducerCallTypes}  from "../Feedback/redux/clientFeedbackSlice";
import {actions as feedbackSagaActions,saga as feedbackSaga}  from "../Feedback/redux/clientFeedbackSaga";

import endPoint from "../../../config/endPoints";

import ClientFeedbackManagement from "./pages/ClientFeedbackManagement";
import {ClientFeedbacksListing} from "./pages/ClientFeedbacksListing";
import {ClientFeedbackViewForm} from "./pages/ClientFeedbackViewForm";
import {ClientFeedbacksListingSearchForm} from "./components/ClientFeedbacksListingSearchForm";


export {
    ClientFeedbackManagement,
    ClientFeedbacksListing,
    ClientFeedbackViewForm,
    ClientFeedbacksListingSearchForm,
    getAllFeedbacksApi, 
    findFeedbacksApi,
    getAllSrmFeedbacksApi, 
    findSrmFeedbacksApi,
    feedbackReducerActions,
    feedbackReducer,
    feedbackReducerCallTypes,
    feedbackSagaActions,
    feedbackSaga,
    endPoint

}

