import { useState, useEffect } from "react";
import SubHeader from "../../../components/SubHeader";
import NoRecords from "../../../components/NoRecords";
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
import BasicProvider from "../../../authentications/BasicProvider";
import { NavLink, useSearchParams } from "react-router-dom";
import { MdCreate } from "react-icons/md";
import { IoCreate } from "react-icons/io5";
import { FaRectangleList } from "react-icons/fa6";
import { createdAt } from "../../../helpers/dateHelper";

function All() {
  const basicProvider = BasicProvider();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;
  const count = searchParams.get("count") || 5;
  const search = searchParams.get("search") || "";
  
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({});

  const HeaderNavigation = [
    {
      name: "All Navigation",
      link: "/cms/navigation/all",
      icon: <FaRectangleList />,
    },
    {
      name: "Create Navigation",
      link: "/cms/navigation/create",
      icon: <IoCreate />,
    },
  ];

  const fetchData = async () => {
    try {
      const response = await basicProvider.getMethod(`cms/navigation?page=${page}&count=${count}&search=${search}`);
      if (response.status === "success") {
        setData(response.data.data);
        setPagination(response.data);
      }
    } catch (error) {
      console.error(error);
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
      <SubHeader HeaderNavigation={HeaderNavigation} fetchData={fetchData} />

      <div>
        {data?.length === 0 ? (
          <NoRecords />
        ) : (
          <div className="itemTable">
            <Box sx={{ width: "100%" }}>
              <Paper sx={{ width: "100%", mb: 2 }}>
                <TableContainer>
                  <Table sx={{ minWidth: 750 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="center">Total Links (Root Level)</TableCell>
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
                          <TableCell>{row.name}</TableCell>
                          <TableCell align="center">{row.items?.length || 0}</TableCell>
                          <TableCell align="center">
                            {createdAt(row.createdAt)}
                          </TableCell>
                          <TableCell align="center">
                            <div className="flex items-center justify-center gap-2 text-2xl">
                              <NavLink to={`/cms/navigation/edit/${row._id}`}>
                                <MdCreate className="text-blue-500" />
                              </NavLink>
                              <DeleteSweetalert
                                endpoint={"cms/navigation"}
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
                  count={pagination?.totalData || 0}
                  rowsPerPage={pagination?.limit || 5}
                  page={pagination?.page ? pagination.page - 1 : 0}
                  onPageChange={(e, newPage) => {
                    setSearchParams(`?page=${newPage + 1}&count=${count}&search=${search}`);
                  }}
                  onRowsPerPageChange={(e) => {
                    setSearchParams(`?count=${e.target.value}&page=1&search=${search}`);
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

export default All;
