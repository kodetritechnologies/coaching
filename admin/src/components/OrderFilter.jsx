import TableLayoutComp from "./Tables/TableLayoutComp";

export default function OrderFilter() {
  return (
    <TableLayoutComp title={"Filter"}>
      <div className="orderFilter cp">
        <div>
          <lable className="label" htmlFor="order">
            Search By Order Number.
          </lable>
          <input
            type="text"
            id="order"
            className="input"
            placeholder="Enter Here..."
          />
        </div>
        <div>
          <lable className="label" htmlFor="status">
            By Status
          </lable>
          <input type="text" id="status" className="input" />
        </div>
        <div>
          <lable className="label" htmlFor="user">
            Select User
          </lable>
          <input type="text" id="user" className="input" />
        </div>
        <div>
          <lable className="label" htmlFor="from">
            Created From
          </lable>
          <input type="text" id="from" className="input" />
        </div>
        <div>
          <lable className="label" htmlFor="to">
            Created To
          </lable>
          <input type="text" id="to" className="input" />
        </div>
        <div className="filterButtons">
            <button className="add">Filter</button>
            <button className="cancel">Reset</button>
        </div>
      </div>
    </TableLayoutComp>
  );
}
