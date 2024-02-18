import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    listLoading: false,
    actionsLoading: false,
    totalCount: 0,
    entities: [],
    lastError: null,
    foundFip : {}
  };

  export const callTypes = {
    list: "list",
    action: "action"
  };
  

const clientFIPSlice = createSlice({
  
    name: 'clientFIPSlice',
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
        fipsFetched: (state, action) => {
          const { totalCount, entities } = action.payload;
          state.listLoading = false;
          state.lastError = null;
          state.entities = entities;
          state.totalCount = totalCount;   
        },
        fipFetched: (state, action) => {
          const { foundFip } = action.payload;
          state.actionsLoading = false;
          state.lastError = null;
          state.foundFip = foundFip;
        },

      }
});

export const {actions} = clientFIPSlice;
export const {reducer} = clientFIPSlice;