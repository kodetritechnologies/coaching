import { useEffect, useState } from "react";
import BasicProvider from "../authentications/BasicProvider";
import OrdersTable from "../components/Tables/OrdersTable";
import ProductsTable from "../components/Tables/ProductsTable";
import BarChart from "../components/wedgets/BarChart";
import DoughnutChart from "../components/wedgets/DoughnutChart";
import RadarChart from "../components/wedgets/RadarChart";
import WedgetsCard from "../components/wedgets/WedgetsCard";
import { FaBox, FaUser } from "react-icons/fa";
import { RiContactsBook3Line } from "react-icons/ri";
import { BsBasket } from "react-icons/bs";
import { FcRating } from "react-icons/fc";
import { MdSupportAgent } from "react-icons/md";

function DashboardPage() {
  const basicProvider = BasicProvider();
  const [dashboardCount, setDashboardCount] = useState(null);
  const [recentItems, setrecentItems] = useState([]);

  const fetchData = async () => {
    const response = await basicProvider.getMethod(`dashboard/count`);
    setDashboardCount(response?.data);
  };
  const fetchRecentItems = async () => {
    const response = await basicProvider.getMethod(`dashboard/recent-item`);
    setrecentItems(response?.data);
  };

  useEffect(() => {
    fetchData();
    fetchRecentItems();
  }, []);
  return (
    <div className="dashboardpage">
      <div className="wedgetcomp">
        <WedgetsCard
          icon={<FaUser className="wedget-user-icon" />}
          img={"url('/public/desktop/desktop.jpg'"}
          title={"Customers"}
          count={dashboardCount?.customers}
        />
        <WedgetsCard
          icon={<RiContactsBook3Line className="wedget-user-icon" />}
          title={"Contacts"}
          img={"url('/public/desktop/deskto2.jpg'"}
          count={dashboardCount?.contacts}
        />
        <WedgetsCard
          icon={<BsBasket className="wedget-user-icon" />}
          title={"Products"}
          img={"url('/public/desktop/desktop3.png'"}
          count={dashboardCount?.items}
        />
        <WedgetsCard
          icon={<FcRating className="wedget-user-icon" />}
          title={"Reviews"}
          img={"url('/public/desktop/desktop5.jpg'"}
          count={dashboardCount?.reviews}
        />
        <WedgetsCard
          icon={<MdSupportAgent className="wedget-user-icon" />}
          title={"Support"}
          img={"url('/public/desktop/desktop6.jpg'"}
          count={dashboardCount?.supports}
        />
        <WedgetsCard
          icon={<FaBox className="wedget-user-icon" />}
          title={"Orders"}
          img={"url('/public/desktop/desktop4.png'"}
          count={dashboardCount?.orders}
        />
      </div>
      <div className="chartsComp">
        <BarChart ordersData={dashboardCount?.ordersData} />
      </div>
      <div className="DashboardTableComp">
        <OrdersTable />
        <ProductsTable data={recentItems} />
      </div>
    </div>
  );
}

export default DashboardPage;
