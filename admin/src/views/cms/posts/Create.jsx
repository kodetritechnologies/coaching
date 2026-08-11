import { useState } from "react";
import FileUplodsModule from "../../../components/modules/FileUplodsModule";
import TableLayoutComp from "../../../components/Tables/TableLayoutComp";
import JoditTextEditor from "../../../components/textEditor/JoditTextEditor";
import { useNavigate, useParams } from "react-router-dom";
import { YYYYMMDD } from "../../../helpers/dateHelper";
import BasicProvider from "../../../authentications/BasicProvider";
import { useEffect } from "react";
import handleSubmitHelper from "../../../helpers/handleSubmitHelper";
import toast from "react-hot-toast";
import MultiSelectDropdown from "../../../components/MultiSelectDropdown";
import JsTreeCheckbox from "../../../components/JsTreeCheckbox";

function Create() {
  const { id } = useParams();
  const navigate = useNavigate();
  const basicProvider = BasicProvider();
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [types, setTypes] = useState([]);
  const [defaultCategories, setDefaultCategories] = useState([]);


  const [initialValues, setInitialValues] = useState({
    title: "",
    slug: "",
    content: "",
    featured: false,
    type: "post",
    categories: [],
    tags: [],
    publish_date: YYYYMMDD(new Date()),
    featured_image: null,
  });

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setInitialValues((pre) => ({
      ...pre,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const fetchData = async () => {
    const response = await basicProvider.getMethod(`cms/post/by/${id}`);
    setDefaultCategories(response.data?.categories || []);
    setInitialValues({
      ...response.data,
      categories: response.data?.categories?.map((cat) => cat._id) || [],
      tags: response.data?.tags?.map((tag) => ({
        label: tag.name,
        value: tag._id,
      })) || [],
    });
    setImage(response?.data?.featured_image);
  };

  const fetchCategories = async () => {
    const response = await basicProvider.getMethod(
      `configuration/categories/byType/post`
    );
    setCategories(response.data || []);
  };

  const fetchTypes = async () => {
    const response = await basicProvider.getMethod(
      `configuration/categories/byType/post`
    );
    setTypes(response.data || []);
  };

  const handleSubmit = async () => {
    let response = "";
    const payload = {
      ...initialValues,
      categories: initialValues.categories.map((cat) => cat.id || cat),
      tags: initialValues.tags.map((tag) => tag.value || tag),
    };
    const data = handleSubmitHelper(payload);
    if (data) {
      if (id) {
        response = await basicProvider.patchMethod(
          `cms/post/update/${id}`,
          data
        );
      } else {
        response = await basicProvider.postMethod("cms/post/create", data);
        if (response.data && response.data._id) {
          navigate(`/cms/post/${response.data._id}/edit`);
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
    if (id && id !== "undefined") {
      fetchData();
    }
    fetchCategories();
    fetchTypes();
  }, []);
  return (
    <div>
      <div className="postPage flex">
        <div className="itemLeft">
          <TableLayoutComp title={"Main Details of Blog"}>
            <div className="postDetailCard cp">
              <div>
                <label htmlFor="title" className="label">
                  Blog Title <span className="span">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={initialValues?.title}
                  className="input"
                  placeholder="Blog Title"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="content" className="label">
                  Content <span className="span">*</span>
                </label>
                <JoditTextEditor
                  initialValues={initialValues?.content}
                  setInitialValues={(value) => {
                    setInitialValues((pre) => ({ ...pre, content: value }));
                  }}
                ></JoditTextEditor>
              </div>
            </div>
          </TableLayoutComp>
        </div>
        <div className="itemRight">
          <TableLayoutComp title={"Publish"}>
            <div className="publishCard cp">
              <div>
                <label htmlFor="date" className="label">
                  Publish Date
                </label>
                <input
                  type="date"
                  id="date"
                  name="publish_date"
                  value={initialValues?.publish_date}
                  className="input"
                  onChange={handleChange}
                />
              </div>
              <div className="flex items-center gap-2 cmt">
                <input
                  type="checkbox"
                  id="feturedpost"
                  name="featured"
                  value={initialValues?.featured}
                  checked={initialValues?.featured}
                  onChange={handleChange}
                />
                <label htmlFor="feturedpost" className="label">
                  Featured Blog
                </label>
              </div>
              <div>
                <label htmlFor="type" className="label">
                  Type
                </label>
                <select
                  name="type"
                  id="type"
                  value={initialValues.type}
                  className="input"
                  onChange={handleChange}
                >
                  <option value="" selected disabled>
                    Select Type
                  </option>
                  {types?.map((type) => (
                    <option key={type._id} value={type.slug}>
                      {type.name}
                    </option>
                  ))}
                </select>
              </div>
              <hr className="horizontalRuler" />
              <div className="flex items-center gap-4">
                <button className="submit" onClick={handleSubmit}>
                  Submit
                </button>
                <button
                  className="cancel"
                  onClick={() => {
                    setInitialValues({
                      title: "",
                      slug: "",
                      content: "",
                      featured: false,
                      type: "post",
                      publish_date: "",
                    });
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </TableLayoutComp>
          <TableLayoutComp title={"Categories"}>
            <div className="cp">
              <JsTreeCheckbox
                data={categories}
                defaultChecked={defaultCategories}
                onCheck={(c) =>
                  setInitialValues((pre) => ({ ...pre, categories: c }))
                }
              />
            </div>
          </TableLayoutComp>
          <TableLayoutComp title={"Tags"}>
            <div className="cp">
              <MultiSelectDropdown
                endPoint={"configuration/tages"}
                value={initialValues.tags}
                setValue={(value) => {
                  setInitialValues((pre) => ({ ...pre, tags: value }));
                }}
              />
            </div>
          </TableLayoutComp>
          <TableLayoutComp title={"Slug"}>
            <div className="cp">
              <input
                type="text"
                className="input"
                name="slug"
                value={initialValues?.slug}
                onChange={handleChange}
                placeholder="Slug"
              />
            </div>
          </TableLayoutComp>
          <TableLayoutComp title={"Featured Image"}>
            <div className="cp">
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
        </div>
      </div>
    </div>
  );
}

export default Create;
