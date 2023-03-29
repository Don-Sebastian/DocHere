import { Route, Routes } from "react-router-dom";
import RegisterDoctor from "../Pages/Doctor/RegisterDoctor";
import HomeDoctor from "../Pages/Doctor/HomeDoctor";
import LoginDoctor from "../Pages/Doctor/LoginDoctor";
import ProfileDoc from "../Pages/Doctor/ProfileDoc";
import LoggedInDoctor from "../Components/Doctor/LoggedInDoctor";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/Store";
import { LoadingTypeDoctor } from "../types/DoctorTypes";
import VerifiedDoctor from "../Components/Doctor/VerifedDoctor";

function DoctorRoutes() {

    const loggedIn = useSelector<RootState, boolean | undefined>((store) => store?.doctorDetail?.loggedIn);
    

    return (
      <Routes>
        <Route
          path="/doctor-register"
          element={
            <LoggedInDoctor>
              <RegisterDoctor />
            </LoggedInDoctor>
          }
        />
        <Route
          path="/doctor-login"
          element={
            <LoggedInDoctor>
              <LoginDoctor />
            </LoggedInDoctor>
          }
        />

        <Route
          path="/profile-doctor"
          element={
            <VerifiedDoctor>
              <ProfileDoc />
            </VerifiedDoctor>
          }
        />

        <Route index element={<HomeDoctor />} />
      </Routes>
    );
}

export default DoctorRoutes;