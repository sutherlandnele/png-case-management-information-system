import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    listLoading: false,
    actionsLoading: false,
    dashboardTableTotalCount: 0,
    dashboardTable: [],
    dashboardSummary: {},
    lastError: null
  };

  export const callTypes = {
    list: "list",
    action: "action"
  };
  

const dashboardSlice = createSlice({
  
    name: 'dashboardSlice',
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
        dashboardSummaryFetched: (state, action) => {
          const { entity } = action.payload;
          state.listLoading = false;
          state.lastError = null;
          state.dashboardSummary = entity;
        },
        dashboardTableFetched: (state, action) => {
          const { totalCount, entities } = action.payload;
          state.listLoading = false;
          state.lastError = null;
          state.dashboardTable = entities;
          state.dashboardTableTotalCount = totalCount;   
        }        
      }
});

export const {reducer} = dashboardSlice;
export const {actions} = dashboardSlice;
