import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    listLoading: false,
    actionsLoading: false,
    totalCount: 0,
    entities: [],
    lastError: null,
    foundDsp: {}
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
        dspsFetched: (state, action) => {
          const { totalCount, entities } = action.payload;
          state.listLoading = false;
          state.lastError = null;
          state.entities = entities;
          state.totalCount = totalCount;   
        },
        dspFetched: (state, action) => {
          const { foundDsp } = action.payload;
          state.actionsLoading = false;
          state.lastError = null;
          state.foundDsp = !!foundDsp?foundDsp:{};
        }
      }
});

export const {actions} = clientDSPSlice;
export const {reducer} = clientDSPSlice;