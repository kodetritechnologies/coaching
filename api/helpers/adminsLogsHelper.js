import AdminLogs from "../models/dashboardlogs/adminlogs.schema.js";

export const adminsLogsHelper = async (req, desc) => {
  try {
    const { _id } = req.admin;
    const data = req.useragent;
    let ip_address = [];
    if (req.ip) {
      ip_address.push(req.ip);
    } else {
      ip_address = req.ips;
    }
    const payload = {
      description: desc,
      browser: data.browser,
      browser_version: data.version,
      ip_address,
      os: data.os,
      platform: data.platform,
      admin: _id,
    };

    const result = await AdminLogs.create(payload);
    return result;
  } catch (error) {
    return error;
  }
};
