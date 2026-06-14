import { Navigate } from "react-router-dom";
import AccessDenied from "../components/AccessDenied";

function AdminRoute({ children }) {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  if (!user) {
    return <Navigate to="/Login" />;
  }

  if (user.role !== "admin") {
  return <AccessDenied />;
 }

  return children;
}

export default AdminRoute;