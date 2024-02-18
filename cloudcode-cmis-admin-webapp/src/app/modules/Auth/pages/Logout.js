import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { LayoutSplashScreen } from "../../../../_metronic/layout";
import { authSagaActions } from "..";

function Logout() {
  const dispatch = useDispatch();
  const { isUserAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(authSagaActions.logout());
  }, [dispatch]);

  return (
    <>
      {isUserAuthenticated ? <LayoutSplashScreen /> : <Redirect to="/auth/login" />}
    </>
  );
}

export default Logout;
