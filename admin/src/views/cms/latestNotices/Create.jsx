import { useEffect, useState } from "react";
import TableLayoutComp from "../../../components/Tables/TableLayoutComp";
import handleSubmitHelper from "../../../helpers/handleSubmitHelper";
import BasicProvider from "../../../authentications/BasicProvider";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

function Create() {
  const { id } = useParams();
  const navigate = useNavigate();
  const basicProvider = BasicProvider();
  const [initialValues, setInitialValues] = useState({
    title: "",
    category: "",
    slug: "",
  });
  const [categories, setCategories] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInitialValues((pre) => ({ ...pre, [name]: value }));
  };

  const fetchData = async () => {
    const response = await basicProvider.getMethod(`cms/latest-notice/by/${id}`);
    setInitialValues({
      title: response.data?.title || "",
      category: response.data?.category?._id || response.data?.category || "",
      slug: response.data?.slug || "",
    });
  };

  const fetchCategories = async () => {
    const response = await basicProvider.getMethod(
      "configuration/categories/byType/latest_notice"
    );
    if (response.status === "success") {
      setCategories(response.data || []);
    }
  };

  const handleSubmit = async () => {
    let response = "";
    const data = handleSubmitHelper(initialValues);
    if (data) {
      if (id) {
        response = await basicProvider.patchMethod(
          `cms/latest-notice/update/${id}`,
          data
        );
      } else {
        response = await basicProvider.postMethod("cms/latest-notice/create", data);
        if (response.data) {
          navigate(`/cms/latest-notices/${response?.data?._id}/edit`);
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
    fetchCategories();
    if (id) {
      fetchData();
    }
  }, [id]);

  return (
    <div>
      <div className="faqsPage flex flex-col md:flex-row gap-4 p-4">
        <div className="itemLeft w-full md:w-2/3">
          <TableLayoutComp title={"Notice Details"}>
            <div className="faqsDetailCard cp space-y-4">
              <div>
                <label htmlFor="title" className="label block font-semibold mb-1">
                  Notice Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={initialValues?.title}
                  className="input w-full p-2 border rounded"
                  placeholder="e.g., [Scholarship] VSAT 2026-27 Phase-2 National Scholarship Test"
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="category" className="label block font-semibold mb-1">
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={initialValues?.category}
                  className="input w-full p-2 border rounded bg-white"
                  onChange={handleChange}
                >
                  <option value="">Select Category</option>
                  {categories.map((cat, index) => (
                    <option key={index} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </TableLayoutComp>
        </div>

        <div className="itemRight w-full md:w-1/3 space-y-4">
          <TableLayoutComp title={"Publish"}>
            <div className="publishCard cp p-4">
              <div className="flex flex-col gap-4">
                <button 
                  className="submit bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 w-full" 
                  onClick={handleSubmit}
                >
                  Submit
                </button>
                <button
                  className="cancel border border-gray-300 py-2 px-4 rounded hover:bg-gray-100 w-full"
                  onClick={() => {
                    setInitialValues({
                      title: "",
                      category: "",
                      slug: "",
                    });
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </TableLayoutComp>

          <TableLayoutComp title={"Slug"}>
            <div className="cp p-4">
              <input
                type="text"
                name="slug"
                value={initialValues?.slug}
                className="input w-full p-2 border rounded bg-gray-50"
                placeholder="Auto-generated if empty"
                onChange={handleChange}
              />
            </div>
          </TableLayoutComp>
        </div>
      </div>
    </div>
  );
}

export default Create;
