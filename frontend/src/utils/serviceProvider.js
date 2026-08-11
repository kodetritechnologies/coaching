import axios from "axios";
import { cookies } from "next/headers";
export const serviceProvider = async () => {
  const baseUrl = process.env.API_URL;
  let token = undefined;
  try {
    const getCookies = await cookies();
    token = getCookies.get("customerAccessToken")?.value;
  } catch (error) {
    console.warn("Cookies are not available in this context.");
  }
  function getHeaders(data) {
    let headers = {};
    if (data instanceof FormData) {
      headers["Content-Type"] = "multipart/form-data";
    } else {
      headers["Content-Type"] = "application/json";
    }

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    return { withCredentials: true, headers: headers };
  }

  const getMethod = async (endpoint) => {
    const config = getHeaders({});
    try {
      const response = await axios.get(`${baseUrl}/api/${endpoint}`, config);
      return response?.data;
    } catch (error) {
      console.log("error response", error);
      return error.response.data;
    }
  };

  const postMethod = async (endpoint, data) => {
    const config = getHeaders(data);
    try {
      const response = await axios.post(
        `${baseUrl}/api/${endpoint}`,
        data,
        config,
      );
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  };

  const patchMethod = async (endpoint, data) => {
    const config = getHeaders(data);
    try {
      const response = await axios.patch(
        `${baseUrl}/api/${endpoint}`,
        data,
        config,
      );
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  };

  const deleteMethod = async (endpoint, data) => {
    const config = getHeaders(data);
    try {
      const response = await axios.delete(`${baseUrl}/api/${endpoint}`, config);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  };

  return {
    getMethod,
    postMethod,
    patchMethod,
    deleteMethod,
  };
};
