/* eslint-disable jsx-a11y/role-supports-aria-props */
/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl, checkIsActive } from "../../../../_helpers";
import {useSelector} from "react-redux";


export function AsideMenuList({ layoutProps }) {
  const location = useLocation();
  const {auth: {user}} = useSelector(state => state);

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
          className={`menu-item ${getMenuItemActive("/dashboard", false)}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/dashboard">
            <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl("/media/svg/icons/Design/Layers.svg")} />
            </span>
            <span className="menu-text">Dashboard</span>
          </NavLink>
        </li>
        {/*end::1 Level*/}

        {user.roleCode !== "ICA" && 

        <>
        {/* Client Management */}
        {/*begin::1 Level*/}
        <li
          className={`menu-item ${getMenuItemActive("/client-management", false)}`}
          aria-haspopup="true"
        >
          <NavLink className="menu-link" to="/client-management">
            <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl("/media/svg/icons/General/Search.svg")} />
            </span>
            <span className="menu-text">Client Case Management</span>
          </NavLink>
        </li>
        {/*end::1 Level*/}

        {/* Feedback */}
        {/*begin::1 Level*/}
        <li
          className={`menu-item ${getMenuItemActive("/feedback", false)}`}
          aria-haspopup="true">
          <NavLink className="menu-link" to="/feedback">
            <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl("/media/svg/icons/Communication/MailSend.svg")} />
            </span>
            <span className="menu-text">Client Feedbacks</span>
          </NavLink>
        </li>
        {/*end::1 Level*/}
        </>}
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

        {user.roleCode === "ADMIN" && 
        <>  
          {/* Administration */}
          {/* begin::section */}
          <li className="menu-section ">
            <h4 className="menu-text">Administration</h4>
            <i className="menu-icon flaticon-more-v2"></i>
          </li>
          {/* end:: section */}

          {/* User Management */}
          {/*begin::1 Level*/}
          <li
            className={`menu-item menu-item-submenu ${getMenuItemActive(
              "/administration/user-management",
              true
            )}`}
            aria-haspopup="true"
            data-menu-toggle="hover"
            aria-expanded="true"
          >
            <NavLink className="menu-link menu-toggle" to="/administration/user-management">
              <span className="svg-icon menu-icon">
                <SVG src={toAbsoluteUrl("/media/svg/icons/General/User.svg")} />
              </span>
              <span className="menu-text">User Management</span>
              <i className="menu-arrow" />
            </NavLink>
            <div className="menu-submenu ">
              <ul className="menu-subnav">
                <ul className="menu-subnav">
                  <li
                    className="menu-item  menu-item-parent"
                    aria-haspopup="true"
                  >
                    <span className="menu-link">
                      <span className="menu-text">User Management</span>
                    </span>
                  </li>

                  {/*begin::2 Level*/}
                  <li
                    className={`menu-item ${getMenuItemActive(
                      "/administration/user-management"
                    )}`}
                    aria-haspopup="true"
                  >
                    <NavLink className="menu-link" to="/administration/user-management">
                      <i className="menu-bullet menu-bullet-dot">
                        <span />
                      </i>
                      <span className="menu-text">Manage Users</span>
                    </NavLink>
                  </li>
                  {/*end::2 Level*/}

                </ul>
              </ul>
            </div>
          </li>
          {/*end::1 Level*/}   

          {/* Case Worker Management */}
          {/*begin::1 Level*/}
          <li
            className={`menu-item ${getMenuItemActive("/administration/case-worker-management", false)}`}
            aria-haspopup="true">
            <NavLink className="menu-link" to="/administration/case-worker-management">
              <span className="svg-icon menu-icon">
                <SVG src={toAbsoluteUrl("/media/svg/icons/Home/Building.svg")} />
              </span>
              <span className="menu-text">Status Resolution Managers</span>
            </NavLink>
          </li>
          {/*end::1 Level*/}
        </>}          
      </ul>

      {/* end::Menu Nav */}
    </>
  );
}
