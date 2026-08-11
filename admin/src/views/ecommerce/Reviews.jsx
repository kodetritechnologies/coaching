import { useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Checkbox from "@mui/material/Checkbox";
import TableBody from "@mui/material/TableBody";
import TablePagination from "@mui/material/TablePagination";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import BasicProvider from "../../authentications/BasicProvider";
import SubHeader from "../../components/SubHeader";
import NoRecords from "../../components/NoRecords";
import DeleteSweetalert from "../../components/DeleteSweetalert";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { FaStar } from "react-icons/fa";
import { FaRectangleList } from "react-icons/fa6";
import { createdAt } from "../../helpers/dateHelper";

function Reviews() {
  const basicProvider = BasicProvider();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;
  const count = searchParams.get("count") || 5;
  const search = searchParams.get("search") || "";
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({});
  const [multiDelete, setMultiDelete] = useState([]);
  const HeaderNavigation = [
    {
      name: "All Reviews",
      link: "/ecommerce/reviews",
      icon: <FaRectangleList />,
    },
  ];

  const fetchData = async () => {
    const response = await basicProvider.getMethod(
      `ecommerce/reviews?page=${page}&count=${count}&search=${search}`
    );
    setData(response.data.data);
    setPagination(response.data);
  };

  const handleMultiDelete = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setMultiDelete((pre) => [...pre, value]);
    } else {
      setMultiDelete((pre) => pre.filter((id) => id !== value));
    }
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      fetchData();
    }, 500);

    return () => clearTimeout(handler);
  }, [page, count, searchParams]);
  return (
    <div>
      <SubHeader
        HeaderNavigation={HeaderNavigation}
        fetchData={fetchData}
        addButton={false}
      />

      <div>
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
                  endpoint={"ecommerce/reviews"}
                  type={"multi-delete"}
                  multiDelete={multiDelete}
                  refresh={fetchData}
                  title={"multi Delete"}
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
                        <TableCell>Customer</TableCell>
                        <TableCell align="center">Rating</TableCell>
                        <TableCell align="center">message</TableCell>
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
                              name={row?.customer?.name}
                              value={row._id}
                              color="primary"
                              checked={multiDelete.includes(row._id)}
                              onChange={handleMultiDelete}
                            />
                          </TableCell>
                          <TableCell>
                            <div className="flex w-full items-center gap-1">
                              <img
                                src="/no-photos.png"
                                alt=""
                                className="w-10 h-10 rounded-full"
                              />
                              <div>
                                <div>{row?.customer?.name}</div>
                                <div>{row?.customer?.email}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell align="center">
                            <span className="flex justify-center items-center gap-1">
                              {Array.from({ length: row.rating }).map(
                                (_, i) => (
                                  <FaStar key={i} className="text-yellow-500" />
                                )
                              )}
                              {/* <FaRegStar /> */}
                            </span>
                          </TableCell>

                          <TableCell align="center">
                            <button
                              style={{
                                backgroundColor: "#0BC1DF",
                                color: "white",
                                borderRadius: "8px",
                                cursor: "pointer",
                                padding: "0.4rem",
                              }}
                              onClick={() => {
                                Swal.fire({
                                  text: row?.message,
                                });
                              }}
                            >
                              View message
                            </button>
                          </TableCell>

                          <TableCell align="center">
                            {createdAt(row?.createdAt)}
                          </TableCell>
                          <TableCell align="center">
                            <div className="flex items-center text-2xl">
                              <DeleteSweetalert
                                endpoint={"ecommerce/reviews"}
                                type={"delete"}
                                deleteID={row?._id}
                                refresh={fetchData}
                                title={"Trash"}
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
  );
}

export default Reviews;
