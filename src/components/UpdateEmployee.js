import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { employeeDetails, updateEmployee } from "../actions/employeeActions";
import { EMPLOYEE_UPDATE_RESET } from "../constants/employeeConstants";
import Loader from "./Loader/Loader";

const UpdateEmployee = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    loading,
    success: successUpdate,
    error,
  } = useSelector((state) => state.employeeUpdate);
  const {
    employee,
    loading: employeeLoading,
    error: employeeError,
  } = useSelector((state) => state.employeeDetails);
  // console.log(employee);

  const [first_name, setFirst_Name] = useState("");
  const [last_name, setLast_Name] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: EMPLOYEE_UPDATE_RESET });
      navigate(`/`);
    }
    if (employee) {
      setFirst_Name(employee.first_name);
      setLast_Name(employee.last_name);
      setEmail(employee.email);
      setDepartment(employee.department);
      setAddress(employee.address);
    }
    dispatch(employeeDetails(id));
  }, [dispatch, id, navigate, successUpdate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(
      updateEmployee({
        id,
        first_name,
        last_name,
        email,
        address,
        department,
      })
    );
  };

  return (
    <Box>
      {employeeError && (
        <Typography sx={{ color: "red" }}>{employeeError}</Typography>
      )}
      {employeeLoading ? (
        <Loader />
      ) : (
        <Box sx={{ maxWidth: "60%", ml: "20%" }}>
          <Typography
            sx={{ fontSize: 24, fontWeight: 600, mt: 2, textAlign: "center" }}
          >
            Update Employee Record
          </Typography>
          {employee && (
            <Box sx={{ display: "flex", flexDirection: "column", mt: 1 }}>
              <TextField
                label='First Name'
                variant='outlined'
                required
                defaultValue={employee.first_name ? employee.first_name : ""}
                onChange={(e) => setFirst_Name(e.target.value)}
                sx={{ m: 2 }}
              />

              <TextField
                label='Last Name'
                variant='outlined'
                required
                defaultValue={employee.last_name ? employee.last_name : ""}
                onChange={(e) => setLast_Name(e.target.value)}
                sx={{ m: 2 }}
              />

              <TextField
                label='Email'
                variant='outlined'
                required
                defaultValue={employee.email ? employee.email : ""}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ m: 2 }}
              />
              <TextField
                label='Department'
                variant='outlined'
                required
                defaultValue={employee.department ? employee.department : ""}
                onChange={(e) => setDepartment(e.target.value)}
                sx={{ m: 2 }}
              />
              <TextField
                label='Address'
                variant='outlined'
                required
                multiline
                minRows={2}
                maxRows={5}
                defaultValue={employee.address ? employee.address : ""}
                onChange={(e) => setAddress(e.target.value)}
                sx={{ m: 2 }}
              />
            </Box>
          )}
        </Box>
      )}
      <Button
        variant='contained'
        sx={{ alignItems: "center", ml: "42%" }}
        onClick={handleSubmit}
      >
        Update Employee
      </Button>
      <Box>{loading && <Loader />}</Box>
      <Box>
        {error && <Typography sx={{ color: "red" }}>{error}</Typography>}
      </Box>
    </Box>
  );
};

export default UpdateEmployee;
