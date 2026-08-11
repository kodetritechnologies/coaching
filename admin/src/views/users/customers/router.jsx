import Address from "./Address";
import AddressDetails from "./AddressDetails";
import Cart from "./Cart";
import Coupon from "./Coupon";
import Create from "./Create";
import CustomerDashboard from "./CustomerDashboard";
import Order from "./Order";
import Reviews from "./Reviews";
import Support from "./Support";
import Wishlist from "./Wishlist";

export const customerRouter = [
  {
    path: "",
    element: <CustomerDashboard />,
  },
  {
    path: "profile",
    element: <Create />,
  },
  {
    path: "orders",
    element: <Order />,
  },
  {
    path: "reviews",
    element: <Reviews />,
  },
  {
    path: "wishlist",
    element: <Wishlist />,
  },
  {
    path: "cart",
    element: <Cart />,
  },
  {
    path: "addresses",
    element: <Address />,
  },
  {
    path: "addresses/:id/edit",
    element: <AddressDetails />,
  },
  {
    path: "coupons",
    element: <Coupon />,
  },
  {
    path: "support-tickets",
    element: <Support />,
  },
];
