import {takeEvery, put, fork, call,all} from 'redux-saga/effects';
import * as uiSlice from '../../UI/redux/uiSlice';
import * as agencySlice from "./agencySlice";
import {getAllAgencies} from './agencyAPI';



export function* onLoadAgencyStartAsync(){

    try{
        
        yield put(agencySlice.actions.startCall({ callType: agencySlice.callTypes.list }));

        const response = yield call(getAllAgencies);        

        if(response.status === 200){
            let totalCount = response.data.length;
            let entities = response.data;
            yield put(agencySlice.actions.agenciesFetched({totalCount, entities}));
        }
        else{
            let errorMsg = "There was an error retrieving agencies."

            yield put(uiSlice.actions.showNotification({
                status:"error",
                title:"Error",
                message: errorMsg
            }));
        }
    }
    catch(error){

        console.log(error);


        yield put(uiSlice.actions.showNotification({
            status:"error",
            title:"Error",
            message: error
        }));
    }

}

    const actionTypes = {
    FetchAgencies: "[FetchAgencies] Fetch Agencies API Action",

  };

export const actions = {

    fetchAgencies: () => ({ type: actionTypes.FetchAgencies, payload: {undefined} })
  
  };



export function* fetchAgencies(){

    yield takeEvery(actionTypes.FetchAgencies,onLoadAgencyStartAsync);    
}




const fSagas = [
    fork(fetchAgencies)
];

export function* saga(){
    yield all ([...fSagas]);
}








