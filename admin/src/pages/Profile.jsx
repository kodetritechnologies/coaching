import { useContext, useEffect, useState } from "react";
import TableLayoutComp from "../components/Tables/TableLayoutComp";
import { useParams } from "react-router-dom";
import BasicProvider from "../authentications/BasicProvider";
import handleSubmitHelper from "../helpers/handleSubmitHelper";
import toast from "react-hot-toast";
import FileUplodsModule from "../components/modules/FileUplodsModule";
import { AuthContext } from "../contexts/AuthContext";
function Profile() {
  const validation = [
    {
      key: "name",
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
      key: "password",
      required: true,
      maxLength: 8,
    },
  ];
  const basicProvider = BasicProvider();
  const { id } = useParams();
  const { getAdmin } = useContext(AuthContext);
  const [error, setError] = useState([]);
  const [image, setImage] = useState(null);
  const [initialValues, setInitialValues] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    gender: "",
    address: "",
    description: "",
    featured_image: null,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setInitialValues((pre) => ({
      ...pre,
      [name]: type === "radio" ? (checked ? value : pre[name]) : value,
    }));
  };

  const handelSubmit = async () => {
    let response = "";
    const data = handleSubmitHelper(initialValues, validation, setError);
    try {
      if (data) {
        response = await basicProvider.patchMethod(
          `users/admin/update/${id}`,
          data
        );
        if (response.status === "success") {
          toast.success(response.message);
          fetchData();
          getAdmin();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchData = async () => {
    const response = await basicProvider.getMethod(`users/admin/getAdmin`);
    setInitialValues(response?.data);
    setImage(response?.data?.featured_image);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className=" adminCreatePage flex">
        <div className="itemLeft">
          <TableLayoutComp title={"Add Admin"}>
            <div className="adminCard cp">
              <div>
                <label htmlFor="name" className="label">
                  Name <span className="span">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={initialValues.name}
                  className={`input ${error.name && "customeErrorInput"}`}
                  id="name"
                  placeholder="Enter your name"
                  onChange={handleChange}
                />
                {error?.name && (
                  <span className="customeErrorMessage">{error.name}</span>
                )}
              </div>
              <div>
                <label htmlFor="mobile" className="label">
                  Mobile <span className="span">*</span>
                </label>
                <input
                  type="text"
                  value={initialValues?.mobile}
                  className={`input ${error.mobile && "customeErrorInput"}`}
                  name="mobile"
                  id="mobile"
                  placeholder="Enter mobile number"
                  onChange={handleChange}
                />
                {error?.mobile && (
                  <span className="customeErrorMessage">{error.mobile}</span>
                )}
              </div>
              <div>
                <label htmlFor="email" className="label">
                  Email <span className="span">*</span>
                </label>
                <input
                  type="text"
                  value={initialValues?.email}
                  className={`input ${error.email && "customeErrorInput"}`}
                  name="email"
                  id="email"
                  placeholder="Enter your email here"
                  onChange={handleChange}
                />
                {error?.email && (
                  <span className="customeErrorMessage">{error.email}</span>
                )}
              </div>
              <div>
                <label htmlFor="password" className="label">
                  password <span className="span">*</span>
                </label>
                <input
                  type="password"
                  value={initialValues?.password}
                  className={`input ${error.password && "customeErrorInput"}`}
                  name="password"
                  id="password"
                  placeholder="Enter your password here"
                  onChange={handleChange}
                />
                {error?.password && (
                  <span className="customeErrorMessage">{error.password}</span>
                )}
              </div>
              <div className="flex gap-4 cmt">
                <span className="font-bold">Gender</span>
                <span className="flex gap-4">
                  <span className="flex gap-2 items-center">
                    <input
                      type="radio"
                      value="male"
                      id="male"
                      name="gender"
                      checked={initialValues?.gender === "male"}
                      onChange={handleChange}
                    />
                    <label htmlFor="male" className="label">
                      Male
                    </label>
                  </span>
                  <span className="flex gap-2 items-center">
                    <input
                      type="radio"
                      id="female"
                      value="female"
                      name="gender"
                      checked={initialValues?.gender === "female"}
                      onChange={handleChange}
                    />
                    <label htmlFor="female" className="label">
                      Female
                    </label>
                  </span>
                </span>
              </div>

              <div>
                <label htmlFor="address" className="label">
                  Address
                </label>
                <textarea
                  name="address"
                  id="address"
                  value={initialValues?.address}
                  className="textarea"
                  placeholder="Enter your address here"
                  onChange={handleChange}
                ></textarea>
              </div>
              <div>
                <label htmlFor="description" className="label">
                  Description
                </label>
                <textarea
                  name="description"
                  id="description"
                  value={initialValues?.description}
                  className="textarea"
                  placeholder="Enter your description here"
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>
          </TableLayoutComp>
        </div>
        <div className="itemRight">
          <TableLayoutComp title={"Profile details"}>
            <div className="submitcard cp">
              <div>
                <label htmlFor="profile" className="label">
                  Profile
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
              <div className="flex gap-2 cmt">
                <button className="submit" onClick={handelSubmit}>
                  Update
                </button>
                <button
                  className="cancel"
                  onClick={() => {
                    setInitialValues({
                      name: "",
                      email: "",
                      mobile: "",
                      password: "",
                      gender: "",
                      address: "",
                      description: "",
                      featured_image: null,
                    });
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </TableLayoutComp>
        </div>
      </div>
    </div>
  );
}

export default Profile;
