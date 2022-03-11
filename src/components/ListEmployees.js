import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { listAllEmployees } from "../actions/employeeActions";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Loader from "./Loader/Loader";
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";
import { Link, useNavigate } from "react-router-dom";
import InfoIcon from "@mui/icons-material/Info";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#5c5a55",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:nth-of-type(even)": {
    backgroundColor: "#f7f2e4",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const ListEmployees = () => {
  const dispatch = useDispatch();
  const { employees, loading, error } = useSelector(
    (state) => state.listEmployees
  );
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(listAllEmployees());
  }, [dispatch]);

  // console.log(employees);

  const createEmployeeHandler = () => {
    navigate(`/employee/create/`);

  }

  return (
    <Box position='relative' sx={{ pt: 2, mx: 2 }}>
      {loading ? (
        <Loader />
      ) : ( employees &&
        <Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              color:"#041047"
            }}
          >
            <Typography
              sx={{ fontSize: 24, fontWeight: 600, textAlign: "center", pb: 2 }}
            >
              Employees Database
            </Typography>
            <Button variant="contained" sx={{mb:2, color:"#FFF"}} onClick={createEmployeeHandler}>Create New Employee</Button>
          </Box>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <StyledTableCell>Sr.No.</StyledTableCell>
                  <StyledTableCell>First Name</StyledTableCell>
                  <StyledTableCell>Last Name</StyledTableCell>
                  <StyledTableCell>Email</StyledTableCell>
                  <StyledTableCell>Department</StyledTableCell>
                  <StyledTableCell>Address</StyledTableCell>
                  <StyledTableCell>Details</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {employees &&
                  employees.map((employee, index) => (
                    <StyledTableRow key={employee.id}>
                      <StyledTableCell>{index + 1}</StyledTableCell>
                      <StyledTableCell>{employee.first_name}</StyledTableCell>
                      <StyledTableCell>{employee.last_name}</StyledTableCell>
                      <StyledTableCell>{employee.email}</StyledTableCell>
                      <StyledTableCell>{employee.department}</StyledTableCell>
                      <StyledTableCell>{employee.address}</StyledTableCell>
                      <StyledTableCell>
                        <Link
                          to={`/details/employee/${employee.id}`}
                          style={{ textDecoration: "none", color: "inherit" }}
                        >
                          <InfoIcon
                            sx={{
                              fill: "rgba(15, 43, 166, 1)",
                              "&:hover": { fill: "rgba(18, 148, 26, 1)" },
                            }}
                          />
                        </Link>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          {error && <Typography sx={{ color: "red" }}>{error}</Typography>}
        </Box>
      )}
    </Box>
  );
};

export default ListEmployees;
