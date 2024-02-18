import React from "react";
import { Link } from "react-router-dom";
import { toAbsoluteUrl } from "../../../../../_metronic/_helpers";
import { useTheme } from "@material-ui/core";
import { Tabs } from "@material-ui/core";
import { Tab } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";

import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import PeopleIcon from "@material-ui/icons/People";
import DirectionsIcon from "@material-ui/icons/Directions";



function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
};

export function ReferenceInfoManagementForm(props) {
  const theme = useTheme();

  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  function handleChangeIndex(index) {
    setValue(index);
  }
  return (
    <form className="card card-custom card-stretch">
      {/* begin::Header */}
      <div className="card-header py-3">
        <div className="card-title align-items-start flex-column">
          <h3 className="card-label font-weight-bolder text-dark">
            User Information
          </h3>
          <span className="text-muted font-weight-bold font-size-sm mt-1">
            Update user information
          </span>
        </div>
        <div className="card-toolbar">
          <button type="submit" className="btn btn-success mr-2">
            Save Changes
          </button>
          <Link
            to="/user-management/manage-user/users-table"
            className="btn btn-secondary"
          >
            Cancel
          </Link>
        </div>
      </div>
      {/* end::Header */}
      {/* begin::Form */}
      <div className="form">
        {/* begin::Body */}
        <div className="card-body">
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-12 col-lg-4 col-md-12">
                <div className="form-group row">
                  <label className="col-xl-3 col-lg-3">First Name</label>
                  <div className="col-lg-9 col-xl-6">
                    <input
                      type="text"
                      placeholder="First name"
                      className={`form-control form-control-lg form-control-solid`}
                      name="firstname"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-xl-3 col-lg-3 col-form-label">
                    Last Name
                  </label>
                  <div className="col-lg-9 col-xl-6">
                    <input
                      type="text"
                      placeholder="Last name"
                      className={`form-control form-control-lg form-control-solid`}
                      name="lastname"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-xl-3 col-lg-3 col-form-label">
                    Date of Birth
                  </label>
                  <div className="col-lg-9 col-xl-6">
                    <input
                      type="date"
                      placeholder="dd-mm-yyyy"
                      className={`form-control form-control-lg form-control-solid`}
                      name="dob"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-xl-3 col-lg-3 col-form-label">
                    Country
                  </label>
                  <div className="col-lg-9 col-xl-6">
                    <input
                      type="text"
                      placeholder="Country"
                      className={`form-control form-control-lg form-control-solid`}
                      name="country"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-xl-3 col-lg-3 col-form-label">
                    Contact Phone
                  </label>
                  <div className="col-lg-9 col-xl-6">
                    <div className="input-group input-group-lg input-group-solid">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="fa fa-phone"></i>
                        </span>
                      </div>
                      <input
                        type="text"
                        placeholder="+1(123)112-11-11"
                        className={`form-control form-control-lg form-control-solid`}
                        name="phone"
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-xl-3 col-lg-3 col-form-label">
                    Email Address
                  </label>
                  <div className="col-lg-9 col-xl-6">
                    <div className="input-group input-group-lg input-group-solid">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="fa fa-at"></i>
                        </span>
                      </div>
                      <input
                        type="email"
                        placeholder="Email"
                        className={`form-control form-control-lg form-control-solid`}
                        name="email"
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-xl-3 col-lg-3 col-form-label">
                    Address
                  </label>
                  <div className="col-lg-9 col-xl-6">
                    <div className="input-group input-group-lg input-group-solid">
                      <textarea                       
                        className={`form-control form-control-lg form-control-solid`}
                        name="address"
                        rows="2"
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-xl-3 col-lg-3 col-form-label">
                    Photo
                  </label>
                  <div className="col-lg-9 col-xl-6">
                    <div
                      className="image-input image-input-outline"
                      id="kt_profile_avatar"
                      style={{
                        backgroundImage: `url(${toAbsoluteUrl(
                          "/media/users/blank.png"
                        )}`,
                      }}
                    >
                      <div className="image-input-wrapper" />
                      <label
                        className="btn btn-xs btn-icon btn-circle btn-white btn-hover-text-primary btn-shadow"
                        data-action="change"
                        data-toggle="tooltip"
                        title=""
                        data-original-title="Change avatar"
                      >
                        <i className="fa fa-pen icon-sm text-muted"></i>
                        <input
                          type="file"
                          // name="pic"
                          accept=".png, .jpg, .jpeg"
                          // {...formik.getFieldProps("pic")}
                        />
                        <input type="hidden" name="profile_avatar_remove" />
                      </label>
                      <span
                        className="btn btn-xs btn-icon btn-circle btn-white btn-hover-text-primary btn-shadow"
                        data-action="cancel"
                        data-toggle="tooltip"
                        title=""
                        data-original-title="Cancel avatar"
                      >
                        <i className="ki ki-bold-close icon-xs text-muted"></i>
                      </span>
                      <span
                        className="btn btn-xs btn-icon btn-circle btn-white btn-hover-text-primary btn-shadow"
                        data-action="remove"
                        data-toggle="tooltip"
                        title=""
                        data-original-title="Remove avatar"
                      >
                        <i className="ki ki-bold-close icon-xs text-muted"></i>
                      </span>
                    </div>
                    <span className="form-text text-muted">
                      Allowed file types: png, jpg, jpeg.
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-sm-12 col-lg-8 col-md-12">
                {/* begin: Client Case Management Info */}
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons="on"
                    indicatorColor="primary"
                    textColor="primary"
                  >
                    <Tab
                      label="User Info 1"
                      icon={<LibraryBooksIcon />}
                    />
                    <Tab label="User Info 2" icon={<PeopleIcon />} />
                    <Tab
                      label="User Info 3"
                      icon={<DirectionsIcon />}
                    />
                  </Tabs>
                  <SwipeableViews
                    index={value}
                    onChangeIndex={handleChangeIndex}
                  >

                    <TabContainer dir={theme.direction}>
                      <div className="form-group row">
                        <label className="col-xl-3 col-lg-3">Engagement Purpose</label>
                        <div className="col-lg-9 col-xl-6">
                        <textarea  className={`form-control form-control-lg form-control-solid`}
                          name="engagement_purpose" rows="2"></textarea>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-xl-3 col-lg-3 col-form-label">
                          Engagement Discussion
                        </label>
                        <div className="col-lg-9 col-xl-6">
                        <textarea  className={`form-control form-control-lg form-control-solid`}
                          name="engagement_discussion" rows="2"></textarea>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-xl-3 col-lg-3 col-form-label">
                          Actions &amp; Ownership
                        </label>
                        <div className="col-lg-9 col-xl-6">
                        <textarea  className={`form-control form-control-lg form-control-solid`}
                          name="actions_and_ownership" rows="2"></textarea>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-xl-3 col-lg-3 col-form-label">
                          Next Appointment Date/Time
                        </label>
                        <div className="col-lg-9 col-xl-6">
                        <textarea  className={`form-control form-control-lg form-control-solid`}
                          name="next_appointment_dt_time" rows="2"></textarea>
                        </div>
                      </div>
                    </TabContainer>
                    
                    <TabContainer dir={theme.direction}>
                      <div className="form-group row">
                        <label className="col-xl-3 col-lg-3">Relationship Status</label>
                        <div className="col-lg-9 col-xl-6">
                        <textarea  className={`form-control form-control-lg form-control-solid`}
                          name="relationship_status" rows="2"></textarea>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-xl-3 col-lg-3 col-form-label">
                          Client History
                        </label>
                        <div className="col-lg-9 col-xl-6">
                        <textarea  className={`form-control form-control-lg form-control-solid`}
                          name="client_history" rows="2"></textarea>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-xl-3 col-lg-3 col-form-label">
                          Spouse History
                        </label>
                        <div className="col-lg-9 col-xl-6">
                        <textarea  className={`form-control form-control-lg form-control-solid`}
                          name="spouse_history" rows="2"></textarea>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-xl-3 col-lg-3 col-form-label">
                          Children History
                        </label>
                        <div className="col-lg-9 col-xl-6">
                        <textarea  className={`form-control form-control-lg form-control-solid`}
                          name="children_history" rows="2"></textarea>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-xl-3 col-lg-3 col-form-label">
                          Custody Legal Status
                        </label>
                        <div className="col-lg-9 col-xl-6">
                        <textarea  className={`form-control form-control-lg form-control-solid`}
                          name="custody_legal_status" rows="2"></textarea>
                        </div>
                      </div>     
                      <div className="form-group row">
                        <label className="col-xl-3 col-lg-3 col-form-label">
                          Living Arrangement Support
                        </label>
                        <div className="col-lg-9 col-xl-6">
                        <textarea  className={`form-control form-control-lg form-control-solid`}
                          name="living_arrangement_support" rows="2"></textarea>
                        </div>
                      </div>   
                      <div className="form-group row">
                        <label className="col-xl-3 col-lg-3 col-form-label">
                          Family Inclusion Resolution
                        </label>
                        <div className="col-lg-9 col-xl-6">
                        <textarea  className={`form-control form-control-lg form-control-solid`}
                          name="living_arrangement_support" rows="2"></textarea>
                        </div>
                      </div>                
                    </TabContainer>
                    
                    
                    <TabContainer dir={theme.direction}>
                      <div className="form-group row">
                        <label className="col-xl-3 col-lg-3">Psycho Social Summary</label>
                        <div className="col-lg-9 col-xl-6">
                        <textarea  className={`form-control form-control-lg form-control-solid`}
                          name="phsycho_social_summary" rows="2"></textarea>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-xl-3 col-lg-3 col-form-label">
                          Durable Solution Discussion
                        </label>
                        <div className="col-lg-9 col-xl-6">
                        <textarea  className={`form-control form-control-lg form-control-solid`}
                          name="durable_solution_discussion" rows="2"></textarea>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-xl-3 col-lg-3 col-form-label">
                          Barriers &amp; Solutions
                        </label>
                        <div className="col-lg-9 col-xl-6">
                        <textarea  className={`form-control form-control-lg form-control-solid`}
                          name="barriers_and_solutions" rows="2"></textarea>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-xl-3 col-lg-3 col-form-label">
                          Durable Solution Identified
                        </label>
                        <div className="col-lg-9 col-xl-6">
                        <select defaultValue="0" name="durable_solution_id" className={`form-control form-control-lg form-control-solid`}>
                          <option value="0">Choose...</option>
                          <option value="1">Durable Solution 1</option>
                          <option value="2">Durable Solution 2</option>
                          <option value="3">Durable Solution 3</option>
                        </select>
                        </div>
                      </div>
                    </TabContainer>
                    
                    

                  </SwipeableViews>
                {/* end: Client Case Management Info */}
              </div>
            </div>
          </div>
        </div>
        {/* end::Body */}
      </div>

      {/* end::Form */}
    </form>
  );
}
