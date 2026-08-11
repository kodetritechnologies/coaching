import AdminLayout from "./layout/AdminLayout";
import DashboardPage from "./pages/DashboardPage";
import Items from "./views/ecommerce/items/All";
import ItemsCreate from "./views/ecommerce/items/Create";
import ItemsTrash from "./views/ecommerce/items/Trash";
import Orders from "./views/ecommerce/orders/All";
import OrdersDetails from "./views/ecommerce/orders/Details";
import OrdersTrash from "./views/ecommerce/orders/Trash";
import Notifications from "./views/ecommerce/notification/Notifications";
import Coupans from "./views/ecommerce/coupan/All";
import CoupansCreate from "./views/ecommerce/coupan/Create";
import Page from "./views/cms/pages/All";
import PageCreate from "./views/cms/pages/Create";
import PageTrash from "./views/cms/pages/Trash";
import PostPage from "./views/cms/posts/All";
import PostCreate from "./views/cms/posts/Create";
import PostTrash from "./views/cms/posts/Trash";
import GalleryPage from "./views/cms/gallery/All";
import GalleryCreate from "./views/cms/gallery/Create";
import GalleryTrash from "./views/cms/gallery/Trash";
import SliderPage from "./views/cms/slider/All";
import SliderCreate from "./views/cms/slider/Create";
import SliderTrash from "./views/cms/slider/Trash";
import FaqsPage from "./views/cms/faqs/All";
import FaqsCreate from "./views/cms/faqs/Create";
import FaqsTrash from "./views/cms/faqs/Trash";
import LatestNoticesPage from "./views/cms/latestNotices/All";
import LatestNoticesCreate from "./views/cms/latestNotices/Create";
import LatestNoticesTrash from "./views/cms/latestNotices/Trash";
import NavigationPage from "./views/cms/navigation/All";
import NavigationCreate from "./views/cms/navigation/Create";
import FilesPage from "./views/cms/files/All";
import ContactPage from "./views/cms/contacts/All";
import ContactTrash from "./views/cms/contacts/Trash";
import ContactDetails from "./views/cms/contacts/Details";
import TestimonialsPage from "./views/cms/testimonials/All";
import TestimonialsCreate from "./views/cms/testimonials/Create";
import TestimonialsTrash from "./views/cms/testimonials/Trash";
import PaymentSetting from "./views/configuration/settings/PaymentSetting";
import WebsiteSetting from "./views/configuration/settings/WebsiteSetting";
import StoreSetting from "./views/configuration/settings/StoreSetting";
import FooterSetting from "./views/configuration/settings/FooterSetting";
import SmtpSetting from "./views/configuration/settings/SmtpSetting";
import CurrencySetting from "./views/configuration/settings/CurrencySetting";
import Customer from "./views/users/customers/All";
import CustomerCreate from "./views/users/customers/Create";
import CustomerTrash from "./views/users/customers/Trash";
import AdminLogsPage from "./views/dashboardlogs/adminlogs/All";
import MailLogsPage from "./views/dashboardlogs/mailogs/All";
import MailLogsDetails from "./views/dashboardlogs/mailogs/Details";
import NotFoundPage from "./pages/NotFoundPage";
import ComingSoonPage from "./pages/ComingSoonPage";
import Tages from "./views/configuration/masters/Tags";
import Status from "./views/configuration/masters/Status";
import Brands from "./views/configuration/masters/Brands";
import Categories from "./views/configuration/masters/Categories";
import Regions from "./views/configuration/masters/Regions";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ProtectedRoutes from "./authentications/ProtectedRoutes";
import ProtectedPageRoutes from "./authentications/ProtectedPageRoutes";
import SupportTicket from "./views/support/supportTicket/All";
import SupportTicketDetails from "./views/support/supportTicket/SupportTicketDetails";
import GenerateSupportTicket from "./views/support/supportTicket/Create";
import Reviews from "./views/ecommerce/Reviews";
import Profile from "./pages/Profile";
import { createBrowserRouter } from "react-router-dom";
import { customerRouter } from "./views/users/customers/router";
import CustomerDashboardSidebar from "./views/users/customers/CustomerDashboardSidebar";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedPageRoutes>
        <AdminLayout />
      </ProtectedPageRoutes>
    ),
    children: [
      {
        path: "/",
        element: <DashboardPage />,
      },
      {
        path: "/ecommerce/item/all",
        element: <Items />,
      },
      {
        path: "/ecommerce/item/create",
        element: <ItemsCreate />,
      },
      {
        path: "/ecommerce/item/:id/edit",
        element: <ItemsCreate />,
      },
      {
        path: "/ecommerce/item/trash",
        element: <ItemsTrash />,
      },
      {
        path: "/ecommerce/order/all",
        element: <Orders />,
      },
      {
        path: "/ecommerce/order/details/:id",
        element: <OrdersDetails />,
      },
      {
        path: "/ecommerce/order/trash",
        element: <OrdersTrash />,
      },
      {
        path: "/ecommerce/coupan/all",
        element: <Coupans />,
      },
      {
        path: "/ecommerce/coupan/create",
        element: <CoupansCreate />,
      },
      { path: "/ecommerce/coupan/:id/edit", element: <CoupansCreate /> },

      { path: "/ecommerce/notifications", element: <Notifications /> },
      { path: "/ecommerce/notifications/:id/edit", element: <Notifications /> },

      { path: "/ecommerce/reviews", element: <Reviews /> },

      { path: "/cms/page/all", element: <Page /> },
      { path: "/cms/page/create", element: <PageCreate /> },
      { path: "/cms/page/edit/:id", element: <PageCreate /> },
      { path: "/cms/page/trash", element: <PageTrash /> },

      { path: "/cms/post/all", element: <PostPage /> },
      { path: "/cms/post/create", element: <PostCreate /> },
      { path: "/cms/post/:id/edit", element: <PostCreate /> },
      { path: "/cms/post/trash", element: <PostTrash /> },

      { path: "/cms/gallery/all", element: <GalleryPage /> },
      { path: "/cms/gallery/create", element: <GalleryCreate /> },
      { path: "/cms/gallery/:id/edit", element: <GalleryCreate /> },
      { path: "/cms/gallery/trash", element: <GalleryTrash /> },

      { path: "/cms/sliders/all", element: <SliderPage /> },
      { path: "/cms/sliders/create", element: <SliderCreate /> },
      { path: "/cms/sliders/:id/edit", element: <SliderCreate /> },
      { path: "/cms/sliders/trash", element: <SliderTrash /> },

      { path: "/cms/faq/all", element: <FaqsPage /> },
      { path: "/cms/faq/create", element: <FaqsCreate /> },
      { path: "/cms/faq/:id/edit", element: <FaqsCreate /> },
      { path: "/cms/faq/trash", element: <FaqsTrash /> },

      { path: "/cms/latest-notices/all", element: <LatestNoticesPage /> },
      { path: "/cms/latest-notices/create", element: <LatestNoticesCreate /> },
      { path: "/cms/latest-notices/:id/edit", element: <LatestNoticesCreate /> },
      { path: "/cms/latest-notices/trash", element: <LatestNoticesTrash /> },

      { path: "/cms/navigation/all", element: <NavigationPage /> },
      { path: "/cms/navigation/create", element: <NavigationCreate /> },
      { path: "/cms/navigation/edit/:id", element: <NavigationCreate /> },

      { path: "/cms/files/all", element: <FilesPage /> },

      { path: "/cms/contact/all", element: <ContactPage /> },
      { path: "/cms/contact/trash", element: <ContactTrash /> },
      { path: "/cms/contact/:id/details", element: <ContactDetails /> },

      { path: "/cms/testimonials/all", element: <TestimonialsPage /> },
      { path: "/cms/testimonials/create", element: <TestimonialsCreate /> },
      { path: "/cms/testimonials/:id/edit", element: <TestimonialsCreate /> },
      { path: "/cms/testimonials/trash", element: <TestimonialsTrash /> },

      { path: "/setting/payment-gatway", element: <PaymentSetting /> },
      { path: "/setting/website", element: <WebsiteSetting /> },
      { path: "/setting/store-setting", element: <StoreSetting /> },
      { path: "/setting/footer-setting", element: <FooterSetting /> },
      { path: "/setting/smtp-setting", element: <SmtpSetting /> },
      { path: "/setting/currency-setting", element: <CurrencySetting /> },
      { path: "/setting/currency-setting/:id/edit", element: <CurrencySetting /> },

      { path: "/master/regions", element: <Regions /> },
      { path: "/master/categories", element: <Categories /> },
      { path: "/master/categories/:id/edit", element: <Categories /> },
      { path: "/master/brands", element: <Brands /> },
      { path: "/master/brands/:id/edit", element: <Brands /> },
      { path: "/master/tages", element: <Tages /> },
      { path: "/master/tages/:id/edit", element: <Tages /> },
      { path: "/master/status", element: <Status /> },
      { path: "/master/status/:id/edit", element: <Status /> },

      { path: "/support/support-ticket", element: <SupportTicket /> },
      {
        path: "/support/support-ticket/:id/details",
        element: <SupportTicketDetails />,
      },
      { path: "/support/create", element: <GenerateSupportTicket /> },
      { path: "/customer/all", element: <Customer /> },
      { path: "/customer/create", element: <CustomerCreate /> },
      {
        path: "/customer/:id",
        element: <CustomerDashboardSidebar />,
        children: customerRouter,
      },
      { path: "/profile/:id", element: <Profile /> },
      { path: "/customer/trash", element: <CustomerTrash /> },

      { path: "/log/admin-logs", element: <AdminLogsPage /> },
      { path: "/log/mail-logs", element: <MailLogsPage /> },
      { path: "/log/mail-logs/details/:id", element: <MailLogsDetails /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
  {
    path: "/signup",
    element: (
      <ProtectedRoutes>
        <Signup />
      </ProtectedRoutes>
    ),
  },
  {
    path: "/login",
    element: (
      <ProtectedRoutes>
        <Login />
      </ProtectedRoutes>
    ),
  },

  { path: "*", element: <NotFoundPage /> },
]);

export default router;
