import { useNavigate } from "react-router-dom";
import { DDMMMYYYY } from "../../helpers/dateHelper";

function ProductsTable({ data }) {
  const navigate = useNavigate();
  return (
    <div className="DashboardTable">
      <div className="DashboardTableHeader">
        <div className="tanleTitle">Recent Items</div>
        <button
          className="table-button"
          onClick={() => {
            navigate("/ecommerce/item/all");
          }}
        >
          View All
        </button>
      </div>
      <table className="dashDataTable">
        <thead>
          <tr className="tableRow">
            <th className="tableHead">Name</th>
            <th className="tableHead">Category</th>
            <th className="tableHead">Price</th>
            <th className="tableHead">Created</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item) => (
            <tr className="tableDataRow">
              <td>
                <div className="tableImage">
                  <img src={item?.featured_image || "no-photos.png"} />
                  <p>
                    {item?.name.length > 18
                      ? item?.name.slice(0, 2) + "..."
                      : item?.name}
                  </p>
                </div>
              </td>
              <td>{item?.categories[0]?.name}</td>
              <td>
                {item.type === "simple" ? item?.price : item.varients[0].price}
              </td>
              <td>{DDMMMYYYY(item?.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductsTable;
