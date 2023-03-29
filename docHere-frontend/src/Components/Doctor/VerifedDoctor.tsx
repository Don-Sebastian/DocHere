import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../Redux/Store";
import { LoadingTypeDoctor } from "../../types/DoctorTypes";
import { useEffect } from 'react';

const VerifiedDoctor = ({ children }: { children: React.ReactNode }) => {

  const navigate = useNavigate();
  const verified_by_admin = useSelector<RootState, boolean | undefined>((store) => store?.doctorDetail.verified_by_admin);
    
    useEffect(() => {
    if (verified_by_admin) navigate("/doctor");
  }, [verified_by_admin, navigate]);

  return <div>{children}</div>;
};

export default VerifiedDoctor;