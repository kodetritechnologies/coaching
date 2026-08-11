import { AiOutlineStock } from "react-icons/ai";
import { BsCartXFill } from "react-icons/bs";
import { FaBasketShopping } from "react-icons/fa6";
import { TbPlayBasketball } from "react-icons/tb";

function ProductCountsGrid({ data }) {
  return (
    <div className="prdouctrgid">
      <div className="gridCard">
        <div className="gridcardleft bg-[#198754]">
          <FaBasketShopping />
        </div>
        <div className="gridcardright">
          <div className="font-bold text-2xl text-[#198754]">
            {data?.totalCount}
          </div>
          <div className="font-medium">All Products</div>
        </div>
      </div>
      <div className="gridCard">
        <div className="gridcardleft bg-red-700">
          <BsCartXFill />
        </div>
        <div className="gridcardright">
          <div className="font-bold text-2xl text-red-700">
            {data?.outOfStockCount}
          </div>
          <div className="font-medium">Out of Stock</div>
        </div>
      </div>
      <div className="gridCard">
        <div className="gridcardleft bg-[#0DCAF0]">
          <AiOutlineStock />
        </div>
        <div className="gridcardright">
          <div className="font-bold text-2xl text-[#0DCAF0]">
            {data?.unlimitedCount}
          </div>
          <div className="font-medium">Unlimited</div>
        </div>
      </div>
      <div className="gridCard">
        <div className="gridcardleft bg-black">
          <TbPlayBasketball />
        </div>
        <div className="gridcardright">
          <div className="font-bold text-2xl text-black">
            {data?.onSaleCount}
          </div>
          <div className="font-medium">On sale Products</div>
        </div>
      </div>
    </div>
  );
}
export default ProductCountsGrid;
