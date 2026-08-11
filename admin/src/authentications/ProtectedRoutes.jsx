import { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function ProtectedRoutes({ children }) {
  const { admin, loading } = useContext(AuthContext);

  const navigate = useNavigate();
  useEffect(() => {
    if (!loading && admin) {
      navigate("/");
    }
  }, [admin, loading, navigate]);
  return <div>{children}</div>;
}

export default ProtectedRoutes;
