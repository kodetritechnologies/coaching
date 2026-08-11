import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FileUplodsModule from "../../../components/modules/FileUplodsModule";
import TableLayoutComp from "../../../components/Tables/TableLayoutComp";
import NoRecords from "../../../components/NoRecords";
import JsTree from "../../../components/JsTree";
import handleSubmitHelper from "../../../helpers/handleSubmitHelper";
import BasicProvider from "../../../authentications/BasicProvider";
import toast from "react-hot-toast";

function Categories() {
  const navigate = useNavigate();
  const { id } = useParams();
  const basicProvider = BasicProvider();

  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(false);
  const [initialValues, setInitialValues] = useState({
    name: [],
    type: "",
    parent: "",
    featured_image:null
  });

  const fetchData = async () => {
    const response = await basicProvider.getMethod(
      "configuration/categories/types"
    );
    setCategories(response.data);
  };

  const fetchCategoryById = async () => {
    if (!id) return;
    const response = await basicProvider.getMethod(
      `configuration/categories/byId/${id}`
    );
    if (response.status === "success") {
      const data = response.data;
      setInitialValues({
        name: [data.name],
        type: data.type,
        parent: data.parent?._id || "",
        featured_image: data.featured_image,
      });
      setImage(data.featured_image);
    } else {
      toast.error(response.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") {
      const prepare = value.split("\n");
      setInitialValues((pre) => ({ ...pre, name: prepare }));
    } else {
      setInitialValues((pre) => ({ ...pre, [name]: value }));
    }
    if (value === "other") {
      setType(true);
    } else {
      setType(false);
    }
  };

  const handleSubmit = async () => {
    const data = handleSubmitHelper(initialValues);
    let response = "";
    if (data) {
      if (id) {
        response = await basicProvider.patchMethod(
          `configuration/categories/update/${id}`,
          data
        );
      } else {
        response = await basicProvider.postMethod(
          "configuration/categories/create",
          data
        );
      }
    }

    if (response.status === "success") {
      toast.success(response.message);
      fetchData();
      setInitialValues({
        name: [],
        type: "",
        parent: "",
      });
      navigate("/master/categories");
    } else {
      toast.error(response.message);
    }
  };

  useEffect(() => {
    fetchData();
    fetchCategoryById();
  }, [id]);

  return (
    <div>
      <div className="categorePage flex">
        <div className="itemRight">
          <TableLayoutComp title={id ? "Edit Category" : "Create Category"}>
            <div className="categorecard cp">
              <div>
                <label htmlFor="name" className="label">
                  Name<span className="span">*</span>
                </label>
                <textarea
                  name="name"
                  id="name"
                  value={initialValues.name.join("\n")}
                  className="textarea"
                  onChange={handleChange}
                ></textarea>
              </div>
              <div>
                <label htmlFor="type" className="label">
                  Select Type<span className="span">*</span>
                </label>
                <select
                  name="type"
                  id="type"
                  value={initialValues.type}
                  className="input"
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    Select Type
                  </option>
                  {categories?.map((type) => (
                    <option value={type._id}>{type._id}</option>
                  ))}
                  <option value="other">Other</option>
                </select>
              </div>
              {type && (
                <div>
                  <label htmlFor="otherType" className="label">
                    Other Type<span className="span">*</span>
                  </label>
                  <input
                    type="text"
                    id="otherType"
                    className="input"
                    placeholder="Other Type"
                    onChange={(e) => {
                      setInitialValues((pre) => ({
                        ...pre,
                        type: e.target.value,
                      }));
                    }}
                  />
                </div>
              )}
              <div>
                <label htmlFor="parent" className="label">
                  Parent<span className="span">*</span>
                </label>
                <select
                  name="parent"
                  id="parent"
                  value={initialValues.parent}
                  className="input"
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    Select...
                  </option>
                  {categories?.flatMap((group) =>
                    group.categories.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.name}
                      </option>
                    ))
                  )}
                </select>
              </div>

              <TableLayoutComp title={"Image Detail"} showSwitch={true}>
                <div className="imageDetailcard cp">
                  <FileUplodsModule
                  initialValues={image}
                  setInitialValues={(files) => {
                    setInitialValues((pre) => ({
                      ...pre,
                      featured_image: files[0]?.file || files[0],
                    }));
                  }}
                  type="featured_image"
                />
                </div>
              </TableLayoutComp>

              <div className="cp flex gap-4">
                <button className="submit" onClick={handleSubmit}>
                  {id ? "Update" : "Submit"}
                </button>
                <button
                  className="cancel"
                  onClick={() => {
                    setInitialValues({
                      name: [],
                      type: "",
                      parent: "",
                    });
                    navigate("/master/categories");
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </TableLayoutComp>
        </div>
        <div className="itemLeft">
          {categories?.length === 0 ? (
            <NoRecords />
          ) : (
            <div className="categoreData cmt">
              {categories?.map((group) => (
                <TableLayoutComp key={group._id} title={group._id}>
                  <JsTree
                    data={group.categories}
                    fetchData={fetchData}
                    endpoint={"configuration/categories"}
                    navigates={"/master/categories"}
                  />
                </TableLayoutComp>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Categories;
