import ProductCountsGrid from "../../../components/ProductCountsGrid.jsx";
import SubHeader from "../../../components/SubHeader.jsx";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import TablePagination from "@mui/material/TablePagination";
import { MdCreate } from "react-icons/md";
import { useEffect, useState } from "react";
import BasicProvider from "../../../authentications/BasicProvider.js";
import { NavLink, useSearchParams } from "react-router-dom";
import NoRecords from "../../../components/NoRecords.jsx";
import DeleteSweetalert from "../../../components/DeleteSweetalert.jsx";
import { createdAt } from "../../../helpers/dateHelper.js";
import { FaRectangleList } from "react-icons/fa6";
import { IoCreate } from "react-icons/io5";
import { FaTrashAlt } from "react-icons/fa";

export default function All() {
  const basicProvider = BasicProvider();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;
  const count = searchParams.get("count") || 5;
  const search = searchParams.get("search") || "";
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({});
  const [multiDelete, setMultiDelete] = useState([]);
  const [counts, setCounts] = useState(null);

  const HeaderNavigation = [
    {
      name: "All Items",
      link: "/ecommerce/item/all",
      icon: <FaRectangleList />,
    },
    {
      name: "Create Items",
      link: "/ecommerce/item/create",
      icon: <IoCreate />,
    },
    {
      name: "Trash Items",
      link: "/ecommerce/item/trash",
      icon: <FaTrashAlt />,
    },
  ];

  const fetchData = async () => {
    const response = await basicProvider.getMethod(
      `ecommerce/item?page=${page}&count=${count}&search=${search}`
    );
    setData(response.data.data);
    setPagination(response.data);
  };

  const fetchCounts = async () => {
    const response = await basicProvider.getMethod(`ecommerce/item/counts`);
    setCounts(response?.data);
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
    fetchCounts();
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      fetchData();
    }, 500);

    return () => clearTimeout(handler);
  }, [page, count, searchParams]);
  return (
    <div>
      <SubHeader HeaderNavigation={HeaderNavigation} fetchData={fetchData} />
      <ProductCountsGrid data={counts} />
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
                  endpoint={"ecommerce/item"}
                  type={"multi-trash"}
                  multiDelete={multiDelete}
                  refresh={fetchData}
                  title={"multi trash"}
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
                        <TableCell align="center">Type</TableCell>
                        <TableCell align="center">Price</TableCell>
                        <TableCell align="center">Quantity</TableCell>
                        <TableCell align="center">Created At</TableCell>
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
                              name={row.name}
                              value={row._id}
                              color="primary"
                              checked={multiDelete.includes(row._id)}
                              onChange={handleMultiDelete}
                            />
                          </TableCell>
                          <TableCell align="center">
                            <div className="flex items-center">
                              <img
                                src="/no-photos.png"
                                alt="not-found"
                                style={{ width: "2.5rem" }}
                              />
                              <div>{row.name}</div>{" "}
                            </div>
                          </TableCell>
                          <TableCell align="center">{row.type}</TableCell>
                          <TableCell align="center">{row.price}</TableCell>
                          <TableCell align="center">{row.quantity}</TableCell>

                          <TableCell align="center">
                            {createdAt(row.createdAt)}
                          </TableCell>
                          <TableCell align="center">
                            <div className="flex items-center gap-1 text-2xl">
                              <NavLink to={`/ecommerce/item/${row._id}/edit`}>
                                <MdCreate className="text-blue-500" />
                              </NavLink>
                              <DeleteSweetalert
                                endpoint={"ecommerce/item"}
                                type={"trash"}
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
