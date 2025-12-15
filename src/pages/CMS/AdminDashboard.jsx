import { useNavigate } from "react-router-dom";
import AdminHome from "../AdminHome/AdminHome";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleGameSelect = (game) => {
    // Navigate to categories page for the selected game
    navigate(`/admin/categories/${game._id}`);
  };

  return <AdminHome onSelect={handleGameSelect} />;
};

export default AdminDashboard;
