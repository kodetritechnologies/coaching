import { useState } from "react";
import SubHeader from "../../../components/SubHeader";
import TableLayoutComp from "../../../components/Tables/TableLayoutComp";
import { useNavigate, useParams } from "react-router-dom";
import { YYYYMMDD } from "../../../helpers/dateHelper";
import BasicProvider from "../../../authentications/BasicProvider";
import { useEffect } from "react";
import toast from "react-hot-toast";
import handleSubmitHelper from "../../../helpers/handleSubmitHelper";
import { FaRectangleList } from "react-icons/fa6";
import { IoCreate } from "react-icons/io5";
import MultiSelectDropdown from "../../../components/MultiSelectDropdown";
import JsTreeCheckbox from "../../../components/JsTreeCheckbox";

function Create() {
  const { id } = useParams();
  const navigate = useNavigate();
  const basicProvider = BasicProvider();
  const [initialValues, setInitialValues] = useState({
    name: "",
    description: "",
    code: "",
    coupan_no: "",
    discount_type: "",
    min_amount: "",
    max_amount: "",
    start_date: YYYYMMDD(new Date()),
    end_date: YYYYMMDD(new Date()),
    type: "cart",
    items: [],
    categories: [],
    one_time: false,
  });

  const [categories, setCategories] = useState([]);
  const [defaultCategories, setDefaultCategories] = useState([]);

  console.log("initialValues", initialValues);

  const HeaderNavigation = [
    {
      name: "All Coupan",
      link: "/ecommerce/coupan/all",
      icon: <FaRectangleList />,
    },
    {
      name: "Create Items",
      link: "/ecommerce/coupan/create",
      icon: <IoCreate />,
    },
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setInitialValues((prev) => {
      let updatedData = {
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      };
      if (name === "type") {
        if (value === "product") {
          updatedData.categories = [];
        }
        if (value === "category") {
          updatedData.items = [];
        }
      }
      return updatedData;
    });
  };

  const fetchData = async () => {
    const response = await basicProvider.getMethod(`ecommerce/coupan/by/${id}`);
    const items = response?.data?.items?.map((item) => {
      return {
        label: item?.name,
        value: item?._id,
      };
    });
    setDefaultCategories(response?.data?.categories);

    setInitialValues((pre) => ({
      ...pre,
      ...response.data,
      items: items,
    }));
  };

  const fetchCategory = async () => {
    const response = await basicProvider.getMethod(
      "configuration/categories/byType/product"
    );
    setCategories(response?.data || []);
  };

  const handleSubmit = async () => {
    let response = "";
    const data = handleSubmitHelper(initialValues);
    if (data) {
      if (id) {
        response = await basicProvider.patchMethod(
          `ecommerce/coupan/update/${id}`,
          data
        );
      } else {
        response = await basicProvider.postMethod(
          "ecommerce/coupan/create",
          data
        );
        if (response.data) {
          navigate(`/ecommerce/coupan/${response?.data?._id}/edit`);
        }
      }
    }

    if (response.status === "success") {
      toast.success(response.message);
      fetchData();
    } else {
      toast.error(response.message);
    }
  };

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, []);

  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <>
      <SubHeader
        searchFilter={false}
        HeaderNavigation={HeaderNavigation}
        fetchData={fetchData}
      ></SubHeader>
      <div className="coupanPage flex">
        <div className="itemLeft">
          <TableLayoutComp title={"Create Coupan"}>
            <div className="coupanlayout cp">
              <div>
                <label htmlFor="name" className="label">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={initialValues?.name}
                  className="input"
                  placeholder="Name"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="description" className="label">
                  Description
                </label>
                <textarea
                  name="description"
                  id="description"
                  value={initialValues?.description}
                  className="textarea"
                  onChange={handleChange}
                ></textarea>
              </div>
              <div>
                <label htmlFor="code" className="label">
                  Coupan Code <span className="text-red-700">*</span>
                </label>
                <input
                  type="text"
                  id="code"
                  name="code"
                  value={initialValues?.code}
                  className="input"
                  placeholder="ENTER COUPAN CODE"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="codeno" className="label">
                  No of Coupan<span className="text-red-700">*</span>
                </label>
                <input
                  type="text"
                  id="codeno"
                  name="coupan_no"
                  value={initialValues?.coupan_no}
                  className="input"
                  placeholder="Enter number of coupan"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="discount_type" className="label">
                  Type<span className="text-red-700">*</span>
                </label>
                <select
                  name="discount_type"
                  id="discount_type"
                  className="input"
                  value={initialValues?.discount_type}
                  onChange={handleChange}
                >
                  <option value="" disabled selected>
                    Select Discount Type
                  </option>
                  <option value="precentage">By Precentage</option>
                  <option value="fixed">Fix Amount</option>
                </select>
              </div>
              <div>
                <label htmlFor="min" className="label">
                  Minimum Amount<span className="text-red-700">*</span>
                </label>
                <input
                  type="text"
                  id="min"
                  name="min_amount"
                  value={initialValues?.min_amount}
                  className="input"
                  placeholder="Enter Amount"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="max" className="label">
                  Maximum Amount<span className="text-red-700">*</span>
                </label>
                <input
                  type="text"
                  id="max"
                  name="max_amount"
                  value={initialValues?.max_amount}
                  className="input"
                  placeholder="Enter Amount"
                  onChange={handleChange}
                />
              </div>
            </div>
          </TableLayoutComp>
        </div>
        <div className="itemRight">
          <TableLayoutComp>
            <div className="cupanSubmit cp">
              <div className="flex gap-2">
                <div>
                  <label htmlFor="start" className="label">
                    Start Date
                  </label>
                  <input
                    type="date"
                    name="start_date"
                    value={initialValues?.start_date}
                    id="start"
                    className="input"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="end" className="label">
                    End Date
                  </label>
                  <input
                    type="date"
                    name="end_date"
                    value={initialValues?.end_date}
                    id="end"
                    className="input"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className=" ">
                <div className="w-full">
                  <label htmlFor="type" className="label">
                    Select Type <span className="text-red-700">*</span>
                  </label>
                  <select
                    name="type"
                    id="selecttype"
                    className="input"
                    value={initialValues?.type}
                    onChange={handleChange}
                  >
                    <option value="cart" selected>
                      Select Type
                    </option>
                    <option value="category">Category</option>
                    <option value="product">Product</option>
                  </select>
                </div>
                <div className="cmt">
                  {initialValues?.type === "product" && (
                    <MultiSelectDropdown
                      endPoint={"ecommerce/item"}
                      value={initialValues?.items}
                      setValue={(value) => {
                        setInitialValues((pre) => ({
                          ...pre,
                          items: value,
                          categories: [],
                        }));
                      }}
                    />
                  )}
                  {initialValues?.type === "category" && (
                    <>
                      {categories?.length > 0 ? (
                        <JsTreeCheckbox
                          data={categories}
                          defaultChecked={defaultCategories}
                          onCheck={(checked) => {
                            setInitialValues((pre) => ({
                              ...pre,
                              categories: checked,
                              items: [],
                            }));
                          }}
                        />
                      ) : (
                        <>
                          <h3 className="text-center">
                            Category not available
                          </h3>
                        </>
                      )}
                    </>
                  )}
                </div>
              </div>
              <div className="firstTimeUser flex gap-4 cmt">
                <span className="label">First Time User Only</span>
                <span className="gap-1 flex items-center">
                  <input
                    type="radio"
                    name="one_time"
                    id="yes"
                    value={initialValues?.one_time}
                    checked={initialValues?.one_time}
                    className="radioYes"
                    onChange={handleChange}
                  />
                  <label htmlFor="yes" className="font-bold">
                    Yes
                  </label>
                </span>
                <span className="gap-1 flex items-center">
                  <input
                    type="radio"
                    name="one_time"
                    value={initialValues?.one_time}
                    id="no"
                    checked={initialValues?.one_time}
                    className="radioNo"
                    onChange={handleChange}
                  />
                  <label htmlFor="no" className="font-bold">
                    No
                  </label>
                </span>
              </div>
              <div className="flex gap-2 cmt">
                <button className="submit" onClick={handleSubmit}>
                  Submit
                </button>
                <button
                  className="cancel"
                  onClick={() => {
                    setInitialValues({
                      name: "",
                      description: "",
                      code: "",
                      coupan_no: "",
                      discount_type: "",
                      min_amount: "",
                      max_amount: "",
                      start_date: "",
                      end_date: "",
                      type: "",
                      one_time: "",
                    });
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </TableLayoutComp>
        </div>
      </div>
    </>
  );
}

export default Create;
