import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ children, requiredRole }) => {
    const { isAuthenticated, user, loading } = useAuth();

    // Show loading state while checking authentication
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
            </div>
        );
    }

    // Redirect to login if not authenticated
    if (!isAuthenticated()) {
        return <Navigate to="/login" replace />;
    }

    // Check role if required
    if (requiredRole && user.role !== requiredRole) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;
