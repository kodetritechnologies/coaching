import { useEffect, useState } from "react";
import WedgetsCard from "../../../components/wedgets/WedgetsCard";
import { FaBox, FaUser } from "react-icons/fa";
import { RiContactsBook3Line } from "react-icons/ri";
import { BsBasket } from "react-icons/bs";
import { FcRating } from "react-icons/fc";
import { MdSupportAgent } from "react-icons/md";
import BasicProvider from "../../../authentications/BasicProvider";
import { useParams } from "react-router-dom";

function CustomerDashboard() {
  const basicProvider = BasicProvider();
  const { id } = useParams();
  const [dashboardCount, setDashboardCount] = useState(null);
  console.log("Dashboard ID:", dashboardCount);

  const fetchData = async () => {
    const response = await basicProvider.getMethod(
      `users/owner/dashboard/count/${id}`
    );
    setDashboardCount(response?.data);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        className="bg-gradient-to-r from-green-400 to-green-600 text-white p-6 rounded-xl shadow-lg"
        style={{ padding: "24px", margin: "12px" }}
      >
        <p className="text-sm opacity-80">15 Sep 2024</p>
        <h2 className="text-xl font-semibold mt-1">Revenue</h2>
        <p className="text-3xl font-bold mt-3">$ 00,000.00</p>
      </div>

      <div
        className="bg-gradient-to-r from-red-400 to-red-600 text-white p-6 rounded-xl shadow-lg"
        style={{ padding: "24px", margin: "12px" }}
      >
        <p className="text-sm opacity-80">15 Sep 2024</p>
        <h2 className="text-xl font-semibold mt-1">Expenses</h2>
        <p className="text-3xl font-bold mt-3">$ 00,000.00</p>
      </div>

      <div
        className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-6 rounded-xl shadow-lg"
        style={{ padding: "24px", margin: "12px" }}
      >
        <p className="text-sm opacity-80">15 Sep 2024</p>
        <h2 className="text-xl font-semibold mt-1">Budget</h2>
        <p className="text-3xl font-bold mt-3">$ 00,000.00</p>
      </div>
    </div>
  );
}

export default CustomerDashboard;
