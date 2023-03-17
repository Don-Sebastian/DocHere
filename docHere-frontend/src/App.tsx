import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RegisterUser from './Pages/User/RegisterUser';
import {Toaster} from 'react-hot-toast'
import HomeUser from './Pages/User/HomeUser';
import LoginUser from './Pages/User/LoginUser';

function App() {

  return (
    // <RegisterUser />
    <BrowserRouter>
      <Toaster position="top-center" reverseOrder={true} />

      <Routes>
        <Route path="/" element={<HomeUser/>} />
        <Route path="/register" element={<RegisterUser />} />
        <Route path='/login' element={<LoginUser/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App
