import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearDoctorDetails } from "../../Redux/Slices/DoctorDetailsSlice";
import { RootState } from "../../Redux/Store";
import { LoadingTypeDoctor } from "../../types/DoctorTypes";
import { useEffect } from 'react';
import { hideLoading, showLoading } from "../../Redux/Slices/alertsSlice";

const LoggedInDoctor = ({ children }: { children: React.ReactNode }) => {
    const navigate = useNavigate();

    const jwtDoctor = localStorage.getItem('jwtDoc');

    useEffect(() => {
      if (jwtDoctor) {
        toast.success("Redirected to Home");
        navigate("/doctor");
      }
    }, [jwtDoctor, navigate]);

    return <div>{children}</div>;
};

export default LoggedInDoctor;
