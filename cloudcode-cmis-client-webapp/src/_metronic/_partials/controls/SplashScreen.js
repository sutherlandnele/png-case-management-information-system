import React from "react";
import {toAbsoluteUrl} from "../../_helpers";
import {Spinner} from "react-bootstrap"

export function SplashScreen() {
  return (
    <>
      <div className="splash-screen">
        <img
          src={toAbsoluteUrl("/media/logos/logo-mini-md.png")}
          alt="DoF logo"
        />
        <Spinner animation="border" variant="warning" />

      </div>
    </>
  );
}
