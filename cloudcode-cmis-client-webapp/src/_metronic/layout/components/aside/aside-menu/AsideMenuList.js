/* eslint-disable jsx-a11y/role-supports-aria-props */
/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl, checkIsActive } from "../../../../_helpers";

export function AsideMenuList({ layoutProps }) {
  const location = useLocation();
  const getMenuItemActive = (url, hasSubmenu = false) => {
    return checkIsActive(location, url)
      ? ` ${!hasSubmenu &&
          "menu-item-active"} menu-item-open menu-item-not-hightlighted`
      : "";
  };

  return (
    <>
      {/* begin::Menu Nav */}
      <ul className={`menu-nav ${layoutProps.ulClasses}`}>

        {/*begin::1 Level*/}
        <li
          className={`menu-item ${getMenuItemActive("/biography", false)}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/biography">
            <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl("/media/svg/icons/General/User.svg")} />
            </span>
            <span className="menu-text">Biography</span>
          </NavLink>
        </li>
        {/*end::1 Level*/}

        {/* DSP */}
        {/*begin::1 Level*/}
        <li
          className={`menu-item ${getMenuItemActive("/dsp", false)}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/dsp">
            <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl("/media/svg/icons/Communication/Thumbtack.svg")} />
            </span>
            <span className="menu-text">Durable Solution Pathway</span>
          </NavLink>
        </li>
        {/*end::1 Level*/}

        {/* ROE */}
        {/*begin::1 Level*/}
        <li
          className={`menu-item ${getMenuItemActive("/roe", false)}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/roe">
            <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl("/media/svg/icons/Communication/Outgoing-call.svg")} />
            </span>
            <span className="menu-text">Record of Engagements</span>
          </NavLink>
        </li>
        {/*end::1 Level*/}

        {/* FIP */}
        {/*begin::1 Level*/}
        <li
          className={`menu-item ${getMenuItemActive("/fip", false)}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/fip">
            <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl("/media/svg/icons/Communication/Group.svg")} />
            </span>
            <span className="menu-text">Family Inclusion Plan</span>
          </NavLink>
        </li>
        {/*end::1 Level*/}



        {/* Help */}
        {/*begin::1 Level*/}
        <li
          className={`menu-item ${getMenuItemActive("/help", false)}`}
          aria-haspopup="true">
          <NavLink className="menu-link" to="/help">
            <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl("/media/svg/icons/Code/Question-circle.svg")} />
            </span>
            <span className="menu-text">Help</span>
          </NavLink>
        </li>
        {/*end::1 Level*/}       

      </ul>

      {/* end::Menu Nav */}
    </>
  );
}
