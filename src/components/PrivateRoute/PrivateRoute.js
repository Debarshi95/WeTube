import { useAuthContext } from 'providers';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const { user = null } = useAuthContext();
  const location = useLocation();
  console.log({ user });
  if (!user) {
    return <Navigate to="/signin" state={{ location }} />;
  }
  return children;
};

export default PrivateRoute;
