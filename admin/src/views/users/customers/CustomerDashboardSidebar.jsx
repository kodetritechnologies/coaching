import { CgProfile } from "react-icons/cg";
import {
  FaAddressCard,
  FaBox,
  FaBoxOpen,
  FaHeart,
  FaShoppingCart,
  FaStar,
} from "react-icons/fa";
import { IoTicketOutline } from "react-icons/io5";
import { MdDashboard, MdSupportAgent } from "react-icons/md";

import { NavLink, Outlet, useParams } from "react-router-dom";
import BasicProvider from "../../../authentications/BasicProvider";
import { useEffect, useState } from "react";

function CustomerDashboardSidebar() {
  const basicProvider = BasicProvider();
  const { id } = useParams();
  const [initialValues, setInitialValues] = useState({});

  const fetchData = async () => {
    const response = await basicProvider.getMethod(
      `users/owner/admin/byId/${id}`
    );
    if (response.status === "success") {
      setInitialValues(response.data);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  return (
    <div className="adminDashboardPage flex">
      <div className="adminLeft cp">
        <div className="adminProfile cmt">
          <img
            src={`${
              initialValues?.featured_image?.url
                ? initialValues?.featured_image?.url
                : "/user.png"
            }`}
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              border: "1px solid gray",
              objectFit: "contain",
            }}
            alt=""
          />
          <div>
            <div> {initialValues.name}</div>
            <div> {initialValues.email}</div>
          </div>
        </div>
        <hr className="horizontalRuler" />
        <div className="adminsidbarashboard">
          <ul>
            <li className="flex items-center gap-4">
              <MdDashboard /> <NavLink to="">Dashboard</NavLink>
            </li>

            <li className="flex items-center gap-4">
              <CgProfile /> <NavLink to="profile">Profile</NavLink>
            </li>

            <li className="flex items-center gap-4">
              <FaBox /> <NavLink to="orders">Orders</NavLink>
            </li>
            <li className="flex items-center gap-4">
              <FaHeart />
              <NavLink to="wishlist">Wishlists</NavLink>
            </li>

            <li className="flex items-center gap-4">
              <FaShoppingCart />
              <NavLink to="cart">Cart</NavLink>
            </li>

            <li className="flex items-center gap-4">
              <FaStar />
              <NavLink to="reviews">Reviews</NavLink>
            </li>

            <li className="flex items-center gap-4">
              <FaAddressCard />
              <NavLink to="addresses">Addresses</NavLink>
            </li>

            <li className="flex items-center gap-4">
              <IoTicketOutline />
              <NavLink to="coupons">Coupons</NavLink>
            </li>

            <li className="flex items-center gap-4">
              <MdSupportAgent />
              <NavLink to="support-tickets">Support Tickets</NavLink>
            </li>
          </ul>
        </div>
      </div>
      <div className="adminRight">
        <Outlet />
      </div>
    </div>
  );
}

export default CustomerDashboardSidebar;
