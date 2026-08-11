import { Navigate, Outlet } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";
import WebsiteForm from "../pages/WebsiteForm";
function AdminLayout() {
  return (
    <>
      <div className="layout">
        <AdminSidebar />
        <div className="right">
          <Header></Header>
          <div className="main-page">
            <Outlet />
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default AdminLayout;
