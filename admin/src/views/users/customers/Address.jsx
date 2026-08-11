import { useState } from "react";
import { useEffect } from "react";
import BasicProvider from "../../../authentications/BasicProvider";
import { useParams, useSearchParams, NavLink } from "react-router-dom";
import NoRecords from "../../../components/NoRecords";
import { MdCreate } from "react-icons/md";
import DeleteSweetalert from "../../../components/DeleteSweetalert";

function Address() {
  const basicProvider = BasicProvider();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;
  const count = searchParams.get("count") || 5;
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({});

  const fetchData = async () => {
    const response = await basicProvider.getMethod(
      `ecommerce/address/all/${id}?page=${page}&count=${count}`
    );
    setData(response.data.data);
    setPagination(response.data);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      fetchData();
    }, 500);

    return () => clearTimeout(handler);
  }, [page, count, searchParams]);
  return (
    <div>
      {data?.length === 0 ? (
        <div className="cp">
          <NoRecords />
        </div>
      ) : (
        <div className="w-full flex flex-wrap justify-center bg-gray-100 cp gap-5">
          {data.map((address, index) => (
            <div
              className="w-[280px] bg-white rounded-2xl shadow-xl relative"
              style={{ padding: "24px" }}
              key={index}
            >
              <div className="flex justify-end gap-1 text-2xl">
                <NavLink to={`${address._id}/edit`}>
                  <MdCreate className="text-blue-500" />
                </NavLink>
                <DeleteSweetalert
                  endpoint={"ecommerce/address"}
                  type={"delete"}
                  deleteID={address?._id}
                  refresh={fetchData}
                  title={"Delete"}
                />
              </div>
              <h2
                className="text-2xl font-extrabold tracking-wide text-gray-900"
                style={{ marginBottom: "4px" }}
              >
                {address.name}
              </h2>

              <div
                className="h-1 w-16 bg-teal-500"
                style={{ marginBottom: "16px" }}
              ></div>

              <div
                className="flex items-center gap-2 text-teal-600 font-semibold"
                style={{ marginBottom: "12px" }}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M3 10l9-7 9 7v10a2 2 0 01-2 2h-4a2 2 0 01-2-2v-4H9v4a2 2 0 01-2 2H3a2 2 0 01-2-2V10z" />
                </svg>
                <span className="uppercase text-sm tracking-wide">
                  {address?.type?.toUpperCase()} Address
                </span>
              </div>

              <p
                className="text-gray-700 text-sm leading-relaxed"
                style={{ marginBottom: "16px" }}
              >
                {address.address} {address?.state?.name || ""} {address.pincode}
              </p>

              <div
                className="border-t border-gray-200"
                style={{ margin: "16px 0" }}
              ></div>

              <div
                className="text-sm text-gray-800"
                style={{ marginBottom: "8px" }}
              >
                <p style={{ marginBottom: "4px" }}>
                  <span className="font-semibold">Mobile:</span>{" "}
                  {address.mobile}
                </p>
                <p>
                  <span className="font-semibold">Alt. Mobile:</span>{" "}
                  {address.alt_mobile}
                </p>
              </div>

              <span
                className="absolute bg-teal-500 text-white text-xs font-bold rounded-md tracking-wide"
                style={{
                  bottom: "16px",
                  right: "16px",
                  padding: "4px 12px",
                }}
              >
                {address?.type?.toUpperCase()}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Address;
