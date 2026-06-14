import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Protectroute from "./proroute/Protectroute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Mycomplaints from "./pages/Mycomplaints";
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";
import AdminRoute from "./proroute/AdminRoute";

function App() {
  return (
    <div>

      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />

        <Route path="/Mycomplaints"  element={
            <Protectroute>
              <Mycomplaints />
            </Protectroute>}
        />

        <Route path="/Dashboard" element={
          <AdminRoute>
            <Dashboard />
          </AdminRoute>} 
         />

      </Routes>

    </div>
  );
}

export default App;
