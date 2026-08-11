import { MdCall, MdCloudUpload, MdEmail } from "react-icons/md";
import BasicProvider from "../../../authentications/BasicProvider";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import handleSubmitHelper from "../../../helpers/handleSubmitHelper";
import toast from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";
import SingleSelectDropdown from "../../../components/SingleSelectDropdown";
function Create() {
  const basicProvider = BasicProvider();
  const navigate = useNavigate();
  const validation = [
    {
      key: "message",
      required: true,
      maxLength: 3,
    },
  ];
  const [error, setError] = useState({});
  const [initialValues, setinitialValues] = useState({
    subject: "",
    priority: "medium",
    message: "",
    gallery: [],
    status: "open",
  });
  const [customer, setCustomers] = useState([]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      let selectedFiles = Array?.from(files)?.map((file) => {
        return {
          file: file,
          url: file.type.startsWith("application")
            ? "/document.png"
            : URL.createObjectURL(file),
        };
      });
      setinitialValues((pre) => ({
        ...pre,
        gallery: [...pre.gallery, ...selectedFiles],
      }));
    } else {
      setinitialValues((pre) => ({
        ...pre,
        [name]: value,
      }));
    }
  };

  const handleRemoveGallery = (file, index) => {
    setinitialValues((prev) => {
      const updatedGallery = (prev.gallery || []).filter(
        (_, idx) => idx !== index,
      );
      setTimeout(() => {
        if (file.url?.startsWith("blob:")) URL.revokeObjectURL(file.url);
      }, 0);
      return { ...prev, gallery: updatedGallery };
    });
  };

  const handleSubmit = async () => {
    const data = handleSubmitHelper(
      { ...initialValues, customer: customer?.value?.value },
      validation,
      setError,
    );
    if (error?.message) {
      toast.error(error?.message);
    }
    if (data) {
      const response = await basicProvider.postMethod(
        `support/support-ticket/create`,
        data,
      );
      if (response.status === "success") {
        toast.success(response.message);
        navigate(`/support/support-ticket/${response?.data?._id}/details`);
        setinitialValues({
          subject: "",
          priority: "medium",
          message: "",
          gallery: [],
          status: "open",
        });
      }
    }
  };

  return (
    <>
      <div className="generate-support-ticket">
        <div className="supportLeft">
          <div className="generateSupport cp">
            <div className="heading text-center h-[20%]">
              <h1 className="font-bold text-2xl">Generate Support Ticket</h1>
              <span>
                Pless fill out form below to submit your support request
              </span>
            </div>

            <div className="flex gap-4">
              <div className="w-[70%]">
                <label htmlFor="subject" className="label">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={initialValues?.subject}
                  onChange={handleChange}
                  className="input"
                  placeholder="Enter Subject.."
                />
              </div>
              <div className="w-[30%]">
                <label htmlFor="priority" className="label">
                  Priority
                </label>
                <select
                  name="priority"
                  id="priority"
                  className="input"
                  onChange={handleChange}
                  value={initialValues?.priority}
                >
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="low">Low</option>
                </select>
              </div>
            </div>
            <div>
              <label htmlFor="message" className="label">
                Message
              </label>
              <textarea
                name="message"
                id="message"
                className="textarea"
                onChange={handleChange}
                value={initialValues?.message}
                placeholder="Message..."
              ></textarea>
            </div>
            <div className="galleryUpload">
              <label htmlFor="galleryupload">
                <div className="galleryIcon">
                  <div className="w-full flex justify-center">
                    <MdCloudUpload className="text-4xl text-[#63B2DD]" />
                  </div>
                  <div>Click or Drag to Upload</div>
                </div>
              </label>
              <input
                type="file"
                multiple
                id="galleryupload"
                className="hidden"
                onChange={handleChange}
              />
            </div>
            <div className="supportReplay">
              <div></div>
              <div>
                <button
                  className="submit btn cursor-pointer"
                  onClick={handleSubmit}
                >
                  Submit Support
                </button>
              </div>
            </div>
          </div>
          <div className="galleryPreviewSupport absolute bottom-20">
            {initialValues?.gallery?.length > 0 && (
              <>
                {initialValues?.gallery?.map((file, index) => (
                  <div className="relative bg-white" key={index}>
                    <RxCross2
                      className="absolute top-1 right-1 bg-white rounded-full p-1 cursor-pointer hover:bg-red-100"
                      onClick={() => {
                        handleRemoveGallery(file, index);
                      }}
                    />
                    <img src={file?.url} alt="not found" />
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
        <div className="GeneratesupportRight flex items-center flex-col justify-center">
          <div>
            <img src="/site-support.png" alt="" />
          </div>
          <div className="cmt">
            <div className="flex items-center gap-2">
              <MdEmail /> kodetritechnologies.com
            </div>
            <div className="flex items-center gap-2">
              <MdCall /> +918103292287
            </div>
          </div>
          <hr className="horizontalRuler" />
          <div className="w-full">
            <label htmlFor="" className="label">
              Select customer
            </label>
            <SingleSelectDropdown
              endPoint={"users/admin/customers/all"}
              value={customer?.value}
              setValue={(value) => {
                setCustomers((pre) => ({
                  ...pre,
                  value,
                }));
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Create;
