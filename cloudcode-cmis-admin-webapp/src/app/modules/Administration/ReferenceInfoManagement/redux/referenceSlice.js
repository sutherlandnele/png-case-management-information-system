import {createSlice} from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "reference-entities",
  storage,
  whitelist: ["entities"]
}

const initialState = {
    listLoading: false,
    actionsLoading: false,
    entities: [],
    totalCount: 0,      
    lastError: null
  };

  export const callTypes = {
    list: "list",
    action: "action"
  };


const referenceSlice = createSlice({
    name: 'reference',
    initialState:initialState,
    reducers: {
        catchError: (state, action) => {
          state.error = `${action.type}: ${action.payload.error}`;
          if (action.payload.callType === callTypes.list) {
            state.listLoading = false;
          } else {
            state.actionsLoading = false;
          }
        },
        startCall: (state, action) => {
          state.error = null;
          if (action.payload.callType === callTypes.list) {
            state.listLoading = true;
          } else {
            state.actionsLoading = true;
          }
        },
        referencesFetched: (state, action) => {
          const { totalCount, entities } = action.payload;
          state.listLoading = false;
          state.error = null;
          state.entities = entities;
          state.totalCount = totalCount; 

        }
      }
});

const unpersistedReducer = referenceSlice.reducer;

export const reducer = persistReducer(persistConfig, unpersistedReducer);

export const {actions} = referenceSlice;
