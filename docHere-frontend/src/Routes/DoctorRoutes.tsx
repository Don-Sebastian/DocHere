import { Route, Routes } from "react-router-dom";
import RegisterDoctor from "../Pages/Doctor/RegisterDoctor";
import HomeDoctor from "../Pages/Doctor/HomeDoctor";
import LoginDoctor from "../Pages/Doctor/LoginDoctor";
import ProfileDoc from "../Pages/Doctor/ProfileDoc";

function DoctorRoutes() {
    return (
        <Routes>
            <Route index element={ <HomeDoctor/>} />
            <Route path='/doctor-register' element={<RegisterDoctor/>}/>
            <Route path='/doctor-login' element={<LoginDoctor />} />
            
            <Route path="/profile-doctor" element={ <ProfileDoc/>} />
        </Routes>
    )
}

export default DoctorRoutes;