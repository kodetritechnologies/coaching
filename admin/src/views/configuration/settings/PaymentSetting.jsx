import { useState, useEffect } from "react";
import TableLayoutComp from "../../../components/Tables/TableLayoutComp";
import handleSubmitHelper from "../../../helpers/handleSubmitHelper";
import BasicProvider from "../../../authentications/BasicProvider";
import toast from "react-hot-toast";
function PaymentSetting() {
  const basicProvider = BasicProvider();
  const [razorpay, setRazorpay] = useState({
    key_id: "",
    key_secret: "",
    gatway: "",
    status: "",
  });
  const [paytm, setPaytm] = useState({
    key_id: "",
    key_secret: "",
    gatway: "",
    status: "",
  });
  const [stripe, setStripe] = useState({
    key_id: "",
    key_secret: "",
    gatway: "",
    status: "",
  });
  const [phonepe, setPhonePe] = useState({
    key_id: "",
    key_secret: "",
    gatway: "",
    status: "",
  });

  const razorpayHandleChange = (e) => {
    const { name, value } = e.target;
    setRazorpay((pre) => ({
      ...pre,
      [name]: value,
    }));
  };
  const paytmHandleChange = (e) => {
    const { name, value } = e.target;
    setPaytm((pre) => ({
      ...pre,
      [name]: value,
    }));
  };
  const stripeHandleChange = (e) => {
    const { name, value } = e.target;
    setStripe((pre) => ({
      ...pre,
      [name]: value,
    }));
  };
  const phonePeHandleChange = (e) => {
    const { name, value } = e.target;
    setPhonePe((pre) => ({
      ...pre,
      [name]: value,
    }));
  };

  const fetchPaymentData = async (setPayment, gatway) => {
    const response = await basicProvider.getMethod(
      `configuration/payment/gatway/${gatway}`
    );

    if (response.status === "success") {
      setPayment((pre) => ({
        ...pre,
        key_id: response?.data?.key_id,
        key_secret: response?.data?.key_secret,
        gatway: response?.data?.gatway,
        status: response?.data?.status,
      }));
    }
  };

  useEffect(() => {
    fetchPaymentData(setRazorpay, "razorpay");
    fetchPaymentData(setPaytm, "paytm");
    fetchPaymentData(setStripe, "stripe");
    fetchPaymentData(setPhonePe, "phonepe");
  }, []);

  const paymentHandleSubmit = async (payment, gatway, setPayment) => {
    try {
      const data = handleSubmitHelper({ ...payment, gatway });
      if (data) {
        const response = await basicProvider.postMethod(
          "configuration/payment/create",
          data
        );
        if (response.status === "success") {
          toast.success(response.message);
          fetchPaymentData(setPayment, gatway);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="paymentPage cp">
      <TableLayoutComp
        title={"Razorpay"}
        showSwitch={true}
        status={razorpay.status === "active"}
        endPoint={"configuration/payment/create"}
        data={razorpay}
        refresh={() => fetchPaymentData(setRazorpay, "razorpay")}
      >
        <div className="razoypayCard cp">
          <div>
            <label htmlFor="RsecretId" className="label">
              KEY ID
            </label>
            <input
              type="text"
              id="RsecretId"
              className="input"
              name="key_id"
              value={razorpay.key_id}
              placeholder="Enter KEY ID"
              onChange={razorpayHandleChange}
            />
          </div>
          <div>
            <label htmlFor="Rsecretkey" className="label">
              KEY SECRET
            </label>
            <input
              type="text"
              id="Rsecretkeyss"
              className="input"
              name="key_secret"
              value={razorpay.key_secret}
              placeholder="Enter KEY SECRET"
              onChange={razorpayHandleChange}
            />
          </div>
          <div className="cmt">
            <button
              className="submit"
              onClick={() => {
                paymentHandleSubmit(razorpay, "razorpay", setRazorpay);
              }}
            >
              Submit
            </button>
          </div>
        </div>
      </TableLayoutComp>
      <TableLayoutComp
        title={"phonepe"}
        showSwitch={true}
        status={phonepe.status === "active"}
        endPoint={"configuration/payment/create"}
        data={phonepe}
        refresh={() => fetchPaymentData(setPhonePe, "phonepe")}
      >
        <div className="phonepeCard cp">
          <div>
            <label htmlFor="phonepayId" className="label">
              KEY ID
            </label>
            <input
              type="text"
              id="phonepayId"
              className="input"
              name="key_id"
              value={phonepe?.key_id}
              placeholder="Enter KEY ID"
              onChange={phonePeHandleChange}
            />
          </div>
          <div>
            <label htmlFor="phonepekey" className="label">
              KEY SECRET
            </label>
            <input
              type="text"
              id="phonepekey"
              className="input"
              name="key_secret"
              value={phonepe.key_secret}
              placeholder="Enter KEY SECRET"
              onChange={phonePeHandleChange}
            />
          </div>

          <div className="cmt">
            <button
              className="submit"
              onClick={() => {
                paymentHandleSubmit(phonepe, "phonepe", setPhonePe);
              }}
            >
              Submit
            </button>
          </div>
        </div>
      </TableLayoutComp>
      <TableLayoutComp
        title={"Stripe"}
        showSwitch={true}
        status={stripe.status === "active"}
        endPoint={"configuration/payment/create"}
        data={stripe}
        refresh={() => fetchPaymentData(setStripe, "stripe")}
      >
        <div className="stripeCard cp">
          <div>
            <label htmlFor="stripeId" className="label">
              KEY ID
            </label>
            <input
              type="text"
              id="stripeId"
              className="input"
              name="key_id"
              value={stripe.key_id}
              placeholder="Enter KEY ID"
              onChange={stripeHandleChange}
            />
          </div>
          <div>
            <label htmlFor="stripekey" className="label">
              KEY SECRET
            </label>
            <input
              type="text"
              id="stripekey"
              className="input"
              name="key_secret"
              value={stripe.key_secret}
              placeholder="Enter KEY SECRET"
              onChange={stripeHandleChange}
            />
          </div>

          <div className="cmt">
            <button
              className="submit"
              onClick={() => {
                paymentHandleSubmit(stripe, "stripe", setStripe);
              }}
            >
              Submit
            </button>
          </div>
        </div>
      </TableLayoutComp>
      <TableLayoutComp
        title={"Paytm"}
        showSwitch={true}
        status={paytm.status === "active"}
        endPoint={"configuration/payment/create"}
        data={paytm}
        refresh={() => fetchPaymentData(setPaytm, "paytm")}
      >
        <div className="paytmCard cp">
          <div>
            <label htmlFor="paytmId" className="label">
              KEY ID
            </label>
            <input
              type="text"
              id="paytmId"
              className="input"
              name="key_id"
              value={paytm.key_id}
              placeholder="Enter KEY ID"
              onChange={paytmHandleChange}
            />
          </div>
          <div>
            <label htmlFor="paytmkey" className="label">
              KEY SECRET
            </label>
            <input
              type="text"
              id="paytmkey"
              className="input"
              name="key_secret"
              value={paytm.key_secret}
              placeholder="Enter KEY SECRET"
              onChange={paytmHandleChange}
            />
          </div>
          <div className="cmt">
            <button
              className="submit"
              onClick={() => {
                paymentHandleSubmit(paytm, "paytm", setPaytm);
              }}
            >
              Submit
            </button>
          </div>
        </div>
      </TableLayoutComp>
    </div>
  );
}

export default PaymentSetting;
