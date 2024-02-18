import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    listLoading: false,
    actionsLoading: false,
    totalCount: 0,
    entities: [],
    lastError: null,
    foundEngagement: {}
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
        engagementsFetched: (state, action) => {
          const { totalCount, entities } = action.payload;
          state.listLoading = false;
          state.lastError = null;
          state.entities = entities;
          state.totalCount = totalCount;   
        },
        engagementFetched: (state, action) => {
          const { foundEngagement } = action.payload;
          state.actionsLoading = false;
          state.lastError = null;
          state.foundEngagement = foundEngagement;
        } 
      }
});

export const {actions} = clientEngagementSlice;
export const {reducer} = clientEngagementSlice;