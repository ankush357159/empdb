import ListEmployees from "./components/ListEmployees";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import EmployeeDetails from "./components/EmployeeDetails";
import UpdateEmployee from "./components/UpdateEmployee";
import CreateEmployee from "./components/CreateEmployee";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<ListEmployees />} />
        <Route path='/details/employee/:id' element={<EmployeeDetails />} />
        <Route path='/update/employee/:id' element={<UpdateEmployee />} />
        <Route path='/employee/create/' element={<CreateEmployee />} />
      </Routes>
    </Router>
  );
}

export default App;
