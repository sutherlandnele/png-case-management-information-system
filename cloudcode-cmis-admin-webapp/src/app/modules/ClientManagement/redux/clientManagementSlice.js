import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    listLoading: false,
    actionsLoading: false,
    totalCount: 0,
    entities: [],
    foundClient: {},
    lastError: null
  };

  export const callTypes = {
    list: "list",
    action: "action"
  };
  

const clientSlice = createSlice({
  
    name: 'clientSlice',
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
        clientsFetched: (state, action) => {
          const { totalCount, entities } = action.payload;
          state.listLoading = false;
          state.lastError = null;
          state.entities = entities;
          state.totalCount = totalCount;   
        },
        clientFetched: (state, action) => {
          const { foundClient } = action.payload;
          state.actionsLoading = false;
          state.lastError = null;
          state.foundClient = foundClient;
        }

        
      }
});

export const {actions} = clientSlice;
export const {reducer} = clientSlice;