import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RegisterUser from './Pages/User/RegisterUser';
import {Toaster} from 'react-hot-toast'
import HomeUser from './Pages/User/HomeUser';
import LoginUser from './Pages/User/LoginUser';
import { useSelector } from 'react-redux';
import { RootState } from './Redux/Store';
import Loader from './Components/Loader';
import ProtectedRoutes from './Components/ProtectedRoutes';
import UserRoutes from './Routes/UserRoutes';
import DoctorRoutes from './Routes/DoctorRoutes';

function App() {

  const { loading } = useSelector((state: RootState) => state.alert);

  return (
    // <RegisterUser />
    <BrowserRouter>
      {loading && <Loader />}
      <Toaster position="top-center" reverseOrder={true} />

      <Routes>
        <Route path='/*' element={<UserRoutes />} />
        <Route path='/doctor/*' element={<DoctorRoutes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
