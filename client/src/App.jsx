import { BrowserRouter, Routes, Route } from "react-router-dom";

import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import Error from "./pages/Error";
import { useLogin } from "./context/LoginContext";
import AddService from "./pages/AddService";
import EditUser from "./pages/EditUser";
import MakeAppointment from "./pages/MakeAppointment";
import AppointmentList from "./pages/AppointmentList";

function App() {
  const { isAdmin } = useLogin();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/edit" element={<EditUser />} />
        <Route path="/appointment" element={<MakeAppointment />} />
        <Route path="/my-appointments" element={<AppointmentList />} />
        <Route path="/add-service" element={<AddService />} />
        {isAdmin && <Route path="/dashboard" element={<Dashboard />} />}
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
