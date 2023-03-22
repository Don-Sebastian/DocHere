import { Route, Routes } from "react-router-dom";
import HomeUser from "../Pages/User/HomeUser";
import LoginUser from "../Pages/User/LoginUser";
import RegisterUser from "../Pages/User/RegisterUser";


function UserRoutes(){
    return (
      <Routes>
        <Route index element={
            //<ProtectedRoutes jwtTokenName={'jwtUser'}>;
            <HomeUser />
            //</ProtectedRoutes>
          }/>
        <Route path="/register" element={<RegisterUser />} />
        <Route path="/login" element={<LoginUser />} />
      </Routes>
    );
        
}

export default UserRoutes;