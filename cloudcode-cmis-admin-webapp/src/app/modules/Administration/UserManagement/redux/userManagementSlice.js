import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    listLoading: false,
    actionsLoading: false,
    userEntitiesTotalCount: 0,
    userEntities: [],
    keyValueUsers: [],
    keyValueUsersTotalCount: 0,
    userRoleEntitiesTotalCount: 0,
    userRoleEntities: [],
    lastError: null
  };

  export const callTypes = {
    list: "list",
    action: "action"
  };
  

const userSlice = createSlice({
  
    name: 'userSlice',
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
        usersFetched: (state, action) => {
          const { totalCount, entities } = action.payload;
          state.listLoading = false;
          state.lastError = null;
          state.userEntities = entities;
          state.userEntitiesTotalCount = totalCount;   
        },
        userRolesFetched: (state, action) => {
          const { totalCount, entities } = action.payload;
          state.listLoading = false;
          state.lastError = null;
          state.userRoleEntities = entities;
          state.userRoleEntitiesTotalCount = totalCount;   
        },
        keyValueUsersFetched: (state, action) => {
          const { totalCount, entities } = action.payload;
          state.listLoading = false;
          state.lastError = null;
          state.keyValueUsers = entities;
          state.keyValueUsersTotalCount = totalCount;   
        }          

      }
});

export const {actions} = userSlice;
export const {reducer} = userSlice;