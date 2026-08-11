import { useEffect, useState } from "react";
import { MdAdd } from "react-icons/md";
import BasicProvider from "../../authentications/BasicProvider";
import toast from "react-hot-toast";

function TableLayoutComp({
  children,
  title,
  showSwitch = false,
  required = false,
  addButton = false,
  buttonCount,
  status = true,
  getStatus,
  endPoint,
  data,
  refresh,
}) {
  const basicProvider = BasicProvider();
  const [toggle, setToggle] = useState(status);

  const handleToggle = () => {
    setToggle((prev) => {
      const newStatus = !prev;
      if (getStatus) getStatus(newStatus);
      return newStatus;
    });
  };

  useEffect(() => {
    setToggle(status);
    if (getStatus) getStatus(status);
  }, [status]);

  const handelUpdateStatus = async () => {
    const response = await basicProvider.postMethod(endPoint, {
      ...data,
      status: data?.status === "active" ? "inActive" : "active",
    });
    if (response?.status === "success") {
      toast.success(response?.message);
      refresh();
    } else {
      toast.error(response?.message);
    }
  };

  const buttonCss = {
    justifyContent: `${toggle ? "right" : "left"}`,
    backgroundColor: `${toggle ? "#0D6EFD" : "white"}`,
  };
  const switchCss = {
    backgroundColor: `${toggle ? "white" : "gray"}`,
  };

  const cardTemplateCss = {
    height: `${toggle ? "" : "2.7rem"}`,
    overflow: `${toggle ? "" : "hidden"}`,
  };
  return (
    <div className="cardTemplate" style={cardTemplateCss}>
      <div className={`${title ? "templateHeading" : ""}`}>
        <div className="tableTitle">
          {title} {required && <span className="text-red-700">*</span>}{" "}
        </div>
        {showSwitch && (
          <div
            className="tableToggleButton"
            onClick={() => {
              handleToggle();
              if (endPoint) {
                handelUpdateStatus();
              }
            }}
            style={buttonCss}
          >
            <div className="toggle-switch" style={switchCss}></div>
          </div>
        )}
        {addButton && (
          <button className="add flex items-center gap-1" onClick={buttonCount}>
            <MdAdd /> Add New
          </button>
        )}
      </div>
      {children}
    </div>
  );
}

export default TableLayoutComp;
