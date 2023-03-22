import { Route, Routes } from "react-router-dom";
import RegisterDoctor from "../Pages/Doctor/RegisterDoctor";

function DoctorRoutes() {
    return (
        <Routes>
            <Route path='/doctor-register' element={<RegisterDoctor/>}/>
            <Route path='/doctor-login'  />
        </Routes>
    )
}

export default DoctorRoutes;