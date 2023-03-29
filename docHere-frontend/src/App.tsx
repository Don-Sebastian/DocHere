import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {Toaster} from 'react-hot-toast'
import { useSelector } from 'react-redux';
import { RootState } from './Redux/Store';
import Loader from './Components/Loader';
import UserRoutes from './Routes/UserRoutes';
import DoctorRoutes from './Routes/DoctorRoutes';
import AdminRoutes from './Routes/AdminRouters';

function App() {

  const { loading } = useSelector((state: RootState) => state.alert);

  return (
    // <RegisterUser />
    <BrowserRouter>
      {loading && <Loader />}
      <Toaster position="top-center" reverseOrder={true} />

      <Routes>
        <Route path="/*" element={<UserRoutes />} />
        <Route path="/doctor/*" element={<DoctorRoutes />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
