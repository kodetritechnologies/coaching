import { useEffect, useState } from "react";
import FileUplodsModule from "../../../components/modules/FileUplodsModule";
import TableLayoutComp from "../../../components/Tables/TableLayoutComp";
import { domainValidation } from "../../../utils/RegExp";
import handleSubmitHelper from "../../../helpers/handleSubmitHelper";
import BasicProvider from "../../../authentications/BasicProvider";
import toast from "react-hot-toast";

function WebsiteSetting() {
  const basicProvider = BasicProvider();
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
    {
      key: "email",
      required: true,
      maxLength: 3,
    },
    {
      key: "mobile",
      required: true,
      maxLength: 10,
    },
    {
      key: "address",
      required: true,
      maxLength: 3,
    },
  ];
  const [image, setImage] = useState(null);
  const [isEdited, setIsEdited] = useState(false);
  const [initialValues, setInitialValues] = useState({
    name: "",
    domain: "",
    email: "",
    mobile: "",
    address: "",
    featured_image: null,
  });
  const [error, setError] = useState({});

  const handeChange = (e) => {
    const { name, value } = e.target;
    setInitialValues((pre) => ({
      ...pre,
      [name]: value,
    }));
  };

  const fetchWebsiteData = async () => {
    try {
      const response = await basicProvider.getMethod("configuration/website");
      if (response.data) {
        setInitialValues(response.data);
        setImage(response?.data?.featured_image);
        setIsEdited(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async () => {
    const isValidDomain = domainValidation(initialValues.domain);
    if (isValidDomain) {
      const data = handleSubmitHelper(initialValues, validation, setError);
      let response = null;
      if (data) {
        if (isEdited) {
          try {
            response = await basicProvider.patchMethod(
              `configuration/website/update/${initialValues?._id}`,
              data
            );
            if (response.status === "success") {
              toast.success(response.message);
            } else {
              toast.error(response.message);
            }
          } catch (error) {
            console.log(error);
          }
        } else {
          response = await basicProvider.postMethod(
            "configuration/website/create",
            data
          );
          if (response.status === "success") {
            toast.success(response.message);
            setInitialValues({
              name: "",
              domain: "",
              email: "",
              mobile: "",
              address: "",
            });
          } else {
            toast.error(response.message);
          }
        }
      }
    } else {
      setError({ domain: "Enter a valid domain name." });
    }
  };

  useEffect(() => {
    fetchWebsiteData();
  }, []);
  return (
    <div>
      <div className="websitesettingPage cp">
        <TableLayoutComp title={"Website Setting"}>
          <div className="websirecard cp">
            <div>
              <label htmlFor="name" className="label">
                Name <span className="span">*</span>
              </label>
              <input
                type="text"
                className={`input ${error.name && "customeErrorInput"}`}
                id="name"
                name="name"
                value={initialValues.name}
                placeholder="Enter your website name.."
                onChange={handeChange}
              />
              {error?.name && (
                <span className="customeErrorMessage">{error.name}</span>
              )}
            </div>
            <div>
              <label htmlFor="domain" className="label">
                Domain<span className="span">*</span>
              </label>
              <input
                type="text"
                id="domain"
                name="domain"
                value={initialValues.domain}
                className={`input ${error.domain && "customeErrorInput"}`}
                placeholder="Enter your website domain name"
                onChange={handeChange}
              />
              {error?.domain && (
                <span className="customeErrorMessage">{error.domain}</span>
              )}
            </div>
            <div>
              <label htmlFor="email" className="label">
                Email<span className="span">*</span>
              </label>
              <input
                type="text"
                id="email"
                name="email"
                value={initialValues.email}
                className={`input ${error.email && "customeErrorInput"}`}
                placeholder="Enter your email"
                onChange={handeChange}
              />
              {error?.email && (
                <span className="customeErrorMessage">{error.email}</span>
              )}
            </div>
            <div>
              <label htmlFor="mobile" className="label">
                Mobile<span className="span">*</span>
              </label>
              <input
                type="text"
                id="mobile"
                name="mobile"
                value={initialValues.mobile}
                className={`input ${error.mobile && "customeErrorInput"}`}
                placeholder="Enter your mobile number"
                onChange={handeChange}
              />
              {error?.mobile && (
                <span className="customeErrorMessage">{error.mobile}</span>
              )}
            </div>
            <div>
              <label htmlFor="address" className="label">
                Address<span className="span">*</span>
              </label>
              <textarea
                name="address"
                id="address"
                value={initialValues.address}
                className={`input ${error.address && "customeErrorInput"}`}
                style={{ minHeight: "4rem" }}
                placeholder="Enter your address"
                onChange={handeChange}
              ></textarea>
              {error?.address && (
                <span className="customeErrorMessage">{error.address}</span>
              )}
            </div>
            <div>
              <label htmlFor="logo" className="label">
                Logo<span className="span">*</span>
              </label>
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
            <div className="cp cmt">
              <button className="submit" onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </div>
        </TableLayoutComp>
      </div>
    </div>
  );
}

export default WebsiteSetting;
