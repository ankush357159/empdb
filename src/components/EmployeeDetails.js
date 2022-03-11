import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteEmployee, employeeDetails } from "../actions/employeeActions";
import { useNavigate, useParams } from "react-router-dom";
import { Box } from "@mui/system";
import { Button, Paper, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Loader from "./Loader/Loader";
import { DELETE_EMPLOYEE_RESET } from "../constants/employeeConstants";

const MyComponent = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-start",
}));

const EmployeeDetails = () => {
  const dispatch = useDispatch();

  const { employee, loading, error } = useSelector(
    (state) => state.employeeDetails
  );
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = useSelector((state) => state.deleteEmployee);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (successDelete) {
      dispatch({type:DELETE_EMPLOYEE_RESET})
      navigate("/");
    }
    dispatch(employeeDetails(id));
  }, [dispatch, id, successDelete, navigate]);
  // console.log(employee);

  const deleteEmployeeHandler = (id) => {
    if (
      window.confirm("Are you sure you want to delete this employee record?")
    ) {
      dispatch(deleteEmployee(id));
    }
  };

  const updateEmployeeHandler = (id) => {
    navigate(`/update/employee/${id}`);
  };

  return (
    <Box sx={{ pl: 10 }}>
      <Typography sx={{ fontSize: 24, fontWeight: 600, mt: 5 }}>
        Record of the Employee
      </Typography>
      {loading ? (
        <Loader />
      ) : (
        employee && (
          <Box>
            <Paper elevation={3} sx={{ width: "80%", pl: 5, pt: 4, pb: 4 }}>
              <MyComponent>
                <Typography sx={{ color: "darkblue", fontWeight: 600 }}>
                  Employee Id&nbsp;
                </Typography>
                <Typography>:&nbsp;{employee.employee_id}</Typography>
              </MyComponent>
              <MyComponent>
                <Typography sx={{ color: "darkblue", fontWeight: 600 }}>
                  First Name &nbsp;
                </Typography>
                <Typography sx={{ pl: 0.5 }}>
                  :&nbsp;{employee.first_name}
                </Typography>
              </MyComponent>
              <MyComponent>
                <Typography sx={{ color: "darkblue", fontWeight: 600 }}>
                  Last Name &nbsp;
                </Typography>
                <Typography sx={{ pl: 0.8 }}>
                  :&nbsp;{employee.last_name}
                </Typography>
              </MyComponent>
              <MyComponent>
                <Typography sx={{ color: "darkblue", fontWeight: 600 }}>
                  {" "}
                  Email&nbsp;
                </Typography>
                <Typography sx={{ pl: 6 }}>:&nbsp;{employee.email}</Typography>
              </MyComponent>

              <MyComponent>
                <Typography sx={{ color: "darkblue", fontWeight: 600 }}>
                  Department&nbsp;
                </Typography>
                <Typography sx={{ pl: 0.2 }}>
                  :&nbsp;{employee.department}
                </Typography>
              </MyComponent>

              <MyComponent>
                <Typography sx={{ color: "darkblue", fontWeight: 600 }}>
                  Address&nbsp;
                </Typography>
                <Typography sx={{ pl: 3.5 }}>
                  :&nbsp;{employee.address}
                </Typography>
              </MyComponent>
            </Paper>

            <Button
              sx={{ pt: 2, pl: 3, color: "#096918" }}
              onClick={() => updateEmployeeHandler(id)}
            >
              Update employee
            </Button>
            <Button
              sx={{ pt: 2, color: "red" }}
              onClick={() => deleteEmployeeHandler(employee.id)}
            >
              Delete employee
            </Button>
          </Box>
        )
      )}
      {error && <Typography sx={{ color: "red" }}>{error}</Typography>}
      {loadingDelete && <Loader />}
      {errorDelete && <Typography sx={{ color: "red" }}>{error}</Typography>}
    </Box>
  );
};

export default EmployeeDetails;
