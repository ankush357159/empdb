import axios from "axios";
import {
  CREATE_EMPLOYEE_FAIL,
  CREATE_EMPLOYEE_REQUEST,
  CREATE_EMPLOYEE_SUCCESS,
  DELETE_EMPLOYEE_FAIL,
  DELETE_EMPLOYEE_REQUEST,
  DELETE_EMPLOYEE_SUCCESS,
  EMPLOYEES_DETAILS_FAIL,
  EMPLOYEES_DETAILS_REQUEST,
  EMPLOYEES_DETAILS_SUCCESS,
  EMPLOYEE_UPDATE_FAIL,
  EMPLOYEE_UPDATE_REQUEST,
  EMPLOYEE_UPDATE_SUCCESS,
  LIST_EMPLOYEES_FAIL,
  LIST_EMPLOYEES_REQUEST,
  LIST_EMPLOYEES_SUCCESS,
} from "../constants/employeeConstants";

const { REACT_APP_LINK } = process.env;

//Get list of All employees
export const listAllEmployees = () => async (dispatch) => {
  try {
    dispatch({ type: LIST_EMPLOYEES_REQUEST });
    const link = `${REACT_APP_LINK}/employee/list/`;
    const { data } = await axios.get(link);

    dispatch({
      type: LIST_EMPLOYEES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LIST_EMPLOYEES_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

// Get Employee details
export const employeeDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: EMPLOYEES_DETAILS_REQUEST });

    const link = `${REACT_APP_LINK}/employee/details/${id}/`;

    const { data } = await axios.get(link);

    dispatch({
      type: EMPLOYEES_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: EMPLOYEES_DETAILS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

//Update Employee Details
export const updateEmployee =
  ({ id, first_name, last_name, email, department, address }) =>
  async (dispatch) => {
    const employeeData = {
      first_name,
      last_name,
      email,
      department,
      address,
    };

    try {
      dispatch({ type: EMPLOYEE_UPDATE_REQUEST });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const link = `${REACT_APP_LINK}/employee/update/${id}/`;

      const { data } = await axios.put(link, employeeData, config);

      dispatch({
        type: EMPLOYEE_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: EMPLOYEE_UPDATE_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

// Create New Employee
export const createEmployee = (employeeData) => async (dispatch) => {
  try {
    dispatch({
      type: CREATE_EMPLOYEE_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `${REACT_APP_LINK}/employee/create/`,
      employeeData,
      config
    );

    // If POST request is successful, payload will be sent to reducer
    dispatch({
      type: CREATE_EMPLOYEE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_EMPLOYEE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

//Delete Employee
export const deleteEmployee = (id) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_EMPLOYEE_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    //Making API call to delete product
    await axios.delete(`${REACT_APP_LINK}/employee/delete/${id}/`, config);
    dispatch({
      type: DELETE_EMPLOYEE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: DELETE_EMPLOYEE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
