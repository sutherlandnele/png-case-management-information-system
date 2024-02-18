/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { shallowEqual, useSelector } from "react-redux";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../../_metronic/_helpers";

export function ProfileCard() {
  const user = useSelector(({ auth }) => auth.user, shallowEqual);

  useEffect(() => {
    return () => {};
  }, [user]);

  return (
    <>
      {user && (
        <div
          className="flex-row-auto offcanvas-mobile w-250px w-xxl-350px"
          id="kt_profile_aside"
        >
          <div className="card card-custom card-stretch">
            {/* begin::Body */}
            <div className="card-body pt-4">

              {/* begin::User */}
              <div className="d-flex align-items-center">
                <div className="symbol symbol-60 symbol-xxl-100 mr-5 align-self-start align-self-xxl-center">
                  <div
                    className="symbol-label"
                    style={{ backgroundImage: `url(${user.pic})` }}
                  ></div>
                  {/* style="background-i
                  mage:url('/metronic/theme/html/demo1/dist/assets/media/users/300_21.jpg')" */}
                  <i className="symbol-badge bg-success"></i>
                </div>
                <div>
                  <a
                    href="#"
                    className="font-weight-bolder font-size-h5 text-dark-75 text-hover-primary"
                  >
                    {user.firstname} {user.lastname}
                  </a>
                  <div className="text-muted">{user.occupation}</div>
                </div>
              </div>
              {/* end::User */}
              {/* begin::Contact */}
              <div className="py-9">
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <span className="font-weight-bold mr-2">Email:</span>
                  <span className="text-muted text-hover-primary">
                    {user.email}
                  </span>
                </div>
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <span className="font-weight-bold mr-2">Phone:</span>
                  <span className="text-muted">{user.phone}</span>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <span className="font-weight-bold mr-2">Location:</span>
                  <span className="text-muted">{user.address.city}</span>
                </div>
              </div>
              {/* end::Contact */}
              {/* begin::Nav */}
              <div className="navi navi-bold navi-hover navi-active navi-link-rounded">
                <div className="navi-item mb-2">
                  <NavLink
                    to="/user-profile/personal-information"
                    className="navi-link py-4"
                    activeClassName="active"
                  >
                    <span className="navi-icon mr-2">
                      <span className="svg-icon">
                        <SVG
                          src={toAbsoluteUrl(
                            "/media/svg/icons/General/User.svg"
                          )}
                        ></SVG>{" "}
                      </span>
                    </span>
                    <span className="navi-text font-size-lg">
                      Personal Information
                    </span>
                  </NavLink>
                </div>
                <div className="navi-item mb-2">
                  <NavLink
                    to="/user-profile/account-information"
                    className="navi-link py-4"
                    activeClassName="active"
                  >
                    <span className="navi-icon mr-2">
                      <span className="svg-icon">
                        <SVG
                          src={toAbsoluteUrl(
                            "/media/svg/icons/Code/Compiling.svg"
                          )}
                        ></SVG>{" "}
                      </span>
                    </span>
                    <span className="navi-text font-size-lg">
                      Account Information
                    </span>
                  </NavLink>
                </div>
                <div className="navi-item mb-2">
                  <NavLink
                    to="/user-profile/change-password"
                    className="navi-link py-4"
                    activeClassName="active"
                  >
                    <span className="navi-icon mr-2">
                      <span className="svg-icon">
                        <SVG
                          src={toAbsoluteUrl(
                            "/media/svg/icons/Communication/Shield-user.svg"
                          )}
                        ></SVG>{" "}
                      </span>
                    </span>
                    <span className="navi-text font-size-lg">
                      Change Password
                    </span>

                  </NavLink>
                </div>
                <div className="navi-item mb-2">
                  <NavLink
                    to="/user-profile/email-settings"
                    className="navi-link py-4"
                    activeClassName="active"
                  >
                    <span className="navi-icon mr-2">
                      <span className="svg-icon">
                        <SVG
                          src={toAbsoluteUrl(
                            "/media/svg/icons/Communication/Mail-opened.svg"
                          )}
                        ></SVG>{" "}
                      </span>
                    </span>
                    <span className="navi-text font-size-lg">
                      Email settings
                    </span>
                  </NavLink>
                </div>
             </div>
              {/* end::Nav */}
            </div>
            {/* end::Body */}
          </div>
        </div>
      )}
    </>
  );
}
