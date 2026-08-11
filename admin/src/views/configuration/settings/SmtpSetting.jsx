import { useEffect, useState } from "react";
import TableLayoutComp from "../../../components/Tables/TableLayoutComp";
import BasicProvider from "../../../authentications/BasicProvider";
import handleSubmitHelper from "../../../helpers/handleSubmitHelper";
import toast from "react-hot-toast";

function SmtpSetting() {
  const basicProvider = BasicProvider();
  const [initialValues, setInitialValues] = useState({
    host: "",
    port: "",
    secure: "",
    user: "",
    pass: "",
    from: "",
    to: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInitialValues((pre) => ({ ...pre, [name]: value }));
  };

  const fetchsmtpData = async () => {
    try {
      const response = await basicProvider.getMethod("configuration/smtp");
      if (response.data) {
        setInitialValues(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async () => {
    const data = handleSubmitHelper(initialValues);
    let response = null;
    if (data) {
      response = await basicProvider.postMethod(
        "configuration/smtp/create",
        data
      );
      if (response.status === "success") {
        toast.success(response.message);
        fetchsmtpData();
      } else {
        toast.error(response.message);
      }
    }
  };

  useEffect(() => {
    fetchsmtpData();
  }, []);
  return (
    <div className="smtpsettingPage cp">
      <TableLayoutComp title={"SMTP Setting"}>
        <div className="cp">
          <div>
            <label htmlFor="host" className="label">
              Host
            </label>
            <input
              type="text"
              className={`input`}
              id="host"
              name="host"
              value={initialValues?.host}
              onChange={handleOnChange}
              placeholder="Enter host name.."
            />
          </div>
          <div>
            <label htmlFor="port" className="label">
              Port
            </label>
            <input
              type="text"
              id="port"
              name="port"
              value={initialValues?.port}
              onChange={handleOnChange}
              className={`input`}
              placeholder="Enter port"
            />
          </div>
          <div>
            <label htmlFor="secure" className="label">
              Secure
            </label>
            <input
              type="text"
              id="secure"
              name="secure"
              value={initialValues?.secure}
              className={`input`}
              onChange={handleOnChange}
              placeholder="Enter secure"
            />
          </div>
          <div>
            <label htmlFor="user" className="label">
              User
            </label>
            <input
              type="text"
              id="user"
              name="user"
              value={initialValues?.user}
              onChange={handleOnChange}
              className={`input`}
              placeholder="Enter user"
            />
          </div>
          <div>
            <label htmlFor="pass" className="label">
              Pass
            </label>
            <input
              id="pass"
              className={`input`}
              name="pass"
              value={initialValues?.pass}
              onChange={handleOnChange}
              placeholder="Enter your pass"
            />
          </div>
          <div>
            <label htmlFor="from" className="label">
              Mail From
            </label>
            <input
              name="from"
              id="from"
              className={`input`}
              value={initialValues?.from}
              onChange={handleOnChange}
              placeholder="Enter mail from"
            />
          </div>
          <div>
            <label htmlFor="to" className="label">
              Mail To
            </label>
            <input
              name="to"
              id="to"
              className={`input`}
              value={initialValues?.to}
              onChange={handleOnChange}
              placeholder="Enter mail to"
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
  );
}

export default SmtpSetting;
