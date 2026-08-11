import moment from "moment";

export const getDate = (date) => {
  const d = new Date(date);
  const da = d.getDate();
  return da < 10 ? `0${da}` : da;
};

export const getMonth = (date) => {
  const d = new Date(date);
  const monthString = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return (month = monthString[d.getMonth()]);
};

export const getYear = (date) => {
  const d = new Date(date);
  return d.getFullYear();
};

export const getTime = (date) => {
  const d = new Date(date);
  return d.toLocaleTimeString();
};

export const getDateTime = (date) => {
  const d = new Date(date);
  let da = d.getDate();
  let month = d.getMonth() + 1;
  let year = d.getFullYear();
  da = da < 10 ? `0${da}` : da;
  month = month < 10 ? `0${month}` : month;
  return da + "-" + month + "-" + year + " " + d.toLocaleTimeString();
};

export const currentYear = () => {
  return new Date().getFullYear();
};

export const DDMMYYYY = (date) => {
  const d = new Date(date);
  let da = d.getDate();
  let month = d.getMonth() + 1;
  let year = d.getFullYear();
  da = da < 10 ? `0${da}` : da;
  month = month < 10 ? `0${month}` : month;
  return da + "-" + month + "-" + year;
};

export const YYYYMMDD = (date) => {
  const d = new Date(date);
  let da = d.getDate();
  let month = d.getMonth() + 1;
  let year = d.getFullYear();
  da = da < 10 ? `0${da}` : da;
  month = month < 10 ? `0${month}` : month;
  return year + "-" + month + "-" + da;
};

export const DDMMMYYYY = (date) => {
  const d = new Date(date);
  const monthString = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let da = d.getDate();
  const month = monthString[d.getMonth()];
  const year = d.getFullYear();
  da = da < 10 ? `0${da}` : da;
  return da + "-" + month + "-" + year;
};

export const createdAt = (date) => {
  return new moment(date).fromNow();
};
