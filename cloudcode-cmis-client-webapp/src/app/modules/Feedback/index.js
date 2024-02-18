
import {createFeedbackApi} from "./redux/clientFeedbackAPI";
import {actions as feedbackReducerActions,reducer as feedbackReducer,callTypes as feedbackReducerCallTypes}  from "./redux/clientFeedbackSlice";
import {actions as feedbackSagaActions,saga as feedbackSaga}  from "./redux/clientFeedbackSaga";

import endPoint from "../../../config/endPoints";

import {FeedbackForm} from "./pages/FeedbackForm";



export {
    createFeedbackApi,
    feedbackReducerActions,
    feedbackReducer,
    feedbackReducerCallTypes,
    feedbackSagaActions,
    feedbackSaga,
    endPoint,
    FeedbackForm

}

