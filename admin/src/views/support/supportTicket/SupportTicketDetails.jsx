import { MdCall, MdEmail } from "react-icons/md";
import { IoIosAttach, IoMdSend } from "react-icons/io";
import BasicProvider from "../../../authentications/BasicProvider";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import handleSubmitHelper from "../../../helpers/handleSubmitHelper";
import toast from "react-hot-toast";
import { getDateTime } from "../../../helpers/dateHelper";
import { RxCross2 } from "react-icons/rx";
function SupportTicketDetails() {
  const basicProvider = BasicProvider();
  const { id } = useParams();
  const [data, setData] = useState({});
  const validation = [
    {
      key: "message",
      required: true,
      maxLength: 3,
    },
  ];
  const [error, setError] = useState({});
  const [initialValues, setinitialValues] = useState({
    message: "",
    gallery: [],
    status: "open",
  });

  console.log("initialValues", initialValues);

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

  const fetchData = async () => {
    const response = await basicProvider.getMethod(
      `support/support-ticket/by/${id}`,
    );
    setData(response.data);
    setinitialValues((pre) => ({ ...pre, status: response?.data?.status }));
  };

  const handleSubmit = async () => {
    const data = handleSubmitHelper(initialValues, validation, setError);
    if (error?.message) {
      toast.error(error?.message);
    }
    if (data) {
      const response = await basicProvider.patchMethod(
        `support/support-ticket/reply/${id}`,
        data,
      );
      if (response.status === "success") {
        setinitialValues({
          message: "",
          gallery: [],
          status: "open",
        });
        fetchData();
      } else {
        fetchData();
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);
  return (
    <>
      <div className="supportHeader">
        <div>
          <div>
            <span className="font-bold">Ticket : </span> #{data?.ticket_no}
          </div>
          <div>
            <span className="font-bold">Subject : </span>
            {data?.subject}
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div>
            <span>Priority :</span>{" "}
            <button className="support-priority">{data?.priority}</button>
          </div>
          <button className="">
            <span>Created At : </span>
            {getDateTime(data?.createdAt)}
          </button>
        </div>
      </div>
      <div className="support-ticket-details">
        <div className="supportLeft relative">
          <div className="containet">
            {data?.message?.map((msg) => (
              <>
                {msg?.from === "customer" && (
                  <div style={{ padding: "0.5rem" }}>
                    <div className="customerReplay">
                      <div
                        className="bg-[#EBEDEF]"
                        style={{ padding: "0.5rem", borderRadius: "8px" }}
                      >
                        {msg?.message}
                      </div>
                      <div
                        className="flex items-center gap-2 cpl"
                        style={{ marginTop: "4px" }}
                      >
                        {msg?.from === "customer" && (
                          <span>{getDateTime(msg?.createdAt)}</span>
                        )}
                      </div>
                      {msg?.gallery?.length > 0 && (
                        <div className="flex flex-wrap gap-4">
                          {msg?.gallery?.map((img) => (
                            <img
                              style={{
                                borderRadius: "8px",
                                border: "0.5px solid gray",
                                objectFit: "contain",
                                width: "60px",
                                height: "60px",
                              }}
                              className=""
                              src={img.url}
                              alt="not found"
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
                {msg?.from === "admin" && (
                  <div
                    className="w-full flex justify-end items-end float-end"
                    style={{ padding: "0.5rem" }}
                  >
                    <div className="adminReplay">
                      <div
                        className="bg-[#D2E6F8]"
                        style={{ padding: "0.5rem", borderRadius: "8px" }}
                      >
                        {msg?.message}
                      </div>
                      <div
                        className="flex items-center gap-2 justify-end cpr"
                        style={{ marginTop: "4px" }}
                      >
                        {msg?.from === "admin" && (
                          <span>{getDateTime(msg?.createdAt)}</span>
                        )}
                      </div>
                      {msg?.gallery?.length > 0 && (
                        <div className="flex flex-wrap gap-4">
                          {msg?.gallery?.map((img) => (
                            <img
                              style={{
                                borderRadius: "8px",
                                border: "0.5px solid gray",
                                objectFit: "contain",
                                width: "60px",
                                height: "60px",
                              }}
                              className=""
                              src={img.url}
                              alt="not found"
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </>
            ))}
          </div>
          <div className="galleryPreview absolute bottom-16">
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
          {data?.status === "open" && (
            <div className="supportReplay">
              <div className="flex items-center gap-5">
                <div>
                  <label htmlFor="files">
                    <IoIosAttach className="text-2xl cursor-pointer" />
                  </label>
                  <input
                    type="file"
                    id="files"
                    className="hidden"
                    multiple
                    onChange={handleChange}
                  />
                </div>
                <textarea
                  type="text"
                  name="message"
                  onChange={handleChange}
                  value={initialValues?.message}
                  className="inputReplay"
                  placeholder="Replay..."
                ></textarea>
              </div>
              <div>
                <IoMdSend
                  className="text-blue-400 text-2xl cursor-pointer"
                  onClick={handleSubmit}
                />
              </div>

              {data?.type === "customer" && (
                <select
                  name="status"
                  value={initialValues?.status}
                  onChange={handleChange}
                  className="input supportStatus"
                >
                  <option value="open">Open</option>
                  <option value="close">Close</option>
                </select>
              )}
            </div>
          )}
        </div>

        {data?.type === "customer" ? (
          <div className="supportRight">
            <div>
              <div className="flex items-center gap-2">
                <img
                  style={{
                    borderRadius: "50%",
                    width: "50px",
                    height: "50px",
                    objectFit: "cover",
                  }}
                  src={data?.customer?.featured_image?.url || "/no-photo.png"}
                  alt=""
                />
                <span>{data?.customer?.name}</span>
              </div>
              <hr className="horizontalRuler" />
              <div className="cmt">
                <div className="flex items-center gap-2">
                  <MdEmail /> {data?.customer?.email}
                </div>
                <div className="flex items-center gap-2">
                  <MdCall /> {data?.customer?.mobile}
                </div>
              </div>
            </div>

            <div className="itemsDetails cmt">
              <div className="font-bold" style={{ marginBottom: "0.3rem" }}>
                Item Name
              </div>
              <div className="w-full flex items-center gap-2">
                <div className="itemImage">
                  <img
                    style={{
                      borderRadius: "50%",
                      width: "50px",
                      height: "50px",
                      objectFit: "cover",
                    }}
                    src={data?.item?.featured_image?.url}
                    alt="not found"
                  />
                </div>

                <div className="itemName">
                  {data?.item?.name.slice(0, 19)}...
                </div>
              </div>
            </div>
            <div>
              <img src="/support.png" alt="" />
            </div>
          </div>
        ) : (
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
          </div>
        )}
      </div>
    </>
  );
}

export default SupportTicketDetails;
