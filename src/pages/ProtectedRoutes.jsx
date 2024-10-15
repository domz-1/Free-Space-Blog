import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({children}) => {
  // const authentication = auth.currentUser;
  const authentication = localStorage.getItem('userLoggedIn');

  if (!authentication) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
