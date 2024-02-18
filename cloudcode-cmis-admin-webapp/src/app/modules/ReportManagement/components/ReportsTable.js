/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../../_metronic/_helpers";
import { Link } from "react-router-dom";

export function ReportsTable() {
  return (
    <div className="card card-custom card-stretch gutter-b">
      {/* begin::Header */}
      <div className="card-header border-0 py-5">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label font-weight-bolder text-dark">
            Reports
          </span>
          <span className="text-muted mt-3 font-weight-bold font-size-sm">
            Reports
          </span>
        </h3>

        <div className="card-toolbar">
          {/* <Link
            to="/client-records/client-record-form"
            className="btn btn-success font-weight-bolder font-size-sm"
          >
            <span className="svg-icon svg-icon-md svg-icon-white">
              <SVG
                src={toAbsoluteUrl(
                  "/media/svg/icons/Communication/Add-user.svg"
                )}
                className="h-50 align-self-center"
              ></SVG>
            </span>
            Add New Client
          </Link> */}
        </div>
      </div>
      {/* end::Header */}

      {/* begin::Body */}
      <div className="card-body py-0">
        <div className="row justify-content-start">
          <div className="col-lg-3 col-sm-6">
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <span className="svg-icon svg-icon-md">
                    <SVG
                      src={toAbsoluteUrl("/media/svg/icons/General/Search.svg")}
                    />
                  </span>
                </span>
              </div>
              <input
                type="text"
                className="form-control "
                placeholder="Keyword..."
              />
              <div class="input-group-append">
                <button
                  class="btn btn-success"
                  type="button"
                  id="button-addon2"
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            {/* begin::Table */}
            <div className="table-responsive">
              <table
                className="table table-head-custom table-vertical-center"
                id="kt_advance_table_widget_1"
              >
                <thead>
                  <tr className="text-left">
                    <th className="pl-0" style={{ width: "20px" }}>
                      {/* <label className="checkbox checkbox-lg checkbox-single">
                    <input type="checkbox" value="1" />
                    <span>test</span>
                  </label> */}
                    </th>
                    <th className="pr-0" style={{ width: "50px" }}>
                      name
                    </th>
                    <th style={{ minWidth: "200px" }} />
                    <th style={{ minWidth: "150px" }}>gender</th>
                    <th style={{ minWidth: "150px" }}>processing progress</th>
                    <th
                      className="pr-0 text-right"
                      style={{ minWidth: "150px" }}
                    >
                      action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="pl-0">
                      <label className="checkbox checkbox-lg checkbox-single">
                        <input type="checkbox" value="1" />
                        <span></span>
                      </label>
                    </td>
                    <td className="pr-0">
                      <div className="symbol symbol-50 symbol-light mt-1">
                        <span className="symbol-label">
                          <SVG
                            src={toAbsoluteUrl(
                              "/media/svg/avatars/001-boy.svg"
                            )}
                            className="h-75 align-self-end"
                          ></SVG>
                        </span>
                      </div>
                    </td>
                    <td className="pl-0">
                      <a
                        href="#"
                        className="text-dark-75 font-weight-bolder text-hover-primary mb-1 font-size-lg"
                      >
                        Brad Simmons
                      </a>
                      <span className="text-muted font-weight-bold text-muted d-block">
                        Iraq
                      </span>
                    </td>
                    <td>
                      <span className="text-dark-75 font-weight-bolder d-block font-size-lg">
                        Male
                      </span>
                      <span className="text-muted font-weight-bold">
                        27 Years Old
                      </span>
                    </td>
                    <td>
                      <div className="d-flex flex-column w-100 mr-2">
                        <div className="d-flex align-items-center justify-content-between mb-2">
                          <span className="text-muted mr-2 font-size-sm font-weight-bold">
                            65%
                          </span>
                          <span className="text-muted font-size-sm font-weight-bold">
                            Progress
                          </span>
                        </div>
                        <div className="progress progress-xs w-100">
                          <div
                            className="progress-bar bg-danger"
                            role="progressbar"
                            style={{ width: "65%" }}
                            aria-valuenow="50"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="pr-0 text-right">
                      <Link
                        className="btn btn-icon btn-light btn-hover-primary btn-sm mx-3"
                        to="/client-records/client-record-form"
                      >
                        <span className="svg-icon svg-icon-md svg-icon-primary">
                          <SVG
                            src={toAbsoluteUrl(
                              "/media/svg/icons/Communication/Write.svg"
                            )}
                          ></SVG>
                        </span>
                      </Link>
                      <a
                        href="#"
                        className="btn btn-icon btn-light btn-hover-primary btn-sm"
                      >
                        <span className="svg-icon svg-icon-md svg-icon-primary">
                          <SVG
                            src={toAbsoluteUrl(
                              "/media/svg/icons/General/Trash.svg"
                            )}
                          ></SVG>
                        </span>
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td className="pl-0">
                      <label className="checkbox checkbox-lg checkbox-single">
                        <input type="checkbox" value="1" />
                        <span></span>
                      </label>
                    </td>
                    <td className="pr-0">
                      <div className="symbol symbol-50 symbol-light mt-1">
                        <span className="symbol-label">
                          <SVG
                            src={toAbsoluteUrl(
                              "/media/svg/avatars/018-girl-9.svg"
                            )}
                            className="h-75 align-self-end"
                          ></SVG>
                        </span>
                      </div>
                    </td>
                    <td className="pl-0">
                      <a
                        href="#"
                        className="text-dark-75 font-weight-bolder text-hover-primary mb-1 font-size-lg"
                      >
                        Jessie Clarcson
                      </a>
                      <span className="text-muted font-weight-bold text-muted d-block">
                        Lebanon
                      </span>
                    </td>
                    <td>
                      <span className="text-dark-75 font-weight-bolder d-block font-size-lg">
                        Female
                      </span>
                      <span className="text-muted font-weight-bold">
                        32 Years Old
                      </span>
                    </td>
                    <td>
                      <div className="d-flex flex-column w-100 mr-2">
                        <div className="d-flex align-items-center justify-content-between mb-2">
                          <span className="text-muted mr-2 font-size-sm font-weight-bold">
                            83%
                          </span>
                          <span className="text-muted font-size-sm font-weight-bold">
                            Progress
                          </span>
                        </div>
                        <div className="progress progress-xs w-100">
                          <div
                            className="progress-bar bg-success"
                            role="progressbar"
                            style={{ width: "83%" }}
                            aria-valuenow="50"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                      </div>
                    </td>

                    <td className="pr-0 text-right">
                      <Link
                        className="btn btn-icon btn-light btn-hover-primary btn-sm mx-3"
                        to="/client-records/client-record-form"
                      >
                        <span className="svg-icon svg-icon-md svg-icon-primary">
                          <SVG
                            src={toAbsoluteUrl(
                              "/media/svg/icons/Communication/Write.svg"
                            )}
                          ></SVG>
                        </span>
                      </Link>

                      <a
                        href="#"
                        className="btn btn-icon btn-light btn-hover-primary btn-sm"
                      >
                        <span className="svg-icon svg-icon-md svg-icon-primary">
                          <SVG
                            src={toAbsoluteUrl(
                              "/media/svg/icons/General/Trash.svg"
                            )}
                          ></SVG>
                        </span>
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td className="pl-0">
                      <label className="checkbox checkbox-lg checkbox-single">
                        <input type="checkbox" value="1" />
                        <span></span>
                      </label>
                    </td>
                    <td className="pr-0">
                      <div className="symbol symbol-50 symbol-lightv mt-1">
                        <span className="symbol-label">
                          <SVG
                            src={toAbsoluteUrl(
                              "/media/svg/avatars/047-girl-25.svg"
                            )}
                            className="h-75 align-self-end"
                          ></SVG>
                        </span>
                      </div>
                    </td>
                    <td className="pl-0">
                      <a
                        href="#"
                        className="text-dark-75 font-weight-bolder text-hover-primary mb-1 font-size-lg"
                      >
                        Lebron Wayde
                      </a>
                      <span className="text-muted font-weight-bold text-muted d-block">
                        Afganistan
                      </span>
                    </td>
                    <td>
                      <span className="text-dark-75 font-weight-bolder d-block font-size-lg">
                        Male
                      </span>
                      <span className="text-muted font-weight-bold">
                        19 Years Old
                      </span>
                    </td>
                    <td>
                      <div className="d-flex flex-column w-100 mr-2">
                        <div className="d-flex align-items-center justify-content-between mb-2">
                          <span className="text-muted mr-2 font-size-sm font-weight-bold">
                            47%
                          </span>
                          <span className="text-muted font-size-sm font-weight-bold">
                            Progress
                          </span>
                        </div>
                        <div className="progress progress-xs w-100">
                          <div
                            className="progress-bar bg-primary"
                            role="progressbar"
                            style={{ width: "83%" }}
                            aria-valuenow="50"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="pr-0 text-right">
                      <Link
                        className="btn btn-icon btn-light btn-hover-primary btn-sm mx-3"
                        to="/client-records/client-record-form"
                      >
                        <span className="svg-icon svg-icon-md svg-icon-primary">
                          <SVG
                            src={toAbsoluteUrl(
                              "/media/svg/icons/Communication/Write.svg"
                            )}
                          ></SVG>
                        </span>
                      </Link>
                      <a
                        href="#"
                        className="btn btn-icon btn-light btn-hover-primary btn-sm"
                      >
                        <span className="svg-icon svg-icon-md svg-icon-primary">
                          <SVG
                            src={toAbsoluteUrl(
                              "/media/svg/icons/General/Trash.svg"
                            )}
                          ></SVG>
                        </span>
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td className="pl-0">
                      <label className="checkbox checkbox-lg checkbox-single">
                        <input type="checkbox" value="1" />
                        <span></span>
                      </label>
                    </td>
                    <td className="pr-0">
                      <div className="symbol symbol-50 symbol-light  mt-1">
                        <span className="symbol-label">
                          <SVG
                            src={toAbsoluteUrl(
                              "/media/svg/avatars/014-girl-7.svg"
                            )}
                            className="h-75 align-self-end"
                          ></SVG>
                        </span>
                      </div>
                    </td>
                    <td className="pl-0">
                      <a
                        href="#"
                        className="text-dark-75 font-weight-bolder text-hover-primary mb-1 font-size-lg"
                      >
                        Natali Trump
                      </a>
                      <span className="text-muted font-weight-bold text-muted d-block">
                        Kuwait
                      </span>
                    </td>
                    <td>
                      <span className="text-dark-75 font-weight-bolder d-block font-size-lg">
                        Female
                      </span>
                      <span className="text-muted font-weight-bold">
                        29 Years Old
                      </span>
                    </td>
                    <td>
                      <div className="d-flex flex-column w-100 mr-2">
                        <div className="d-flex align-items-center justify-content-between mb-2">
                          <span className="text-muted mr-2 font-size-sm font-weight-bold">
                            71%
                          </span>
                          <span className="text-muted font-size-sm font-weight-bold">
                            Progress
                          </span>
                        </div>
                        <div className="progress progress-xs w-100">
                          <div
                            className="progress-bar bg-danger"
                            role="progressbar"
                            style={{ width: "71%" }}
                            aria-valuenow="50"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="pr-0 text-right">
                      <Link
                        className="btn btn-icon btn-light btn-hover-primary btn-sm mx-3"
                        to="/client-records/client-record-form"
                      >
                        <span className="svg-icon svg-icon-md svg-icon-primary">
                          <SVG
                            src={toAbsoluteUrl(
                              "/media/svg/icons/Communication/Write.svg"
                            )}
                          ></SVG>
                        </span>
                      </Link>
                      <a
                        href="#"
                        className="btn btn-icon btn-light btn-hover-primary btn-sm"
                      >
                        <span className="svg-icon svg-icon-md svg-icon-primary">
                          <SVG
                            src={toAbsoluteUrl(
                              "/media/svg/icons/General/Trash.svg"
                            )}
                          ></SVG>
                        </span>
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            {/* end::Table */}
          </div>
        </div>
      </div>
      {/* end::Body */}
    </div>
  );
}
