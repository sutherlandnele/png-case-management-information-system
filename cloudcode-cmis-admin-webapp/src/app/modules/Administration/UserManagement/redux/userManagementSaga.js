import { takeEvery, put, fork, call, all } from "redux-saga/effects";
import { userReducerActions } from "..";
import { userReducerCallTypes } from "..";
import {
  getAllUsersApi,
  getAllKeyValueUsersApi,
  getClientKeyValueUsersApi,
  getSrmKeyValueUsersApi,
  findUsersApi,
  createUserApi,
  updateUserApi,
  GetUserRolesApi
} from "..";
import { toast } from "react-toastify";

function* onLoadUsersStartAsync() {
  try {
    yield put(
      userReducerActions.startCall({ callType: userReducerCallTypes.list })
    );

    const response = yield call(getAllUsersApi);

    if (response.status === 200) {
      let totalCount = response.data.length;
      let entities = response.data;
      yield put(userReducerActions.usersFetched({ totalCount, entities }));
    } else {
      const error = "There was an error retrieving users information";
      userReducerActions.catchError({error});
    }
  } catch (error) {
    userReducerActions.catchError({error});
  }
}

function* onLoadKeyValueUsersStartAsync() {
  try {
    yield put(
      userReducerActions.startCall({ callType: userReducerCallTypes.list })
    );

    const response = yield call(getAllKeyValueUsersApi);

    if (response.status === 200) {
      let totalCount = response.data.length;
      let entities = response.data;
      yield put(userReducerActions.keyValueUsersFetched({ totalCount, entities }));
    } else {
      const error = "There was an error retrieving kv users information";
      userReducerActions.catchError({error});
    }
  } catch (error) {
    console.log(error);
    userReducerActions.catchError({error});
  }
}


function* onLoadClientKeyValueUsersStartAsync() {
  try {
    yield put(
      userReducerActions.startCall({ callType: userReducerCallTypes.list })
    );

    const response = yield call(getClientKeyValueUsersApi);

    if (response.status === 200) {
      let totalCount = response.data.length;
      let entities = response.data;
      yield put(userReducerActions.keyValueUsersFetched({ totalCount, entities }));
    } else {
      const error = "There was an error retrieving kv client users information";
      userReducerActions.catchError({error});
    }
  } catch (error) {
    //console.log(error);
    userReducerActions.catchError({error});
  }
}


function* onLoadSrmKeyValueUsersStartAsync() {
  try {
    yield put(
      userReducerActions.startCall({ callType: userReducerCallTypes.list })
    );

    const response = yield call(getSrmKeyValueUsersApi);

    if (response.status === 200) {
      let totalCount = response.data.length;
      let entities = response.data;
      yield put(userReducerActions.keyValueUsersFetched({ totalCount, entities }));
    } else {
      const error = "There was an error retrieving kv srm users information";
      userReducerActions.catchError({error});
    }
  } catch (error) {
    console.log(error);
    userReducerActions.catchError({error});
  }
}







function* onLoadUserRolesStartAsync() {
  try {
    yield put(
      userReducerActions.startCall({ callType: userReducerCallTypes.list })
    );

    const response = yield call(GetUserRolesApi);

    if (response.status === 200) {
      let totalCount = response.data.length;
      let entities = response.data;
      yield put(userReducerActions.userRolesFetched({ totalCount, entities }));
    } else {
      const error = "There was an error retrieving user roles information";
      userReducerActions.catchError({error});
    }
  } catch (error) {
    userReducerActions.catchError({error});
  }
}


function* onFindUsersStartAsync({ payload }) {
  try {
    yield put(
      userReducerActions.startCall({ callType: userReducerCallTypes.list })
    );

    const response = yield call(findUsersApi, payload.queryParams);

    if (response.status === 200) {
      let totalCount = response.data.length;
      let entities = response.data;
      yield put(userReducerActions.usersFetched({ totalCount, entities }));
    } else {
      const error = "There was an error retrieving users information";
      userReducerActions.catchError({error});
    }
  } catch (error) {
      userReducerActions.catchError({error});

  }
}

function* onCreateUserStartAsync({ payload }) {
  try {
    yield put(
      userReducerActions.startCall({
        callType: userReducerCallTypes.action,
      })
    );

    const response = yield call(createUserApi, payload.user);

    if (response.status === 200) {
      toast.success("User created successfully");

      yield call(onLoadUsersStartAsync);
    } else {
      const error = "There was an error creating user information.";
      toast.error(error);
      userReducerActions.catchError({error});
    }
  } catch (err) {
      const error = err.response.data;
      toast.error(error.response.data);
      userReducerActions.catchError({error});

  }
}

function* onUpdateUserStartAsync({ payload }) {
  try {
    yield put(
      userReducerActions.startCall({
        callType: userReducerCallTypes.action,
      })
    );

    const response = yield call(updateUserApi, payload.id, payload.user);

    if (response.status === 200) {
      yield call(onLoadUsersStartAsync);
      toast.success("User updated successfully");
    } else {
      let error = "There was an error updating user information.";
      toast.error(error);
      userReducerActions.catchError({error});
    }
  } catch (err) {
    const error = err.response.data;
    toast.error(error);
    userReducerActions.catchError({error});

  }
}

const actionTypes = {
  FetchUsers: "[FetchUsers] Fetch Users API Action",
  FetchKvUsers: "[FetchKvUsers] Fetch Key Value Users API Action",
  FetchClientKvUsers: "[FetchClientKvUsers] Fetch Client Key Value Users API Action",
  FetchSrmKvUsers: "[FetchSrmKvUsers] Fetch SRM Key Value Users API Action",
  FetchUserRoles: "[FetchUserRoles] Fetch User Roles API Action",
  FindUsers: "[FindUsers] Find Users API Action",
  CreateUser: "[CreateUser] Create User API Action",
  UpdateUser: "[UpdateUser] Update User API Action",
};
export const actions = {
  fetchUsers: () => ({
    type: actionTypes.FetchUsers,
    payload: { undefined },
  }),
  fetchKvUsers: () => ({
    type: actionTypes.FetchKvUsers,
    payload: { undefined },
  }),
  fetchClientKvUsers: () => ({
    type: actionTypes.FetchClientKvUsers,
    payload: { undefined },
  }),
  fetchSrmKvUsers: () => ({
    type: actionTypes.FetchSrmKvUsers,
    payload: { undefined },
  }),
  findUsers: (queryParams) => ({
    type: actionTypes.FindUsers,
    payload: { queryParams: queryParams },
  }),
  createUser: (user) => ({
    type: actionTypes.CreateUser,
    payload: { user },
  }),
  updateUser: (id, user) => ({
    type: actionTypes.UpdateUser,
    payload: { id, user },
  }),
  fetchUserRoles: () => ({
    type: actionTypes.FetchUserRoles,
    payload: { undefined },
  }),
};
function* fetchUsers() {
  yield takeEvery(actionTypes.FetchUsers, onLoadUsersStartAsync);
}
function* fetchKvUsers() {
  yield takeEvery(actionTypes.FetchKvUsers, onLoadKeyValueUsersStartAsync);
}

function* fetchClientKvUsers() {
  yield takeEvery(actionTypes.FetchClientKvUsers, onLoadClientKeyValueUsersStartAsync);
}

function* fetchSrmKvUsers() {
  yield takeEvery(actionTypes.FetchSrmKvUsers, onLoadSrmKeyValueUsersStartAsync);
}


function* findUsers() {
  yield takeEvery(actionTypes.FindUsers, onFindUsersStartAsync);
}

function* createUser() {
  yield takeEvery(actionTypes.CreateUser, onCreateUserStartAsync);
}

function* updateUser() {
  yield takeEvery(actionTypes.UpdateUser, onUpdateUserStartAsync);
}

function* fetchUserRoles() {
  yield takeEvery(actionTypes.FetchUserRoles, onLoadUserRolesStartAsync);
}


const fSagas = [
  fork(fetchUsers),
  fork(fetchKvUsers),
  fork(fetchSrmKvUsers),
  fork(fetchClientKvUsers),
  fork(findUsers),
  fork(createUser),
  fork(updateUser),
  fork(fetchUserRoles),

];
export function* saga() {
  yield all([...fSagas]);
}
