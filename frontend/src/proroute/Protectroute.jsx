import { Navigate } from "react-router-dom";

function Protectroute({ children }) {

  const user = localStorage.getItem("user");

  if (!user) {
    return <Navigate to="/Login" />;
  }

  return children;
}

export default Protectroute;