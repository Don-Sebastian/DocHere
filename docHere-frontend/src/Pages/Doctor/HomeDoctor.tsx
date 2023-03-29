import { FC, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DOCTOR_BACKEND_PORT } from "../../Utils/Config/URLS";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { clearDoctorDetails, updateDoctorDetails } from "../../Redux/Slices/DoctorDetailsSlice";
import { RootState } from "../../Redux/Store";
import { LoadingTypeDoctor } from "../../types/DoctorTypes";

const HomeDoctor: FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const doctorDetails = useSelector<RootState, LoadingTypeDoctor | undefined>(
      (store) => store?.doctorDetail
    );
    
    const getDocData = async () => {
      try {
        await axios
          .post(
            `${DOCTOR_BACKEND_PORT}/post-doc-by-id`,
            {},
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("jwtDoc"),
              },
            }
          )
          .then((response) => {
              if (response.data.success) {
                  dispatch(updateDoctorDetails(response.data));
                  if (!response.data.verified_by_admin) navigate('/doctor/profile-doctor');
                  
            } 
              else {
                  dispatch(clearDoctorDetails());
                  localStorage.removeItem("jwtDoc");
              toast.error(response?.data?.message);
              navigate("/doctor/doctor-login");
            }
          })
          .catch((err) => {
              if (axios.isAxiosError(err)) {
                  dispatch(clearDoctorDetails());
                localStorage.removeItem("jwtDoc");
              toast.error(err?.response?.data?.message);
              navigate("/doctor/doctor-login");
            }
          });
      } catch (error) {
          console.log(error);
          dispatch(clearDoctorDetails());
          localStorage.removeItem("jwtDoc");
        navigate("/doctor/doctor-login");
      }
    };

    const handleLogOut = () => {
      localStorage.removeItem("jwtDoc");
        toast.success("Logged out successfully!");
        dispatch(clearDoctorDetails());
      navigate("/doctor/doctor-login");
    };

    useEffect(() => {
      getDocData();
    }, []);

    return (
      <div className="flex justify-center items-center h-screen flex-col">
        <div className="font-bold mb-4">
          {`${doctorDetails?.name ? doctorDetails?.name : "Doctor "}`} Home Page
        </div>
        <button className="border rounded" onClick={handleLogOut}>
          LogOut
        </button>
      </div>
    );
}

export default HomeDoctor;