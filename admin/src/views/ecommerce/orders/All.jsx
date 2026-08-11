import OrderFilter from "../../../components/OrderFilter";
import SubHeader from "../../../components/SubHeader";

function All() {
  return (
    <div>
      <SubHeader searchFilter={false} />
      <div className="orderPage">
        <OrderFilter></OrderFilter>
      </div>
    </div>
  );
}

export default All;
