import { takeEvery, put, fork, call, all, select} from "redux-saga/effects";
import * as authSlice from "./authSlice";
import { loginApi, logoutApi } from "./authApi";




function* onLoginStartAsync({ payload }) {
  try {
    yield put(
        authSlice.actions.startCall({
        callType: authSlice.callTypes.action,
      })
    );

    const response = yield call(loginApi, payload.username, payload.password);

    if (response.status === 200) {
      yield put(
        authSlice.actions.loginSuccess(response.data)
      );
    } else {
      let error = "There was an error trying to authenticate.";

      yield put(
        authSlice.actions.catchError({error})
      );
    }
  } catch (error) {
    //console.log(error);
    yield put(
      authSlice.actions.catchError({error})
    );
  }
}


function* onLogoutStartAsync() {
    try {
      yield put(
          authSlice.actions.startCall({
          callType: authSlice.callTypes.action,
        })
      );

      const getUak = (state) => state.auth;
      const uak = yield select(getUak);

      if(uak.isUserAuthenticated)
      {
        const response = yield call(logoutApi, uak.accessToken, uak.refreshToken, uak.user);
  
        if (response.status === 200) {
          yield put(
            authSlice.actions.loggedOut()
          );
        } else {
          let error = "There was an error trying to logout.";
    
          yield put(
            authSlice.actions.catchError({error})
          );
        }
  
      }     


    } catch (error) {
      yield put(
        authSlice.actions.catchError({error})
      );
    }
  }


  // function* onUserLoadedStartAsync({ payload }) {
  //   try {
  //     yield put(
  //         authSlice.actions.startCall({
  //         callType: authSlice.callTypes.action,
  //       })
  //     );
      
  //     authSlice.actions.userLoaded(payload.user);

  //   } catch (error) {
  //     yield put(
  //       authSlice.actions.catchError({error})
  //     );
  //   }
  // }



const actionTypes = {
    Login: "[Login] Login API Action",
    Logout: "[Logout] Logout API Action",
    // UserLoaded: "[Load User] User Loaded API",
};
export const actions = {
    login: (username,password) => ({ type: actionTypes.Login, payload: { username,password }}),
    logout: () => ({ type: actionTypes.Logout, payload: {undefined }}),
    // fulFillUser: (user) => ({ type: actionTypes.UserLoaded, payload: {user}}),
  };

function* login() {
  yield takeEvery(actionTypes.Login,onLoginStartAsync);
}

function* logout() {
    yield takeEvery(actionTypes.Logout,onLogoutStartAsync);
}

// function* fulFillUser() {
//   yield takeEvery(actionTypes.UserLoaded,onUserLoadedStartAsync);
// }


const fSagas = [
    fork(login),
    fork(logout),
    // fork(fulFillUser)
];

export function* saga() {
  yield all([...fSagas]);
}
