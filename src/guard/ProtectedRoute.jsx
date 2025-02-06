import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ role, children }) => {
    const { isAuthenticated, role: userRole } = useSelector((state) => state.auth);

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // Convert userRole to a string
    const currentRole = Array.isArray(userRole) ? userRole[0] : userRole;

    if (role && currentRole !== role) {
        return <Navigate to={`/${currentRole}/dashboard`} replace />;
    }

    return children;
};
export default ProtectedRoute; // ✅ Ensure default export
