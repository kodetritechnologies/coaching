import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { domainValidation } from "../utils/RegExp";
import handleSubmitHelper from "../helpers/handleSubmitHelper";
import toast from "react-hot-toast";
import BasicProvider from "../authentications/BasicProvider";
import { useState } from "react";

function WebsiteForm() {
  const basicProvider = BasicProvider();
  const { setWebsite } = useContext(AuthContext);
  const validation = [
    {
      key: "name",
      required: true,
      maxLength: 3,
    },
    {
      key: "domain",
      required: true,
      maxLength: 3,
    },
  ];
  const [initialValues, setInitialValues] = useState({
    name: "",
    domain: "",
  });
  const [error, setError] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInitialValues((pre) => ({
      ...pre,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const isValidDomain = domainValidation(initialValues.domain);

    const data = handleSubmitHelper(initialValues, validation, setError);
    if (data) {
      if (!isValidDomain) {
        setError({ domain: "Enter a valid domain name." });
      } else {
        const response = await basicProvider.postMethod(
          "configuration/website/create",
          data
        );
        if (response.status === "success") {
          toast.success(response.message);
          setWebsite(response?.data);
          setInitialValues({
            name: "",
            domain: "",
          });
        } else {
          toast.error(response.message);
        }
      }
    }
  };
  return (
    <div className="websiteform">
      <div className="logoHeader">
        <div className="websiteClose"></div>
        <div>
          <img src="/suposto.png" className="websiteLogo" alt="" />
        </div>
        <div className="websiteClose"></div>
      </div>
      <div className="websitename">
        <div>
          <img src="/monitor.png" alt="" />
        </div>
        <span className="w-full">
          <input
            type="text"
            name="name"
            value={initialValues.name}
            className={`input ${error.name && "customeErrorInput"}`}
            placeholder="Enter your website name"
            onChange={handleChange}
          />
          {error?.name && (
            <div className="customeErrorMessage">{error.name}</div>
          )}
        </span>
      </div>
      <div className="websiteDomain">
        <div>
          <img src="/website.png" alt="" />
        </div>
        <span className="w-full">
          <input
            type="text"
            name="domain"
            value={initialValues.domain}
            className={`input ${error.domain && "customeErrorInput"}`}
            placeholder="Enter your domain name"
            onChange={handleChange}
          />
          {error?.domain && (
            <div className="customeErrorMessage">{error.domain}</div>
          )}
        </span>
      </div>
      <div className="submitButton">
        <button className="websiteButton" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default WebsiteForm;
