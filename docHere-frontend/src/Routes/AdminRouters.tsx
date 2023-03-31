import { Route, Routes } from "react-router-dom";
import DoctorListAdmin from "../Pages/Admin/DoctorListAdmin";
import HomeAdmin from "../Pages/Admin/HomeAdmin";
import LoginAdmin from "../Pages/Admin/LoginAdmin";
import NotificationsAdmin from "../Pages/Admin/NotificationsAdmin";
import VerifyDoctorAdmin from "../Pages/Admin/VerifyDoctorAdmin";

function AdminRoutes() {
  return (
    <Routes>
      <Route path="/admin-login" element={<LoginAdmin />} />
      <Route
        index
        element={
          //<ProtectedRoutes jwtTokenName={'jwtUser'}>;
          <HomeAdmin />
          //</ProtectedRoutes>
        }
      />
      <Route path="/admin-notifications" element={<NotificationsAdmin />} />
      <Route path="/verify-doctor/:doctorId" element={<VerifyDoctorAdmin />} />
      <Route path="doctor-list" element={<DoctorListAdmin/>}/>
    </Routes>
  );
}

export default AdminRoutes;
