import {createSlice} from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";


const persistConfig = {
  key: "user-access-key", 
  storage,
  whitelist: ["accessToken","refreshToken","isUserAuthenticated","user","listLoading","actionsLoading","lastError"],
}

const initialState = {
    listLoading: false,
    actionsLoading: false,
    isUserAuthenticated: false,
    user: undefined,
    accessToken: undefined,
    refreshToken: undefined,
    lastError: null
  };

  export const callTypes = {
    list: "list",
    action: "action"
  };
  

const authSlice = createSlice({
  
    name: 'authSlice',
    initialState:initialState,
    reducers: {
        catchError: (state, action) => {
          state.lastError = `${action.type}: ${action.payload.error}`;
          if (action.payload.callType === callTypes.list) {
            state.listLoading = false;
          } else {
            state.actionsLoading = false;
          }
          state.isUserAuthenticated = false;
          state.accessToken = undefined;
          state.refreshToken = undefined;
          state.user = undefined;
        },
        startCall: (state, action) => {
          state.lastError = null;
          if (action.payload.callType === callTypes.list) {
            state.listLoading = true;
          } else {
            state.actionsLoading = true;
          }
        },
        loginSuccess: (state, action) => {
          const { accessToken, refreshToken, user } = action.payload;
          state.actionsLoading = false;
          state.lastError = null;
          state.accessToken = accessToken;
          state.refreshToken = refreshToken;
          state.isUserAuthenticated = true;
          state.user = user;   
        },
        userLoaded: (state, action) => {
          const {  user } = action.payload;
          state.actionsLoading = false;
          state.isUserAuthenticated = true;
          state.lastError = null;
          state.user = user;   
        },
        loggedOut: () => initialState
          // From here we can take action only at this "counter" state
          // But, as we have taken care of this particular "logout" action
          // in rootReducer, we can use it to CLEAR the complete Redux Store's state
        
        ,
        
        
      }
});

const unpersistedReducer = authSlice.reducer;
export const reducer = persistReducer(persistConfig, unpersistedReducer);
export const {actions} = authSlice;
