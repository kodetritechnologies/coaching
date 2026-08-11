// 01-jan-2026
export const formatDate = (dateInput, options = { includeYear: true, monthFormat: "short" }) => {
  if (!dateInput) return "";

  const date = new Date(dateInput);
  const day = date.getDate();
  const year = date.getFullYear();

  const shortMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const longMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const month = options.monthFormat === "long" ? longMonths[date.getMonth()] : shortMonths[date.getMonth()];

  if (options.includeYear) {
    return `${day} ${month} ${year}`;
  }
  return `${day} ${month}`;
};
