import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthProvider';

const PrivateRoute = () => {
  const { token } = useAuth(); // Asegúrate de que `useAuth` retorne el objeto correcto

  return token ? <Outlet /> : <Navigate to="/signin" />;
};

export default PrivateRoute;