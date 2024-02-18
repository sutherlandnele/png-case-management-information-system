import {createSlice} from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "case-worker-entities",
  storage,
  whitelist: ["entities"]
}

const initialState = {
    listLoading: false,
    actionsLoading: false,
    totalCount: 0,
    entities: [],
    lastError: null,
    foundCaseWorker: {}
  };

  export const callTypes = {
    list: "list",
    action: "action"
  };
  

const caseWorkerSlice = createSlice({
  
    name: 'caseWorkerSlice',
    initialState:initialState,
    reducers: {
        catchError: (state, action) => {
          state.lastError = `${action.type}: ${action.payload.error}`;
          if (action.payload.callType === callTypes.list) {
            state.listLoading = false;
          } else {
            state.actionsLoading = false;
          }
        },
        startCall: (state, action) => {
          state.lastError = null;
          if (action.payload.callType === callTypes.list) {
            state.listLoading = true;
          } else {
            state.actionsLoading = true;
          }
        },
        caseWorkersFetched: (state, action) => {
          const { totalCount, entities } = action.payload;
          state.listLoading = false;
          state.lastError = null;
          state.entities = entities;
          state.totalCount = totalCount;   
        },
        caseWorkerFetched: (state, action) => {
          const { foundCaseWorker } = action.payload;
          state.actionsLoading = false;
          state.lastError = null;
          state.foundCaseWorker = foundCaseWorker;
        }        
      }
});

const unpersistedReducer = caseWorkerSlice.reducer;
export const reducer = persistReducer(persistConfig, unpersistedReducer);
export const {actions} = caseWorkerSlice;
