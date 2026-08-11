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
import { useParams, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import BasicProvider from "../../../authentications/BasicProvider";
import NoRecords from "../../../components/NoRecords";
import DeleteSweetalert from "../../../components/DeleteSweetalert";
import { createdAt } from "../../../helpers/dateHelper";
import { NavLink } from "react-router-dom";
import { MdCreate } from "react-icons/md";

function Coupon() {
  const basicProvider = BasicProvider();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;
  const count = searchParams.get("count") || 5;
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({});
  const [multiDelete, setMultiDelete] = useState([]);

  const fetchData = async () => {
    const response = await basicProvider.getMethod(
      `ecommerce/coupan/${id}?page=${page}&count=${count}`
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
      <div>
        {data?.length === 0 ? (
          <div className="cp">
            <NoRecords />
          </div>
        ) : (
          <div className="itemTable">
            {multiDelete && multiDelete?.length > 0 && (
              <div className="w-full cp flex items-center justify-between text-2xl">
                <div style={{ fontSize: "16px" }}>
                  {multiDelete?.length} selecte to Delete
                </div>
                <DeleteSweetalert
                  endpoint={"ecommerce/coupan"}
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
                        <TableCell>Name</TableCell>
                        <TableCell align="center">Code</TableCell>
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
                              name={row.coupanId.name}
                              value={row._id}
                              color="primary"
                              checked={multiDelete.includes(row._id)}
                              onChange={handleMultiDelete}
                            />
                          </TableCell>
                          <TableCell align="center">
                            {row.coupanId.name}
                          </TableCell>
                          <TableCell align="center">
                            {row.coupanId.code}
                          </TableCell>

                          <TableCell align="center">
                            {createdAt(row.createdAt)}
                          </TableCell>
                          <TableCell align="center">
                            <div className="flex items-center gap-1 text-2xl">
                              <NavLink
                                to={`/ecommerce/coupan/${row.coupanId._id}/edit`}
                              >
                                <MdCreate className="text-blue-500" />
                              </NavLink>
                              <DeleteSweetalert
                                endpoint={"ecommerce/coupan"}
                                type={"delete"}
                                deleteID={row?._id}
                                refresh={fetchData}
                                title={"Delete"}
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

export default Coupon;
