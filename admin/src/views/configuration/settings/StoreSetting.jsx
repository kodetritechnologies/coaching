import { useEffect, useState } from "react";
import TableLayoutComp from "../../../components/Tables/TableLayoutComp";
import handleSubmitHelper from "../../../helpers/handleSubmitHelper";
import BasicProvider from "../../../authentications/BasicProvider";
import toast from "react-hot-toast";

function StoreSetting() {
  const basicProvider = BasicProvider();
  const [tax, setTax] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [dropship, setDropship] = useState(false);
  const [cod, setCod] = useState(false);
  const [commission, setCommission] = useState();
  const [duration, setDuration] = useState();

  const fetchData = async (type) => {
    const response = await basicProvider.getMethod(
      `configuration/store/type/${type}`
    );

    if (response.status === "success") {
      setTax(response.data.value.tax);
      setDropship(response.data.value.dropship);
      setCod(response.data.value.cod);
      setCommission(response.data.value.commission);
      setDuration(response.data.value.duration);
      setShipping(response.data.value.shipping);
    }
  };
  useEffect(() => {
    fetchData("tax");
    fetchData("dropship");
    fetchData("cod");
    fetchData("commission");
    fetchData("duration");
    fetchData("shipping");
  }, []);
  const handleTaxChange = (e) => {
    setTax(e.target.value);
  };
  const handleShippingChange = (e) => {
    setShipping(e.target.value);
  };
  const handleCommissionChange = (e) => {
    setCommission(e.target.value);
  };
  const handleDurationChange = (e) => {
    setDuration(e.target.value);
  };
  const handleDropshipChange = (e) => {
    const { checked } = e.target;
    setDropship(checked);
  };

  const handleCodChange = (e) => {
    const { checked } = e.target;
    setCod(checked);
  };

  const handleSubmit = async (payload, type) => {
    const data = handleSubmitHelper({ type, value: payload });
    if (data) {
      const response = await basicProvider.postMethod(
        `configuration/store/create`,
        data
      );
      if (response.status === "success") {
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    }
  };
  return (
    <div>
      <div className="storePage cp">
        <TableLayoutComp title={"Tax"}>
          <div className="taxcard cp">
            <div>
              <label htmlFor="tax" className="label">
                Tax (%)
              </label>
              <input
                type="number"
                className="input"
                name="tax"
                value={tax}
                id="tax"
                placeholder="Enter Tax"
                onChange={handleTaxChange}
              />
            </div>
            <div className="cmt">
              <button
                className="submit"
                onClick={() => handleSubmit({ tax }, "tax")}
              >
                Submit
              </button>
            </div>
          </div>
        </TableLayoutComp>
        <TableLayoutComp title={"Shipping"}>
          <div className="taxcard cp">
            <div>
              <label htmlFor="shipping" className="label">
                Shipping Charges
              </label>
              <input
                type="number"
                className="input"
                name="shipping"
                value={shipping}
                id="shipping"
                placeholder="Enter shipping charges"
                onChange={handleShippingChange}
              />
            </div>
            <div className="cmt">
              <button
                className="submit"
                onClick={() => handleSubmit({ shipping }, "shipping")}
              >
                Submit
              </button>
            </div>
          </div>
        </TableLayoutComp>
        <TableLayoutComp title={"Country"}>
          <div className="countrycard cp">
            <div>
              <label htmlFor="country" className="label">
                Country
              </label>
              <select name="country" id="country" className="input">
                <option value="" selected disabled>
                  Select Country
                </option>
              </select>
            </div>
            <div className="cmt">
              <button className="submit">Submit</button>
            </div>
          </div>
        </TableLayoutComp>
        <TableLayoutComp title={"Dropship"}>
          <div className="dropshipcard cp ">
            <div className="flex items-center gap-4">
              <input
                type="checkbox"
                name="dropship"
                checked={dropship}
                value={dropship}
                id="dropship"
                onChange={handleDropshipChange}
              />
              <label htmlFor="dropship" className="font-bold ">
                Enabel
              </label>
            </div>
            <div className="cmt">
              <button
                className="submit"
                onClick={() => handleSubmit({ dropship }, "dropship")}
              >
                Submit
              </button>
            </div>
          </div>
        </TableLayoutComp>
        <TableLayoutComp title={"COD Enable"}>
          <div className="codenabelcard cp ">
            <div className="flex items-center gap-4">
              <input
                type="checkbox"
                name="cod"
                value={cod}
                checked={cod}
                id="cod"
                onChange={handleCodChange}
              />
              <label htmlFor="cod" className="font-bold ">
                Enabel
              </label>
            </div>
            <div className="cmt">
              <button
                className="submit"
                onClick={() => handleSubmit({ cod }, "cod")}
              >
                Submit
              </button>
            </div>
          </div>
        </TableLayoutComp>
        <TableLayoutComp title={"Admin Commission"}>
          <div className="commissioncard cp">
            <div>
              <label htmlFor="commission" className="label">
                Commission (%)
              </label>
              <input
                type="text"
                name="commission"
                value={commission}
                className="input"
                id="commission"
                placeholder="Admin Commission"
                onChange={handleCommissionChange}
              />
            </div>
            <div className="cmt">
              <button
                className="submit"
                onClick={() => handleSubmit({ commission }, "commission")}
              >
                Submit
              </button>
            </div>
          </div>
        </TableLayoutComp>
        <TableLayoutComp title={"Refund Duration"}>
          <div className="durationcard cp">
            <div>
              <label htmlFor="duration" className="label">
                Duration (hours)
              </label>
              <input
                type="text"
                name="duration"
                value={duration}
                className="input"
                id="duration"
                placeholder="Refund Duration"
                onChange={handleDurationChange}
              />
            </div>
            <div className="cmt">
              <button
                className="submit"
                onClick={() => handleSubmit({ duration }, "duration")}
              >
                Submit
              </button>
            </div>
          </div>
        </TableLayoutComp>
      </div>
    </div>
  );
}

export default StoreSetting;
