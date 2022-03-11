import {
  CREATE_EMPLOYEE_FAIL,
  CREATE_EMPLOYEE_REQUEST,
  CREATE_EMPLOYEE_RESET,
  CREATE_EMPLOYEE_SUCCESS,
  DELETE_EMPLOYEE_FAIL,
  DELETE_EMPLOYEE_REQUEST,
  DELETE_EMPLOYEE_RESET,
  DELETE_EMPLOYEE_SUCCESS,
  EMPLOYEES_DETAILS_FAIL,
  EMPLOYEES_DETAILS_REQUEST,
  EMPLOYEES_DETAILS_SUCCESS,
  EMPLOYEE_UPDATE_FAIL,
  EMPLOYEE_UPDATE_REQUEST,
  EMPLOYEE_UPDATE_RESET,
  EMPLOYEE_UPDATE_SUCCESS,
  LIST_EMPLOYEES_FAIL,
  LIST_EMPLOYEES_REQUEST,
  LIST_EMPLOYEES_SUCCESS,
} from "../constants/employeeConstants";

//Reducer - Get list of All employees
export const listEmployeesReducer = (state = { employees: [] }, action) => {
  switch (action.type) {
    case LIST_EMPLOYEES_REQUEST:
      return {
        loading: true,
        employees: [],
      };
    case LIST_EMPLOYEES_SUCCESS:
      return {
        loading: false,
        employees: action.payload,
      };
    case LIST_EMPLOYEES_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

// Reducer - Get Employee details
export const employeeDetailsReducer = (state = { employees: {} }, action) => {
  switch (action.type) {
    case EMPLOYEES_DETAILS_REQUEST:
      return {
        loading: true,
        employee: [],
      };
    case EMPLOYEES_DETAILS_SUCCESS:
      return {
        loading: false,
        employee: action.payload,
      };
    case EMPLOYEES_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

//Update Employee
export const employeeUpdateReducer = (state = { employee: {} }, action) => {
  switch (action.type) {
    case EMPLOYEE_UPDATE_REQUEST:
      return {
        loading: true,
      };
    case EMPLOYEE_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
        employee: action.payload,
      };
    case EMPLOYEE_UPDATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case EMPLOYEE_UPDATE_RESET:
      return {
        employee: {},
      };
    default:
      return state;
  }
};

// Create Employee
export const employeeCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_EMPLOYEE_REQUEST:
      return {
        loading: true,
      };
    case CREATE_EMPLOYEE_SUCCESS:
      return {
        loading: false,
        success: true,
        employee: action.payload,
      };
    case CREATE_EMPLOYEE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CREATE_EMPLOYEE_RESET:
      return {};

    default:
      return state;
  }
};

// Delete Employee
export const employeeDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_EMPLOYEE_REQUEST:
      return {
        loading: true,
      };
    case DELETE_EMPLOYEE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case DELETE_EMPLOYEE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
      case DELETE_EMPLOYEE_RESET:
      return {
        loading: false,
        employee:{}

      }
    default:
      return state;
  }
};
