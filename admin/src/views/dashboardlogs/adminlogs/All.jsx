import { useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TablePagination from "@mui/material/TablePagination";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import BasicProvider from "../../../authentications/BasicProvider";
import NoRecords from "../../../components/NoRecords";
import toast from 'react-hot-toast'

function All() {
  const basicProvider = BasicProvider()
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;
  const count = searchParams.get("count") || 5;
  const [data, setData] = useState([])
  const [pagination, setPagination] = useState({});

  const fetchData = async () => {
    const response = await basicProvider.getMethod(`dashboardlogs/admin/logs?page=${page}&count=${count}`);
    setData(response.data.data);
    setPagination(response.data)
  }

  const handelMultiDelete = async () => {
    const ids = data.map((ids) => ids._id)
    if (ids.length > 0) {
      const response = await basicProvider.postMethod(`dashboardlogs/admin/logs/multi-delete`, JSON.stringify(ids));
      if (response.status === "success") {
        toast.success(response.message)
        fetchData()
      }
    }
  }

  useEffect(() => {
    fetchData()
  }, [page, count])

  return (
    <div>
      <div >
        {data?.length === 0 ? (
          <>
            <NoRecords />
          </>
        ) : (
          <>
            <div className="clearlogs cp">
              <button className="submit" onClick={handelMultiDelete}>Clear Logs</button>
            </div>
            <div className="itemTable">
              <Box sx={{ width: "100%" }}>
                <Paper sx={{ width: "100%", mb: 2 }}>
                  <TableContainer>
                    <Table sx={{ minWidth: 750 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Browser</TableCell>
                          <TableCell align="center">Browser Version</TableCell>
                          <TableCell align="center">Description</TableCell>
                          <TableCell align="center">Ip Address</TableCell>
                          <TableCell align="center">OS</TableCell>
                          <TableCell align="center">Platform</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {data?.map((row) => (
                          <TableRow
                            key={row._id}
                            hover
                            sx={{ cursor: "pointer" }}
                          >
                            <TableCell align="center">{row.browser}</TableCell>
                            <TableCell align="center">{row.browser_version}</TableCell>
                            <TableCell align="center">{row.description}</TableCell>

                            <TableCell align="center">
                              {row.ip_address}
                            </TableCell>
                            <TableCell align="center">
                              {row.os}
                            </TableCell>
                            <TableCell align="center">
                              {row.platform}
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
          </>
        )}
      </div>
    </div>
  )
}

export default All
