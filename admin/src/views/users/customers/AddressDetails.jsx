import { useState } from "react";
import BasicProvider from "../../../authentications/BasicProvider";
import TableLayoutComp from "../../../components/Tables/TableLayoutComp";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SingleSelectDropdown from "../../../components/SingleSelectDropdown";
import handleSubmitHelper from "../../../helpers/handleSubmitHelper";
import toast from "react-hot-toast";

function AddressDetails() {
  const basicProvider = BasicProvider();
  const { id } = useParams();
  const [initialValues, setInitialValues] = useState({
    name: "",
    mobile: "",
    alt_mobile: "",
    address: "",
    pincode: "",
    landmark: "",
    city: "",
    state: {},
    type: "",
  });

  const fetchData = async () => {
    const response = await basicProvider.getMethod(
      `ecommerce/address/byId/${id}`
    );

    setInitialValues((pre) => ({
      ...response.data,
      state: {
        label: response?.data?.state?.name,
        value: response?.data?.state?._id,
      },
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInitialValues((pre) => ({ ...pre, [name]: value }));
  };

  const handelSubmit = async () => {
    let response = "";
    const data = handleSubmitHelper(initialValues);
    try {
      if (data) {
        if (id) {
          response = await basicProvider.patchMethod(
            `ecommerce/address/update/${id}`,
            data
          );
        }

        if (response.status === "success") {
          toast.success(response.message);
          fetchData();
        } else {
          toast.error(response.message);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]);
  return (
    <div className="cp">
      <TableLayoutComp title={"Edit Address"}>
        <div className="cp">
          <div className="w-full flex gap-5">
            <div className="w-1/2">
              <label htmlFor="name" className="label">
                Name
              </label>
              <input
                className="input"
                type="text"
                name="name"
                id="name"
                value={initialValues.name}
                placeholder="Enter you name"
                onChange={handleChange}
              />
            </div>
            <div className="w-1/2">
              <label htmlFor="mobile" className="label">
                Mobile
              </label>
              <input
                className="input"
                type="text"
                name="mobile"
                id="mobile"
                value={initialValues.mobile}
                placeholder="Enter you mobile number"
                onChange={handleChange}
              />
            </div>
          </div>
          <div>
            <label htmlFor="address" className="label">
              Address
            </label>
            <textarea
              name="address"
              id="address"
              value={initialValues.address}
              className="textarea"
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="w-full flex gap-5">
            <div className="w-1/2">
              <label htmlFor="pincode" className="label">
                Pincode
              </label>
              <input
                className="input"
                type="text"
                name="pincode"
                id="pincode"
                value={initialValues.pincode}
                placeholder="Enter you pincode"
                onChange={handleChange}
              />
            </div>
            <div className="w-1/2">
              <label htmlFor="landmark" className="label">
                Landmark
              </label>
              <input
                className="input"
                type="text"
                name="landmark"
                id="landmark"
                value={initialValues.landmark}
                placeholder="Enter you landmark"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="w-full flex gap-5">
            <div className="w-1/2">
              <label htmlFor="city" className="label">
                City
              </label>
              <input
                className="input"
                type="text"
                name="city"
                id="city"
                value={initialValues.city}
                placeholder="Enter you City/District/Town"
                onChange={handleChange}
              />
            </div>
            <div className="w-1/2">
              <label htmlFor="state" className="label">
                State
              </label>
              <SingleSelectDropdown
                endPoint={"configuration/regions/byType/state"}
                value={initialValues?.state}
                setValue={(value) => {
                  setInitialValues((pre) => ({
                    ...pre,
                    state: value,
                  }));
                }}
              />
            </div>
          </div>
          <div className="w-full flex gap-5">
            <div className="w-1/2">
              <label htmlFor="alt_mobile" className="label">
                Alternate Mobile
              </label>
              <input
                className="input"
                type="text"
                name="alt_mobile"
                id="alt_mobile"
                value={initialValues.alt_mobile}
                placeholder="Enter you Alternate mobile (optyional)"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex justify-center gap-4 cp cmt">
            <button className="submit" onClick={handelSubmit}>
              Update
            </button>
            <button className="cancel">Cancel</button>
          </div>
        </div>
      </TableLayoutComp>
    </div>
  );
}

export default AddressDetails;
