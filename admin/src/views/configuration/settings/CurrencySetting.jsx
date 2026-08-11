import { useState, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import TableLayoutComp from "../../../components/Tables/TableLayoutComp";
import NoRecords from "../../../components/NoRecords";
import BasicProvider from "../../../authentications/BasicProvider";
import handleSubmitHelper from "../../../helpers/handleSubmitHelper";
import DeleteSweetalert from "../../../components/DeleteSweetalert";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TablePagination from "@mui/material/TablePagination";
import { NavLink } from "react-router-dom";
import { MdCreate } from "react-icons/md";
import toast from "react-hot-toast";
import { createdAt } from "../../../helpers/dateHelper";

function CurrencySetting() {
  const basicProvider = BasicProvider();
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const page = searchParams.get("page") || 1;
  const count = searchParams.get("count") || 5;

  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({});
  const [initialValues, setInitialValues] = useState({
    name: "",
    symbol: "",
    code: "",
    is_default: false,
  });
  const [error, setError] = useState({});

  const validations = [
    { key: "name", required: true },
    { key: "symbol", required: true },
    { key: "code", required: true },
  ];

  const fetchData = async () => {
    try {
      const response = await basicProvider.getMethod(
        `configuration/currency?page=${page}&count=${count}`
      );
      if (response?.status === "success") {
        setData(response?.data?.data);
        setPagination(response?.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchCurrencyById = async () => {
    if (!id) return;
    try {
      const response = await basicProvider.getMethod(
        `configuration/currency/byId/${id}`
      );
      if (response?.status === "success") {
        const d = response.data;
        setInitialValues({
          name: d.name,
          symbol: d.symbol,
          code: d.code,
          is_default: d.is_default,
        });
      } else {
        toast.error(response.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setInitialValues((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const resetForm = () => {
    setInitialValues({ name: "", symbol: "", code: "", is_default: false });
    setError({});
  };

  const handleSubmit = async () => {
    const data = handleSubmitHelper(initialValues, validations, setError);
    if (!data) return;

    let response;
    if (id) {
      response = await basicProvider.patchMethod(
        `configuration/currency/update/${id}`,
        data
      );
    } else {
      response = await basicProvider.postMethod(
        "configuration/currency/create",
        data
      );
    }

    if (response?.status === "success") {
      toast.success(response.message);
      fetchData();
      resetForm();
      navigate("/setting/currency-setting");
    } else {
      toast.error(response?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, count]);

  useEffect(() => {
    fetchCurrencyById();
  }, [id]);

  return (
    <div>
      <div className="tagesPage flex">
        {/* Form */}
        <div className="itemRight">
          <TableLayoutComp title={id ? "Edit Currency" : "Add Currency"}>
            <div className="tagescard cp">
              <div>
                <label htmlFor="currency-name" className="label">
                  Currency Name<span className="span">*</span>
                </label>
                <input
                  id="currency-name"
                  name="name"
                  type="text"
                  className="input"
                  placeholder="e.g. US Dollar"
                  value={initialValues.name}
                  onChange={handleChange}
                />
                {error.name && (
                  <p style={{ color: "red", fontSize: "12px" }}>{error.name}</p>
                )}
              </div>

              <div>
                <label htmlFor="currency-symbol" className="label">
                  Symbol<span className="span">*</span>
                </label>
                <input
                  id="currency-symbol"
                  name="symbol"
                  type="text"
                  className="input"
                  placeholder="e.g. $"
                  value={initialValues.symbol}
                  onChange={handleChange}
                />
                {error.symbol && (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {error.symbol}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="currency-code" className="label">
                  ISO Code<span className="span">*</span>
                </label>
                <input
                  id="currency-code"
                  name="code"
                  type="text"
                  className="input uppercase"
                  placeholder="e.g. USD, INR"
                  value={initialValues.code}
                  onChange={handleChange}
                  maxLength={3}
                />
                {error.code && (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {error.code}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-4 cmt">
                <input
                  id="currency-is-default"
                  name="is_default"
                  type="checkbox"
                  checked={initialValues.is_default}
                  onChange={handleChange}
                />
                <label htmlFor="currency-is-default" className="font-bold">
                  Set as Default Currency
                </label>
              </div>

              <div className="cp flex gap-4 cmt">
                <button className="submit" onClick={handleSubmit}>
                  {id ? "Update" : "Submit"}
                </button>
                <button
                  className="cancel"
                  onClick={() => {
                    resetForm();
                    navigate("/setting/currency-setting");
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </TableLayoutComp>
        </div>

        {/* List */}
        <div className="itemLeft">
          {data?.length === 0 ? (
            <NoRecords />
          ) : (
            <div className="itemTable">
              <Box sx={{ width: "100%" }}>
                <Paper sx={{ width: "100%", mb: 2 }}>
                  <TableContainer>
                    <Table sx={{ minWidth: 500 }} aria-label="currencies table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Name</TableCell>
                          <TableCell align="center">Symbol</TableCell>
                          <TableCell align="center">Code</TableCell>
                          <TableCell align="center">Default</TableCell>
                          <TableCell align="center">Created</TableCell>
                          <TableCell align="center">Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {data?.map((row) => (
                          <TableRow key={row._id} hover sx={{ cursor: "pointer" }}>
                            <TableCell>{row.name}</TableCell>
                            <TableCell align="center">{row.symbol}</TableCell>
                            <TableCell align="center" className="uppercase font-semibold">{row.code}</TableCell>
                            <TableCell align="center">
                              {row.is_default ? (
                                <span
                                  style={{
                                    background: "#22c55e",
                                    color: "#fff",
                                    padding: "2px 10px",
                                    borderRadius: "12px",
                                    fontSize: "12px",
                                    fontWeight: 600,
                                  }}
                                >
                                  Default
                                </span>
                              ) : (
                                <span
                                  style={{
                                    background: "#e5e7eb",
                                    color: "#6b7280",
                                    padding: "2px 10px",
                                    borderRadius: "12px",
                                    fontSize: "12px",
                                  }}
                                >
                                  No
                                </span>
                              )}
                            </TableCell>
                            <TableCell align="center">
                              {createdAt(row.createdAt)}
                            </TableCell>
                            <TableCell align="center">
                              <div className="flex items-center gap-1 text-2xl">
                                <NavLink
                                  to={`/setting/currency-setting/${row._id}/edit`}
                                >
                                  <MdCreate className="text-blue-500" />
                                </NavLink>
                                <DeleteSweetalert
                                  endpoint={"configuration/currency"}
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
                    rowsPerPageOptions={[5, 15, 30, 45, 100]}
                    component="div"
                    count={pagination?.totalData || 0}
                    rowsPerPage={pagination?.limit || 5}
                    page={(pagination?.page || 1) - 1}
                    onPageChange={(e, newPage) => {
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

export default CurrencySetting;
