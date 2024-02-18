import {createSlice} from "@reduxjs/toolkit";


const initialAgencyState = {
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
  

const agencySlice = createSlice({
    name: 'agency',
    initialState:initialAgencyState,
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
        agenciesFetched: (state, action) => {
          const { totalCount, entities } = action.payload;
          state.entities = entities;
          state.totalCount = totalCount;
          state.listLoading = false;
          state.error = null;

        }
      }
});

export const {actions} = agencySlice;
export const {reducer} = agencySlice;