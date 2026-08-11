import { useEffect, useState } from "react";
import TableLayoutComp from "../../../components/Tables/TableLayoutComp";
import JoditTextEditor from "../../../components/textEditor/JoditTextEditor";
import { AiOutlineClose } from "react-icons/ai";
import handleSubmitHelper from "../../../helpers/handleSubmitHelper";
import BasicProvider from "../../../authentications/BasicProvider";
import { useNavigate, useParams } from "react-router-dom";
import { YYYYMMDD } from "../../../helpers/dateHelper";
import toast from "react-hot-toast";

function Create() {
  const { id } = useParams();
  const navigate = useNavigate();
  const basicProvider = BasicProvider();
  const [initialValues, setInitialValues] = useState({
    title: "",
    slug: "",
    publish_date: YYYYMMDD(new Date()),
    values: [
      {
        ques: "",
        ans: "",
      },
    ],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInitialValues((pre) => ({ ...pre, [name]: value }));
  };

  const handleAddFAQ = () => {
    setInitialValues((prev) => ({
      ...prev,
      values: [...prev.values, { ques: "", ans: "" }],
    }));
  };

  const handleFAQChange = (index, field, value) => {
    setInitialValues((prev) => {
      const updatedValues = [...prev.values];
      updatedValues[index][field] = value;
      return { ...prev, values: updatedValues };
    });
  };

  const handleRemoveFAQ = (index) => {
    setInitialValues((prev) => {
      const updatedValues = prev.values.filter((_, i) => i !== index);
      return { ...prev, values: updatedValues };
    });
  };

  const fetchData = async () => {
    const response = await basicProvider.getMethod(`cms/faq/by/${id}`);
    setInitialValues(response.data);
  };

  const handleSubmit = async () => {
    let response = "";
    const data = handleSubmitHelper(initialValues);
    if (data) {
      if (id) {
        response = await basicProvider.patchMethod(
          `cms/faq/update/${id}`,
          data
        );
      } else {
        response = await basicProvider.postMethod("cms/faq/create", data);
        if (response.data) {
          navigate(`/cms/faq/${response?.data?._id}/edit`);
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

  return (
    <div>
      <div className="faqsPage flex">
        <div className="itemLeft">
          <TableLayoutComp title={"Main Details of FAQs"}>
            <div className="faqsDetailCard cp">
              <div>
                <label htmlFor="title" className="label">
                  FAQ Title <span className="span">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={initialValues?.title}
                  className="input"
                  placeholder="FAQ Title"
                  onChange={handleChange}
                />
              </div>
            </div>
          </TableLayoutComp>

          <TableLayoutComp
            title={"List of FAQ's"}
            addButton={true}
            buttonCount={handleAddFAQ}
          >
            {initialValues?.values?.map((item, index) => (
              <div key={index} className="listoffaqsCard cp relative">
                {initialValues?.values.length > 1 && (
                  <button
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700 bg-red-300 rounded-full faqremove"
                    onClick={() => handleRemoveFAQ(index)}
                  >
                    <AiOutlineClose size={20} />
                  </button>
                )}

                <div>
                  <label htmlFor={`ques-${index}`} className="label">
                    Your Question <span className="span">*</span>
                  </label>
                  <input
                    type="text"
                    id={`ques-${index}`}
                    name="ques"
                    className="input"
                    placeholder="Your Question"
                    value={item.ques}
                    onChange={(e) =>
                      handleFAQChange(index, "ques", e.target.value)
                    }
                  />
                </div>

                <div className="cmt">
                  <JoditTextEditor
                    initialValues={item.ans}
                    setInitialValues={(newValue) =>
                      handleFAQChange(index, "ans", newValue)
                    }
                  />
                </div>
              </div>
            ))}
          </TableLayoutComp>
        </div>

        <div className="itemRight">
          <TableLayoutComp title={"Publish"}>
            <div className="publishCard cp">
              <div>
                <label htmlFor="publish_date" className="label">
                  Publish Date
                </label>
                <input
                  type="date"
                  id="publish_date"
                  name="publish_date"
                  className="input"
                  value={initialValues?.publish_date}
                  onChange={handleChange}
                />
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
                      publish_date: "",
                      values: [
                        {
                          ques: "",
                          ans: "",
                        },
                      ],
                    });
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </TableLayoutComp>

          <TableLayoutComp title={"Slug"}>
            <div className="cp">
              <input
                type="text"
                name="slug"
                value={initialValues?.slug}
                className="input"
                placeholder="Slug"
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
