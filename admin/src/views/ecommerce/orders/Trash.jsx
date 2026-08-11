import SubHeader from "../../../components/SubHeader";
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
import { MdCreate, MdDelete } from "react-icons/md";
import DeleteModal from "../../../components/DeleteModal";
import { useState } from "react";

const rows = [
  {
    id: 1,
    name: "Cupcake",
    calories: 305,
    fat: 3.7,
    carbs: 67,
    protein: 4.3,
    mrp: "100",
    created: "15-Aug-2025",
  },
  {
    id: 2,
    name: "Donut",
    calories: 452,
    fat: 25.0,
    carbs: 51,
    protein: 4.9,
    mrp: "100",
    created: "15-Aug-2025",
  },
];

export default function Trash() {
  const [show, setShow] = useState(false);

  return (
    <div>
      <SubHeader />
      <div className="itemTable">
        <Box sx={{ width: "100%" }}>
          <Paper sx={{ width: "100%", mb: 2 }}>
            <TableContainer>
              <Table sx={{ minWidth: 750 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox">
                      <Checkbox color="primary" />
                    </TableCell>
                    <TableCell>Products</TableCell>
                    <TableCell align="center">Categories</TableCell>
                    <TableCell align="center">Price</TableCell>
                    <TableCell align="center">Rating</TableCell>
                    <TableCell align="center">Availability</TableCell>
                    <TableCell align="center">MRP - Discounted Price</TableCell>
                    <TableCell align="center">Created</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.id} hover sx={{ cursor: "pointer" }}>
                      <TableCell padding="checkbox">
                        <Checkbox color="primary" />
                      </TableCell>
                      <TableCell>
                        <div className="flex w-full items-center gap-1">
                          <img
                            src="https://plus.unsplash.com/premium_photo-1664392147011-2a720f214e01?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D"
                            alt=""
                            className="w-10 h-10 rounded-full"
                          />
                          <span>{row.name}</span>
                        </div>
                      </TableCell>
                      <TableCell align="center">{row.calories}</TableCell>
                      <TableCell align="center">{row.fat}</TableCell>
                      <TableCell align="center">{row.carbs}</TableCell>
                      <TableCell align="center">{row.protein}</TableCell>
                      <TableCell align="center">{row.mrp}</TableCell>
                      <TableCell align="center">{row.created}</TableCell>
                      <TableCell align="center">
                        <div className="flex items-center gap-1 text-2xl">
                          <MdCreate className="text-blue-500" />
                          <MdDelete
                            className="text-red-600"
                            onClick={() => setShow(true)}
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={rows.length}
              rowsPerPage={5}
              page={0}
              onPageChange={() => {}}
              onRowsPerPageChange={() => {}}
            />
          </Paper>
        </Box>
      </div>
      <DeleteModal show={show} setShow={setShow} />
    </div>
  );
}
