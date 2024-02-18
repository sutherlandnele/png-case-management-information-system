import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    listLoading: false,
    actionsLoading: false,
    lastCreatedFeedback: {},
    lastError: null
  };

  export const callTypes = {
    list: "list",
    action: "action"
  };
  

const feedbackSlice = createSlice({
  
    name: 'feedbackSlice',
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
        feedbackCreated: (state, action) => {
          const { entity } = action.payload;
          state.actionsLoading = false;
          state.lastError = null;
          state.lastCreatedFeedback = entity;
        },

      }
});

export const {actions} = feedbackSlice;
export const {reducer} = feedbackSlice;