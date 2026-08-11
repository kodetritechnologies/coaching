import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

function ProtectedPageRoutes({ children }) {
  const { admin, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!loading && !admin) {
      navigate("/login");
    }
  }, [admin, loading, navigate]);
  return <div>{children}</div>;
}

export default ProtectedPageRoutes;
