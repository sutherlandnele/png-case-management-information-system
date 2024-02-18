import React, { useRef, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { LayoutSplashScreen } from "../../../../_metronic/layout";
import {authSagaActions} from "..";


function AuthInit(props) {

  // This code gives the desired result internally but not visually. The value of the didRequest is persisted but no re-rendering 
  // is done when the update is done, this is because refs are expected to hold the same values throughout the lifecycle of a component, 
  // React does not expect them to change.

  const didRequest = useRef(false); //when used like this is used to store values instead of DOM references

  const [showSplashScreen, setShowSplashScreen] = useState(true);

  const {auth} = useSelector(state => state);
  const dispatch = useDispatch();
  


  // We should request user by authToken before rendering the application
  useEffect(() => {
    
    const requestUser = async () => {
      try {
        if (!didRequest.current) {

           const { user } = auth ;
          
           dispatch(authSagaActions.fulFillUser(user));
        }
      } catch (error) {
        console.error(error);
        if (!didRequest.current) {
           dispatch(authSagaActions.logout(auth));
        }
      } finally {
        setShowSplashScreen(false);
      }

      return () => (didRequest.current = true);
    };

    if (auth.isUserAuthenticated) {
      requestUser();
    } else {
      dispatch(authSagaActions.fulFillUser(undefined));

      setShowSplashScreen(false);
    }
    // eslint-disable-next-line
  }, []);

  return showSplashScreen ? <LayoutSplashScreen /> : <>{props.children}</>;
}

export default AuthInit;
