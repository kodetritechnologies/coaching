import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import googlecon from "..//assets/icons/google.png";
import { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import BasicProvider from "../authentications/BasicProvider";
import handleSubmitHelper from "../helpers/handleSubmitHelper";
import toast from "react-hot-toast";
function Signup() {
  const basicProvider = BasicProvider();
  const navigate = useNavigate();

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
      key: "password",
      required: true,
      maxLength: 8,
    },
  ];

  const [show, setShow] = useState({
    password: false,
    confirmpass: false,
  });
  const [initialValues, setInitialValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPass: "",
  });
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setInitialValues((pre) => ({
      ...pre,
      [name]: name == "term" ? checked : value,
    }));
  };

  const handleEye = (type) => {
    setShow((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const handelSubmit = async () => {
    if (initialValues.password !== initialValues.confirmPass) {
      toast.error("Password and Confirm Password do not match");
      return;
    } else if (!initialValues.term) {
      toast.error("Please accept the Terms & Conditions to continue.");
      return;
    }
    const data = handleSubmitHelper(initialValues, validation, setError);
    try {
      if (data) {
        const response = await basicProvider.postMethod(
          "users/admin/signup",
          data,
        );
        setLoading(true);
        if (response.status === "success") {
          toast.success(response.message);
          setInitialValues({
            name: "",
            email: "",
            password: "",
            confirmPass: "",
            term: false,
          });
          navigate("/login");
        } else {
          toast.error(response.message);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="signupPage">
      <div className="registerleft">
        <img src="/signup.png" alt="" />
      </div>
      <div className="registerRight">
        <div className="registerlogo">
          <img src="/sublogo.png" alt="logo" />
        </div>
        <div className="signupForm">
          <h1 className="text-center font-bold">Signup to Dashboard</h1>
          <div>
            <label htmlFor="name" className="label">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={initialValues?.name}
              name="name"
              className={`input ${error.name && "customeErrorInput"}`}
              placeholder="Enter your name"
              onChange={handleChange}
            />
            {error?.name && (
              <span className="customeErrorMessage">{error.name}</span>
            )}
          </div>
          <div>
            <label htmlFor="email" className="label">
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              value={initialValues?.email}
              className={`input ${error.email && "customeErrorInput"}`}
              placeholder="Enter your email"
              onChange={handleChange}
            />
            {error?.email && (
              <span className="customeErrorMessage">{error.email}</span>
            )}
          </div>
          <div>
            <label htmlFor="password" className="label">
              Password
            </label>
            <div
              className={`input-password ${
                error.password && "customeErrorInput"
              }`}
            >
              <input
                type={show.password ? "text" : "password"}
                id="password"
                name="password"
                value={initialValues?.password}
                className=""
                placeholder="Enter your password"
                onChange={handleChange}
              />
              <span
                onClick={() => {
                  handleEye("password");
                }}
              >
                {show.password ? (
                  <IoMdEye className="cursor-pointer" />
                ) : (
                  <IoMdEyeOff className="cursor-pointer" />
                )}
              </span>
            </div>
            {error?.password && (
              <span className="customeErrorMessage">{error.password}</span>
            )}
          </div>
          <div>
            <label htmlFor="confirmPass" className="label">
              Reconfirm Password
            </label>
            <div className="input-password">
              <input
                type={show.confirmpass ? "text" : "password"}
                id="confirmPass"
                className=""
                name="confirmPass"
                placeholder="Re-confirm your password"
                onChange={handleChange}
              />
              <span
                onClick={() => {
                  handleEye("confirmpass");
                }}
              >
                {show.confirmpass ? (
                  <IoMdEye className="cursor-pointer" />
                ) : (
                  <IoMdEyeOff className="cursor-pointer" />
                )}
              </span>
            </div>
          </div>
          <div
            className="flex items-centern gap-2"
            style={{ padding: "0.5rem 0rem" }}
          >
            <input
              type="checkbox"
              id="term"
              name="term"
              onChange={handleChange}
            />
            <label htmlFor="term" className="font-bold select-none label">
              {" "}
              I accepted all terms & conditions.
            </label>
          </div>
          <div className="signup" onClick={handelSubmit}>
            {loading ? "Signing up..." : "Sign up"}
          </div>
          <div className="flex justify-center items-center gap-2">
            <span className="or"></span>
            OR
            <span className="or"></span>
          </div>
          <div
            className="flex items-center justify-center gap-2"
            style={{ padding: "0.2rem" }}
          >
            <span>
              <label htmlFor="">Already have an account?</label>
            </span>
            <span className="text-[#518EF8]">
              <NavLink to="/login">Login</NavLink>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
