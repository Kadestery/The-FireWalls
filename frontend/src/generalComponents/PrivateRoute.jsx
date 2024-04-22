import { Navigate } from "react-router-dom";


// To delete? eslint-disable-next-line react/prop-types
export default function PrivateRoute({ children }) {
  return localStorage.getItem("email") ? children : <Navigate to="/login" />;
}
