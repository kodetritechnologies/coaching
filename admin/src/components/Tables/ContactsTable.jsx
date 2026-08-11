
function ContactsTable() {
  return (
    <div className="DashboardTable">
      <div className="DashboardTableHeader">
        <div className="tanleTitle">Recent Contact</div>
        <button className="table-button">View All</button>
      </div>
      <table className="dashDataTable">
        <thead>
          <tr className="tableRow">
            <th className="tableHead">Product</th>
            <th className="tableHead">Category</th>
            <th className="tableHead">Price</th>
            <th className="tableHead">Rating</th>
            <th className="tableHead">Created</th>
          </tr>
        </thead>
        <tbody>
          <tr className="tableDataRow">
            <td>
              <div className="tableImage">
                <img
                  src="https://plus.unsplash.com/premium_photo-1664392147011-2a720f214e01?w=500&auto=format&fit=crop&q=60"
                  alt="Shirt"
                />
                <p>Shirt</p>
              </div>
            </td>
            <td>Man</td>
            <td>$1000</td>
            <td>⭐ 5</td>
            <td>14-Aug-2025</td>
          </tr>
          <tr className="tableDataRow">
            <td>
              <div className="tableImage">
                <img
                  src="https://plus.unsplash.com/premium_photo-1664392147011-2a720f214e01?w=500&auto=format&fit=crop&q=60"
                  alt="Shirt"
                />
                <p>Shirt</p>
              </div>
            </td>
            <td>Man</td>
            <td>$1000</td>
            <td>⭐ 5</td>
            <td>14-Aug-2025</td>
          </tr>
          <tr className="tableDataRow">
            <td>
              <div className="tableImage">
                <img
                  src="https://plus.unsplash.com/premium_photo-1664392147011-2a720f214e01?w=500&auto=format&fit=crop&q=60"
                  alt="Shirt"
                />
                <p>Shirt</p>
              </div>
            </td>
            <td>Man</td>
            <td>$1000</td>
            <td>⭐ 5</td>
            <td>14-Aug-2025</td>
          </tr>
          <tr className="tableDataRow">
            <td>
              <div className="tableImage">
                <img
                  src="https://plus.unsplash.com/premium_photo-1664392147011-2a720f214e01?w=500&auto=format&fit=crop&q=60"
                  alt="Shirt"
                />
                <p>Shirt</p>
              </div>
            </td>
            <td>Man</td>
            <td>$1000</td>
            <td>⭐ 5</td>
            <td>14-Aug-2025</td>
          </tr>
          <tr className="tableDataRow">
            <td>
              <div className="tableImage">
                <img
                  src="https://plus.unsplash.com/premium_photo-1664392147011-2a720f214e01?w=500&auto=format&fit=crop&q=60"
                  alt="Shirt"
                />
                <p>Shirt</p>
              </div>
            </td>
            <td>Man</td>
            <td>$1000</td>
            <td>⭐ 5</td>
            <td>14-Aug-2025</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ContactsTable;
