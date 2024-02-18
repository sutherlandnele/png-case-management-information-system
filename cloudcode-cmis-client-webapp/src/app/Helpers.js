import Moment from "moment";

export const getDateString = (dateVal, format) => {
  return Moment(new Date(dateVal)).isValid()
    ? Moment(new Date(dateVal)).format(format)
    : "";
};


