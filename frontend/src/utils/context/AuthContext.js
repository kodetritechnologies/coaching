"use client";
import { createContext, useEffect, useState } from "react";
import BasicProvider from "../BasicProvider";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const basicProvider = BasicProvider();
  const [user, setUser] = useState(null);
  const router = useRouter();

  const getUser = async () => {
    try {
      const resposne = await basicProvider.getMethod("users/customer/profile");
      if (resposne.status == "success") {
        const fullName = resposne?.data?.name?.split(" ");
        setUser({ ...resposne?.data, first_name: fullName[0], last_name: fullName[1] });
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const logout = async () => {
    try {
      const response = await basicProvider.getMethod("users/customer/logout");
      if (response.status === "success") {
        toast.success(response?.message || "Logged out successfully");
        router.push("/");
      } else {
        toast.error(response.message || "Logout failed");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred during logout");
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, getUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
