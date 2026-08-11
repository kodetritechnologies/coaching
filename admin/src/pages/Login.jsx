import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import googlecon from "..//assets/icons/google.png";
import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import handleSubmitHelper from "../helpers/handleSubmitHelper";
import BasicProvider from "../authentications/BasicProvider";
import { AuthContext } from "../contexts/AuthContext";
function Login() {
  const { setAdmin } = useContext(AuthContext);
  const basicProvider = BasicProvider();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const validation = [
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
  const [initialValues, setInitialValues] = useState({
    email: "",
    password: "",
    term: false,
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

  const handleSubmit = async () => {
    try {
      if (!initialValues.term) {
        toast.error("Please accept the Terms & Conditions to continue.");
        return;
      }
      const data = handleSubmitHelper(initialValues, validation, setError);
      if (data) {
        const response = await basicProvider.postMethod(
          "users/admin/login",
          data,
        );
        setLoading(true);
        if (response.status === "success") {
          toast.success(response.message);
          setAdmin(response?.data);
          setInitialValues({
            email: "",
            password: "",
            term: false,
          });
          navigate("/");
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
        <img src="/login.png" alt="" style={{ transform: "scaleX(-1)" }} />
      </div>
      <div className="loginRight">
        <div className="registerlogo">
          <img src="/sublogo.png" alt="logo" />
        </div>
        <div className="signupForm">
          <h1 className="text-center font-bold">Login to Dashboard</h1>
          <div>
            <label htmlFor="email" className="label">
              Email
            </label>
            <input
              type="text"
              id="email"
              className={`input ${error.email && "customeErrorInput"}`}
              name="email"
              value={initialValues.email}
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
                type={show ? "text" : "password"}
                id="password"
                className=""
                name="password"
                value={initialValues.password}
                placeholder="Enter your password"
                onChange={handleChange}
              />
              <span
                onClick={() => {
                  setShow(!show);
                }}
              >
                {show ? (
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
          <div
            className="flex items-centern gap-2"
            style={{ padding: "0.5rem 0rem" }}
          >
            <input
              type="checkbox"
              id="term"
              name="term"
              value={initialValues.term}
              onChange={handleChange}
            />
            <label htmlFor="term" className="font-bold select-none label">
              {" "}
              I accepted all terms & conditions.
            </label>
          </div>
          <div className="signup" onClick={handleSubmit}>
            {loading ? "Logging in..." : "Login"}
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
              <label htmlFor="">I don't have an account?</label>
            </span>
            <span className="text-[#518EF8]">
              <NavLink to="/signup">Sign up</NavLink>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
