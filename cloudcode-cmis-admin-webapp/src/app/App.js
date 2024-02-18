/**
 * Entry application component used to compose providers and render Routes.
 * */

import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
// import { AuthInit } from "./modules/Auth";
import { Routes } from "../app/Routes";
import { I18nProvider } from "../_metronic/i18n";
import { LayoutSplashScreen } from "../_metronic/layout";



export default function App({ store, persistor, basename }) {
  return (
    /* Provide Redux store */
    <Provider store={store}>
      {/* Asynchronously persist redux stores and show `SplashScreen` while it's loading. */}      
      <PersistGate persistor={persistor} loading={<LayoutSplashScreen />}>
        {/* Add high level `Suspense` in case if was not handled inside the React tree. */}
        <React.Suspense fallback={<LayoutSplashScreen />}>
          {/* Override `basename` (e.g: `homepage` in `package.json`) */}
          <BrowserRouter basename={basename}>
              {/* Provide `react-intl` context synchronized with Redux state.  */}
              <I18nProvider>
                {/* Checks if user is authenticated and loads the user info */}
                  <Routes />
              </I18nProvider>            
          </BrowserRouter>
        </React.Suspense>
      </PersistGate>
    </Provider>
  );
}
