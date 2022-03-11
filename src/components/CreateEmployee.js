import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createEmployee } from "../actions/employeeActions";
import { CREATE_EMPLOYEE_RESET } from "../constants/employeeConstants";
import Loader from "./Loader/Loader";

const CreateEmployee = () => {
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector(
    (state) => state.createEmployee
  );
  const navigate = useNavigate();

  const [first_name, setFirst_Name] = useState("");
  const [last_name, setLast_Name] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (success) {
      dispatch({ type: CREATE_EMPLOYEE_RESET });
      navigate(`/`);
    }
  }, [dispatch, navigate, success]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(
      createEmployee({
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
      {loading ? (
        <Loader />
      ) : (
        <Box sx={{ maxWidth: "60%", ml: "20%" }}>
          <Typography
            sx={{ fontSize: 24, fontWeight: 600, mt: 2, textAlign: "center" }}
          >
            Create Employee Record
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", mt: 1 }}>
            <TextField
              label='First Name'
              variant='outlined'
              required
              value={first_name}
              onChange={(e) => setFirst_Name(e.target.value)}
              sx={{ m: 2 }}
            />

            <TextField
              label='Last Name'
              variant='outlined'
              required
              value={last_name}
              onChange={(e) => setLast_Name(e.target.value)}
              sx={{ m: 2 }}
            />

            <TextField
              label='Email'
              variant='outlined'
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ m: 2 }}
            />
            <TextField
              label='Department'
              variant='outlined'
              required
              value={department}
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
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              sx={{ m: 2 }}
            />
          </Box>
        </Box>
      )}
      <Button
        variant='contained'
        sx={{ alignItems: "center", ml: "42%" }}
        onClick={handleSubmit}
      >
        Create Employee
      </Button>
      <Box>{loading && <Loader />}</Box>
      <Box>
        {error && <Typography sx={{ color: "red" }}>{error}</Typography>}
      </Box>
    </Box>
  );
};

export default CreateEmployee;
