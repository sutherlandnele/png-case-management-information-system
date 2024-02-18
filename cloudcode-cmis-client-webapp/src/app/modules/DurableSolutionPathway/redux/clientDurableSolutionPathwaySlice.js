import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    listLoading: false,
    actionsLoading: false,
    entity: {},
    lastError: null
  };

  export const callTypes = {
    list: "list",
    action: "action"
  };
  

const clientDSPSlice = createSlice({
  
    name: 'clientDSPSlice',
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
        dspFetched: (state, action) => {
          const { entity } = action.payload;
          state.listLoading = false;
          state.error = null;
          state.entity = entity;
        }
      }
});

export const {actions} = clientDSPSlice;
export const {reducer} = clientDSPSlice;