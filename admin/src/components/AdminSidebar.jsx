import { useState } from "react";
import { AiFillDatabase } from "react-icons/ai";
import { BsGrid3X3GapFill } from "react-icons/bs";
import { FaQuoteLeft, FaRegNewspaper, FaUsers } from "react-icons/fa";
import { FaBasketShopping, FaBox } from "react-icons/fa6";
import { GrGallery, GrUserAdmin } from "react-icons/gr";
import {
  IoIosArrowBack,
  IoIosArrowForward,
  IoMdNotifications,
} from "react-icons/io";
import {
  IoDocumentTextSharp,
  IoListOutline,
  IoSettings,
  IoTicket,
} from "react-icons/io5";
import {
  MdEmail,
  MdOutlineMessage,
  MdReviews,
  MdSupportAgent,
} from "react-icons/md";
import { RiContactsBook3Fill } from "react-icons/ri";
import { SiFiles } from "react-icons/si";
import { TfiLayoutSlider } from "react-icons/tfi";
import { NavLink } from "react-router-dom";

function AdminSidebar() {
  const [show, setShow] = useState(false);
  const [type, setType] = useState("");
  const [cms, setCms] = useState(false);
  const handleDropdown = (menuType) => {
    if (type === menuType) {
      setShow(!show);
    } else {
      setType(menuType);
      setShow(true);
    }
  };

  return (
    <div className="admin-sidebar">
      <NavLink to="/" className="sidebar-title cursor-pointer">
        <GrUserAdmin className="font-extrabold text-3xl" />
        <span className="">Admin Dashboard</span>
      </NavLink>
      <div className="sideMain">
        <div className="side_links">
          <h3>ECOMMERCE</h3>
          <ul>
            <li
              onClick={() => {
                handleDropdown("item");
                setType("item");
              }}
            >
              <span>
                <FaBasketShopping />
                Item
              </span>
              <IoIosArrowForward
                className="arrow"
                style={{
                  transform: `${show && type == "item" ? "rotate(90deg)" : ""}`,
                }}
              />
            </li>
            <ul
              className="inner_sidelinks"
              style={{
                display: show && type == "item" ? "inline-block" : "none",
              }}
            >
              <li>
                <NavLink to="ecommerce/item/all">
                  <span>All Item</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="ecommerce/item/create">
                  <span>Add Item</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="ecommerce/item/trash">
                  <span>Trash Item</span>
                </NavLink>
              </li>
            </ul>
            <li
              onClick={() => {
                handleDropdown("order");
                setType("order");
              }}
            >
              <span>
                <FaBox />
                Orders
              </span>

              <IoIosArrowForward
                className="arrow"
                style={{
                  transform: `${
                    show && type == "order" ? "rotate(90deg)" : ""
                  }`,
                }}
              />
            </li>
            <ul
              className="inner_sidelinks"
              style={{
                display: show && type == "order" ? "inline-block" : "none",
              }}
            >
              <li>
                <NavLink to="ecommerce/order/all">
                  <span>All Orders</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="ecommerce/order/trash">
                  <span>Trash Orders</span>
                </NavLink>
              </li>
            </ul>
            <li
              onClick={() => {
                handleDropdown("coupons");
                setType("coupons");
              }}
            >
              <span>
                <IoTicket />
                Coupons
              </span>
              <IoIosArrowForward
                className="arrow"
                style={{
                  transform: `${
                    show && type == "coupons" ? "rotate(90deg)" : ""
                  }`,
                }}
              />
            </li>
            <ul
              className="inner_sidelinks"
              style={{
                display: show && type == "coupons" ? "inline-block" : "none",
              }}
            >
              <li>
                <NavLink to="ecommerce/coupan/all">
                  <span>All Coupons</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="ecommerce/coupan/create">
                  <span>Add Coupons</span>
                </NavLink>
              </li>
            </ul>
            <li>
              <NavLink to="ecommerce/notifications" className="customeRoute">
                <span>
                  <IoMdNotifications />
                  Notifications
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink to="ecommerce/reviews" className="customeRoute">
                <span>
                  <MdReviews />
                  All Reviews
                </span>
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="side_links">
          <ul>
            <li
              onClick={() => {
                handleDropdown("cms");
                setType("cms");
              }}
            >
              <span>
                <BsGrid3X3GapFill />
                CMS
              </span>

              <IoIosArrowForward
                className="arrow"
                style={{
                  transform: `${show && type == "cms" ? "rotate(90deg)" : ""}`,
                }}
              />
            </li>
            <ul
              className="cms_sidelinks"
              style={{
                display:
                  show && type == "cms"
                    ? "inline-block"
                    : cms
                      ? "inline-block"
                      : "none",
              }}
            >
              <li
                onClick={() => {
                  handleDropdown("pages");
                  setType("pages");
                  setCms(true);
                }}
              >
                <span>
                  <IoDocumentTextSharp />
                  Pages
                </span>
                <IoIosArrowForward
                  className="arrow"
                  style={{
                    transform: `${
                      show && type == "pages" ? "rotate(90deg)" : ""
                    }`,
                  }}
                />
              </li>
              <ul
                className="inner_sidelinks"
                style={{
                  display: show && type == "pages" ? "inline-block" : "none",
                }}
              >
                <li>
                  <NavLink to="cms/page/all">
                    <span>All Pages</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="cms/page/create">
                    <span>Add Pages</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="cms/page/trash">
                    <span>Trash Pages</span>
                  </NavLink>
                </li>
              </ul>
              <li
                onClick={() => {
                  handleDropdown("posts");
                  setType("posts");
                  setCms(true);
                }}
              >
                <span>
                  <FaRegNewspaper />
                  Posts
                </span>
                <IoIosArrowForward
                  className="arrow"
                  style={{
                    transform: `${
                      show && type == "posts" ? "rotate(90deg)" : ""
                    }`,
                  }}
                />
              </li>
              <ul
                className="inner_sidelinks"
                style={{
                  display: show && type == "posts" ? "inline-block" : "none",
                }}
              >
                <li>
                  <NavLink to="cms/post/all">
                    <span>All Posts</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="cms/post/create">
                    <span>Add Posts</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="cms/post/trash">
                    <span>Trash Posts</span>
                  </NavLink>
                </li>
              </ul>
              <li
                onClick={() => {
                  handleDropdown("gallery");
                  setType("gallery");
                  setCms(true);
                }}
              >
                <span>
                  <GrGallery />
                  Gallery
                </span>
                <IoIosArrowForward
                  className="arrow"
                  style={{
                    transform: `${
                      show && type == "gallery" ? "rotate(90deg)" : ""
                    }`,
                  }}
                />
              </li>
              <ul
                className="inner_sidelinks"
                style={{
                  display: show && type == "gallery" ? "inline-block" : "none",
                }}
              >
                <li>
                  <NavLink to="cms/gallery/all">
                    <span>All Gallery</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="cms/gallery/create">
                    <span>Create Gallery</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="cms/gallery/trash">
                    <span>Trash Gallery</span>
                  </NavLink>
                </li>
              </ul>
              <li
                onClick={() => {
                  handleDropdown("slider");
                  setType("slider");
                  setCms(true);
                }}
              >
                <span>
                  <TfiLayoutSlider />
                  Sliders
                </span>
                <IoIosArrowForward
                  className="arrow"
                  style={{
                    transform: `${
                      show && type == "slider" ? "rotate(90deg)" : ""
                    }`,
                  }}
                />
              </li>
              <ul
                className="inner_sidelinks"
                style={{
                  display: show && type == "slider" ? "inline-block" : "none",
                }}
              >
                <li>
                  <NavLink to="cms/sliders/all">
                    <span>All Sliders</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="cms/sliders/create">
                    <span>Create Sliders</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="cms/sliders/trash">
                    <span>Trash Sliders</span>
                  </NavLink>
                </li>
              </ul>
              <li
                onClick={() => {
                  handleDropdown("contact");
                  setType("contact");
                  setCms(true);
                }}
              >
                <span>
                  <RiContactsBook3Fill />
                  Contacts
                </span>
                <IoIosArrowForward
                  className="arrow"
                  style={{
                    transform: `${
                      show && type == "contact" ? "rotate(90deg)" : ""
                    }`,
                  }}
                />
              </li>
              <ul
                className="inner_sidelinks"
                style={{
                  display: show && type == "contact" ? "inline-block" : "none",
                }}
              >
                <li>
                  <NavLink to="cms/contact/all">
                    <span>All Contacts</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="cms/contact/trash">
                    <span>Trash Contacts</span>
                  </NavLink>
                </li>
              </ul>
              <li
                onClick={() => {
                  handleDropdown("testimonials");
                  setType("testimonials");
                  setCms(true);
                }}
              >
                <span>
                  <MdOutlineMessage />
                  Testimonials
                </span>
                <IoIosArrowForward
                  className="arrow"
                  style={{
                    transform: `${
                      show && type == "testimonials" ? "rotate(90deg)" : ""
                    }`,
                  }}
                />
              </li>
              <ul
                className="inner_sidelinks"
                style={{
                  display:
                    show && type == "testimonials" ? "inline-block" : "none",
                }}
              >
                <li>
                  <NavLink to="cms/testimonials/all">
                    <span>All Testimonials</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="cms/testimonials/create">
                    <span>Create Testimonials</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="cms/testimonials/trash">
                    <span>Trash Testimonials</span>
                  </NavLink>
                </li>
              </ul>
              <li
                onClick={() => {
                  handleDropdown("faq");
                  setType("faq");
                  setCms(true);
                }}
              >
                <span>
                  <FaQuoteLeft />
                  FAQs
                </span>
                <IoIosArrowForward
                  className="arrow"
                  style={{
                    transform: `${
                      show && type == "faq" ? "rotate(90deg)" : ""
                    }`,
                  }}
                />
              </li>
              <ul
                className="inner_sidelinks"
                style={{
                  display: show && type == "faq" ? "inline-block" : "none",
                }}
              >
                <li>
                  <NavLink to="cms/faq/all">
                    <span>All FAQs</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="cms/faq/create">
                    <span>Create FAQs</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="cms/faq/trash">
                    <span>Trash FAQs</span>
                  </NavLink>
                </li>
              </ul>
              <li
                onClick={() => {
                  handleDropdown("latestNotices");
                  setType("latestNotices");
                  setCms(true);
                }}
              >
                <span>
                  <FaQuoteLeft />
                  Latest Notices
                </span>
                <IoIosArrowForward
                  className="arrow"
                  style={{
                    transform: `${
                      show && type == "latestNotices" ? "rotate(90deg)" : ""
                    }`,
                  }}
                />
              </li>
              <ul
                className="inner_sidelinks"
                style={{
                  display: show && type == "latestNotices" ? "inline-block" : "none",
                }}
              >
                <li>
                  <NavLink to="cms/latest-notices/all">
                    <span>All Notices</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="cms/latest-notices/create">
                    <span>Create Notice</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="cms/latest-notices/trash">
                    <span>Trash Notices</span>
                  </NavLink>
                </li>
              </ul>
              <li
                onClick={() => {
                  handleDropdown("navigation");
                  setType("navigation");
                  setCms(true);
                }}
              >
                <span>
                  <IoListOutline />
                  Navigation
                </span>
                <IoIosArrowForward
                  className="arrow"
                  style={{
                    transform: `${
                      show && type == "navigation" ? "rotate(90deg)" : ""
                    }`,
                  }}
                />
              </li>
              <ul
                className="inner_sidelinks"
                style={{
                  display: show && type == "navigation" ? "inline-block" : "none",
                }}
              >
                <li>
                  <NavLink to="cms/navigation/all">
                    <span>All Navigation</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="cms/navigation/create">
                    <span>Create Navigation</span>
                  </NavLink>
                </li>
              </ul>
              <li>
                <NavLink to="cms/files/all">
                  <span className="flex items-center justify-between cpl cpr gap-4 font-thin font-weight-100">
                    <SiFiles />
                    Files
                  </span>
                </NavLink>
              </li>
            </ul>
          </ul>
        </div>
        <div className="side_links">
          <h3>CONFIGURATION</h3>
          <ul>
            <li
              onClick={() => {
                handleDropdown("settings");
                setType("settings");
              }}
            >
              <span>
                <IoSettings />
                Settings
              </span>
              <IoIosArrowForward
                className="arrow"
                style={{
                  transform: `${
                    show && type == "settings" ? "rotate(90deg)" : ""
                  }`,
                }}
              />
            </li>
            <ul
              className="inner_sidelinks"
              style={{
                display: show && type == "settings" ? "inline-block" : "none",
              }}
            >
              <li>
                <NavLink to="setting/payment-gatway" className="customeRoute">
                  <span>Payment Gateway</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="setting/website" className="customeRoute">
                  <span>Website Setting</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="setting/store-setting" className="customeRoute">
                  <span>Store Settings</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="setting/footer-setting" className="customeRoute">
                  <span>Footer Settings</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="setting/smtp-setting" className="customeRoute">
                  <span>SMTP Settings</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="setting/currency-setting" className="customeRoute">
                  <span>Currency Settings</span>
                </NavLink>
              </li>
            </ul>
            <li
              onClick={() => {
                handleDropdown("master");
                setType("master");
              }}
            >
              <span>
                <AiFillDatabase />
                Master
              </span>
              <IoIosArrowForward
                className="arrow"
                style={{
                  transform: `${
                    show && type == "master" ? "rotate(90deg)" : ""
                  }`,
                }}
              />
            </li>
            <ul
              className="inner_sidelinks"
              style={{
                display: show && type == "master" ? "inline-block" : "none",
              }}
            >
              <li>
                <NavLink to="master/categories" className="customeRoute">
                  <span>Categories</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="master/brands" className="customeRoute">
                  <span>Brands</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="master/regions" className="customeRoute">
                  <span>Regions</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="master/tages" className="customeRoute">
                  <span>Tages</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="master/status" className="customeRoute">
                  <span>Status</span>
                </NavLink>
              </li>
            </ul>
          </ul>
        </div>
        <div className="side_links">
          <h3>SUPPORT</h3>
          <ul>
            <li>
              <NavLink to="support/support-ticket" className="customeRoute">
                <span>
                  <MdSupportAgent />
                  Support Ticket
                </span>
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="side_links">
          <h3>USERS</h3>
          <ul>
            <li
              onClick={() => {
                handleDropdown("customer");
                setType("customer");
              }}
            >
              <span>
                <FaUsers />
                Customers
              </span>
              <IoIosArrowForward
                className="arrow"
                style={{
                  transform: `${
                    show && type == "customer" ? "rotate(90deg)" : ""
                  }`,
                }}
              />
            </li>
            <ul
              className="inner_sidelinks"
              style={{
                display: show && type == "customer" ? "inline-block" : "none",
              }}
            >
              <li>
                <NavLink to="customer/all" className="customeRoute">
                  <span>All Customers</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="customer/create" className="customeRoute">
                  <span>Add Customers</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="customer/trash" className="customeRoute">
                  <span>Trash Customers</span>
                </NavLink>
              </li>
            </ul>
          </ul>
        </div>
        <div className="side_links">
          <h3>LOGS</h3>
          <ul>
            <li>
              <NavLink to="log/admin-logs" className="customeRoute">
                <span>
                  <MdEmail />
                  Admin Logs
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink to="log/mail-logs" className="customeRoute">
                <span>
                  <MdEmail />
                  Mail Logs
                </span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
      <div className="sideclose">
        <IoIosArrowBack />
      </div>
    </div>
  );
}

export default AdminSidebar;
