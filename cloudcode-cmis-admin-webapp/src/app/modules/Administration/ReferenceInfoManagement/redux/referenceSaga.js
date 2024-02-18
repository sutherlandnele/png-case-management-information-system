import {takeEvery, put, fork, call,all} from 'redux-saga/effects';
import { uiReducerActions } from '../../../UI';
import { referenceReducerActions } from '..';
import { referenceReducerCallTypes } from '..';
import {getAllReferencesApi} from '..';


function* onLoadReferenceStartAsync(){

    try{
        
        yield put(referenceReducerActions.startCall({ callType: referenceReducerCallTypes.list }));

        const response = yield call(getAllReferencesApi);        

        if(response.status === 200){
            let totalCount = response.data.length;
            let entities = response.data;
            yield put(referenceReducerActions.referencesFetched({totalCount, entities}));
        }
        else{
            let errorMsg = "There was an error retrieving reference information."

            yield put(uiReducerActions.showNotification({
                status:"error",
                title:"Error",
                message: errorMsg
            }));
        }
    }
    catch(error){

        //console.log(error);


        yield put(uiReducerActions.showNotification({
            status:"error",
            title:"Error",
            message: error
        }));
    }

}

const actionTypes = {
    FetchReferences: "[FetchReference] Fetch References API Action"
  };

export const actions = {

    fetchReferences: () => ({ type: actionTypes.FetchReferences, payload: { undefined } })
  
  };



function* fetchReferences(){

    yield takeEvery(actionTypes.FetchReferences,onLoadReferenceStartAsync);    
}


const fSagas = [fork(fetchReferences)];

export function* saga(){
    yield all ([...fSagas]);
}








