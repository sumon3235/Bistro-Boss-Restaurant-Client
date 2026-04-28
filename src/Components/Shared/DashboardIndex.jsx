import { Navigate } from "react-router";
import useAdmin from "../../hooks/useAdmin";

const DashboardIndex = () => {
  const [isAdmin, isAdminLoading] = useAdmin();

  if (isAdminLoading) return <Loading />;

  if (isAdmin) {
    return <Navigate to="/dashboard/adminHome" replace />;
  }
  return <Navigate to="/dashboard/userHome" replace />;
};

export default DashboardIndex;
