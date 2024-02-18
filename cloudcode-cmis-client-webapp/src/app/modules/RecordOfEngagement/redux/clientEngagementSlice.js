import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    listLoading: false,
    actionsLoading: false,
    totalCount: 0,
    entities: [],
    lastError: null
  };

  export const callTypes = {
    list: "list",
    action: "action"
  };
  

const clientEngagementSlice = createSlice({
  
    name: 'clientEngagementSlice',
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
        engagementsFetched: (state, action) => {
          const { totalCount, entities } = action.payload;
          state.listLoading = false;
          state.error = null;
          state.entities = entities;
          state.totalCount = totalCount;   
        } 
      }
});

export const {actions} = clientEngagementSlice;
export const {reducer} = clientEngagementSlice;