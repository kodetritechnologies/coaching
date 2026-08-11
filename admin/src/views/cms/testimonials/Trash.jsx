import { useState } from "react";
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
import Checkbox from "@mui/material/Checkbox";
import TableBody from "@mui/material/TableBody";
import TablePagination from "@mui/material/TablePagination";
import BasicProvider from "../../../authentications/BasicProvider";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { FaRectangleList } from "react-icons/fa6";
import { IoCreate } from "react-icons/io5";
import { FaTrashAlt } from "react-icons/fa";

function Trash() {
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
      name: "All Testimonials",
      link: "/cms/testimonials/all",
      icon: <FaRectangleList />,
    },
    {
      name: "Create Testimonials",
      link: "/cms/testimonials/create",
      icon: <IoCreate />,
    },
    {
      name: "Trash Testimonials",
      link: "/cms/testimonials/trash",
      icon: <FaTrashAlt />,
    },
  ];

  const fetchData = async () => {
    const response = await basicProvider.getMethod(
      `cms/testimonial/trash?page=${page}&count=${count}&search=${search}`
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
      <SubHeader HeaderNavigation={HeaderNavigation} fetchData={fetchData} />

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
                  title={"multiple Delete"}
                  endpoint={"cms/testimonial"}
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
                        <TableCell>Name</TableCell>
                        <TableCell>Title</TableCell>
                        <TableCell align="center">Slug</TableCell>
                        <TableCell align="center">Publish Date</TableCell>
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
                              name={row.name}
                              value={row._id}
                              color="primary"
                              checked={multiDelete.includes(row._id)}
                              onChange={handleMultiDelete}
                            />
                          </TableCell>
                          <TableCell align="center">{row.name}</TableCell>
                          <TableCell align="center">{row.title}</TableCell>
                          <TableCell align="center">{row.slug}</TableCell>
                          <TableCell align="center">
                            {row.publish_date}
                          </TableCell>

                          <TableCell align="center">{row.createdAt}</TableCell>
                          <TableCell align="center">
                            <div className="flex items-center gap-1 text-2xl">
                              <DeleteSweetalert
                                endpoint={"cms/testimonial"}
                                type={"restore"}
                                deleteID={row?._id}
                                refresh={fetchData}
                                restore={true}
                                title={"Restore"}
                              />
                              <DeleteSweetalert
                                endpoint={"cms/testimonial"}
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
  );
}

export default Trash;
