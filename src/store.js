import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  employeeCreateReducer,
  employeeDeleteReducer,
  employeeDetailsReducer,
  employeeUpdateReducer,
  listEmployeesReducer,
} from "./reducers/employeeReducers";

const reducer = combineReducers({
  listEmployees: listEmployeesReducer,
  employeeDetails: employeeDetailsReducer,
  employeeUpdate: employeeUpdateReducer,
  createEmployee: employeeCreateReducer,
  deleteEmployee: employeeDeleteReducer,
});

const initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
