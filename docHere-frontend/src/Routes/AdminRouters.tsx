import { Route, Routes } from "react-router-dom";
import HomeAdmin from "../Pages/Admin/HomeAdmin";
import LoginAdmin from "../Pages/Admin/LoginAdmin";

function AdminRoutes() {
  return (
    <Routes>
      <Route
        index
        element={
          //<ProtectedRoutes jwtTokenName={'jwtUser'}>;
          <HomeAdmin />
          //</ProtectedRoutes>
        }
      />
      <Route path="/admin-login" element={<LoginAdmin />} />
    </Routes>
  );
}

export default AdminRoutes;
