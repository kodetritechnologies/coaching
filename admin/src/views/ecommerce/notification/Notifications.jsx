import { useState } from "react";
import TableLayoutComp from "../../../components/Tables/TableLayoutComp";
import FileUplodsModule from "../../../components/modules/FileUplodsModule";
import BasicProvider from "../../../authentications/BasicProvider";
import {
  NavLink,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import handleSubmitHelper from "../../../helpers/handleSubmitHelper";
import { useEffect } from "react";
import DeleteSweetalert from "../../../components/DeleteSweetalert";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import NoRecords from "../../../components/NoRecords";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Checkbox from "@mui/material/Checkbox";
import TableBody from "@mui/material/TableBody";
import TablePagination from "@mui/material/TablePagination";
import { MdCreate } from "react-icons/md";
import toast from "react-hot-toast";
import { createdAt } from "../../../helpers/dateHelper";

function Notifications() {
  const basicProvider = BasicProvider();
  const [searchParams, setSearchParams] = useSearchParams();
  const { id } = useParams();
  const navigate = useNavigate();

  const page = searchParams.get("page") || 1;
  const count = searchParams.get("count") || 5;
  const [data, setData] = useState([]);
  const [tagesType, setTagesType] = useState([]);
  const [type, setType] = useState(false);
  const [pagination, setPagination] = useState({});
  const validations = [
    {
      key: "title",
      required: true,
      maxLength: 3,
    },
    {
      key: "type",
      required: true,
      maxLength: 3,
    },
  ];
  const [initialValues, setInitialValues] = useState({
    title: "",
    message: "",
    type: "",
    link: "",
    featured_image: "",
    isRead: false,
  });

  const [multiDelete, setMultiDelete] = useState([]);
  const [error, setError] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setInitialValues((pre) => ({ ...pre, [name]: value }));
    if (value === "other") {
      setType(true);
    } else {
      setType(false);
    }
  };

  const handleMultiDelete = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setMultiDelete((pre) => [...pre, value]);
    } else {
      setMultiDelete((pre) => pre.filter((id) => id !== value));
    }
  };

  const fetchData = async () => {
    try {
      const response = await basicProvider.getMethod(
        `ecommerce/notifications?page=${page}&count=${count}`
      );
      setData(response?.data?.data);
      setTagesType(response.type);
      setPagination(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTagesById = async () => {
    try {
      const response = await basicProvider.getMethod(
        `ecommerce/notifications/get/${id}`
      );
      setInitialValues(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async () => {
    try {
      const data = handleSubmitHelper(initialValues, validations, setError);
      let response = null;
      if (data) {
        if (id) {
          response = await basicProvider.patchMethod(
            `ecommerce/notifications/update/${id}`,
            data
          );
          if (response.status === "success") {
            toast.success(response.message);
            fetchData();
            setInitialValues({
              title: "",
              message: "",
              type: "",
              link: "",
              featured_image: "",
              isRead: false,
            });
            navigate("ecommerce/notifications");
            setType(false);
          } else {
            toast.error(response.message);
          }
        } else {
          response = await basicProvider.postMethod(
            `ecommerce/notifications/create`,
            data
          );
          if (response.status === "success") {
            toast.success(response.message);
            fetchData();
            setInitialValues({
              title: "",
              message: "",
              type: "",
              link: "",
              featured_image: "",
              isRead: false,
            });
            setType(false);
          } else {
            toast.error(response.message);
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [count, page]);

  useEffect(() => {
    fetchTagesById();
  }, [id]);
  return (
    <div>
      <div className="notifiactionPage flex">
        <div className="itemRight">
          <TableLayoutComp title={"Notifications"}>
            <div className="notificationscard cp">
              <div>
                <label htmlFor="title" className="label">
                  Title<span className="span">*</span>
                </label>
                <input
                  name="title"
                  id="title"
                  value={initialValues?.title}
                  className="input"
                  placeholder="Enter title"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="message" className="label">
                  Message<span className="span">*</span>
                </label>
                <textarea
                  name="message"
                  style={{ height: "150px" }}
                  id="message"
                  className="input"
                  value={initialValues?.message}
                  placeholder="Enter Message"
                  onChange={handleChange}
                ></textarea>
              </div>
              <div>
                <label htmlFor="type" className="label">
                  Select Type<span className="span">*</span>
                </label>
                <select
                  name="type"
                  id="type"
                  value={initialValues?.type}
                  className="input"
                  onChange={handleChange}
                >
                  <option value="" selected disabled>
                    Select Type
                  </option>
                  {tagesType?.map((typ, idx) => (
                    <option key={idx} value={typ?._id}>
                      {typ?._id}
                    </option>
                  ))}
                  <option value="other">Other</option>
                </select>
              </div>
              {type && (
                <div>
                  <label htmlFor="otherType" className="label">
                    Other Type<span className="span">*</span>
                  </label>
                  <input
                    type="text"
                    id="otherType"
                    name="other"
                    className="input"
                    placeholder="Other Type"
                    onChange={(e) => {
                      setInitialValues((pre) => ({
                        ...pre,
                        type: e.target.value,
                      }));
                    }}
                  />
                </div>
              )}
              <div>
                <label htmlFor="link" className="label">
                  Link
                </label>
                <input
                  name="link"
                  id="link"
                  value={initialValues?.link}
                  className="input"
                  placeholder="Enter Link"
                  onChange={handleChange}
                />
              </div>
              <div className="cp flex gap-4">
                <button className="submit" onClick={handleSubmit}>
                  Submit
                </button>
                <button
                  className="cancel"
                  onClick={() => {
                    setInitialValues({
                      title: "",
                      message: "",
                      type: "",
                      link: "",
                      featured_image: "",
                      isRead: false,
                    });
                    setType(false);
                    navigate("/ecommerce/notifications");
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </TableLayoutComp>
        </div>
        <div className="itemLeft">
          {data?.length === 0 ? (
            <>
              <NoRecords />
            </>
          ) : (
            <div className="itemTable">
              {multiDelete && multiDelete?.length > 0 && (
                <div className="w-full cp flex items-center justify-between text-2xl">
                  <div style={{ fontSize: "16px" }}>
                    {multiDelete?.length} selecte to Delete
                  </div>
                  <DeleteSweetalert
                    endpoint={"ecommerce/notifications"}
                    type={"multi-delete"}
                    multiDelete={multiDelete}
                    refresh={fetchData}
                  />
                </div>
              )}
              <Box sx={{ width: "100%" }}>
                <Paper sx={{ width: "100%", mb: 2 }}>
                  <TableContainer>
                    <Table sx={{ minWidth: 750 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell padding="checkbox">
                            <Checkbox
                              color="primary"
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setMultiDelete(data.map((row) => row._id));
                                } else {
                                  setMultiDelete([]);
                                }
                              }}
                            />
                          </TableCell>
                          <TableCell>Title</TableCell>
                          <TableCell align="center">Type</TableCell>
                          <TableCell align="center">Created</TableCell>
                          <TableCell align="center">Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {data?.map((row) => (
                          <TableRow
                            key={row._id}
                            hover
                            sx={{ cursor: "pointer" }}
                          >
                            <TableCell padding="checkbox">
                              <Checkbox
                                name={row.title}
                                value={row._id}
                                color="primary"
                                checked={multiDelete.includes(row._id)}
                                onChange={handleMultiDelete}
                              />
                            </TableCell>
                            <TableCell align="center">{row.title}</TableCell>
                            <TableCell align="center">{row.type}</TableCell>

                            <TableCell align="center">
                              {createdAt(row.createdAt)}
                            </TableCell>
                            <TableCell align="center">
                              <div className="flex items-center gap-1 text-2xl">
                                <NavLink
                                  to={`/ecommerce/notifications/${row._id}/edit`}
                                >
                                  <MdCreate className="text-blue-500" />
                                </NavLink>
                                <DeleteSweetalert
                                  endpoint={"ecommerce/notifications"}
                                  type={"delete"}
                                  deleteID={row?._id}
                                  refresh={fetchData}
                                />
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <TablePagination
                    rowsPerPageOptions={[1, 2, 5, 15, 30, 45, 100]}
                    component="div"
                    count={pagination?.totalData}
                    rowsPerPage={pagination?.limit || 5}
                    page={pagination?.page - 1}
                    onPageChange={(e, newPage) => {
                      console.log(newPage);
                      setSearchParams(`?page=${newPage + 1}`);
                    }}
                    onRowsPerPageChange={(e) => {
                      setSearchParams(`?count=${e.target.value}`);
                    }}
                  />
                </Paper>
              </Box>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Notifications;
