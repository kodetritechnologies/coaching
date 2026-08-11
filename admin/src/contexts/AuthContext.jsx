import { createContext, useEffect, useState } from "react";
import BasicProvider from "../authentications/BasicProvider";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const basicProvider = BasicProvider();
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [website, setWebsite] = useState(null);

  const getAdmin = async () => {
    try {
      const response = await basicProvider.getMethod("users/admin/getAdmin");
      if (response?.status === "success") {
        setAdmin(response?.data);
      } else {
        setAdmin(null);
      }
    } catch (error) {
      console.log(error);
      setAdmin(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchWebsiteData = async () => {
    try {
      const response = await basicProvider.getMethod("configuration/website");
      if (response.status === "success") {
        setWebsite(response.data);
      } else {
        setWebsite(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAdmin();
    fetchWebsiteData();
  }, []);
  return (
    <AuthContext
      value={{
        admin,
        setAdmin,
        loading,
        setLoading,
        website,
        setWebsite,
        getAdmin,
      }}
    >
      {children}
    </AuthContext>
  );
};
