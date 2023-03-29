import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import LoginForm from "../../Components/LoginForm";
import { hideLoading, showLoading } from "../../Redux/Slices/alertsSlice";
import axios from "axios";
import { ADMIN_BACKEND_PORT } from "../../Utils/Config/URLS";
import { toast } from "react-hot-toast";

interface User {
  email: string;
  password: string;
}

const LoginAdmin = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [submitted, setSubmitted] = useState(false);
    const [formDetails, setFormDetails] = useState({});

    const updateForm = (value: User): void => {
      setSubmitted(true);
      setFormDetails(value);
    };

    const updateGoogleVerification = () => {
        return;
    };

    const handleFormSubmission = () => {
      try {
        (async () => {
          dispatch(showLoading());
          await axios
            .post(`${ADMIN_BACKEND_PORT}/admin-login`, formDetails, {
              withCredentials: true,
            })
            .then((response) => {
              dispatch(hideLoading());
              if (response?.data?.loginStatus) {
                toast.success(response?.data?.message);
                localStorage.setItem("jwtAdmin", response.data.token);
                navigate("/admin");
              } else if (response?.data?.errors)
                toast.error(response?.data?.errors?.message);
              else toast.error("Failed to create account. Please retry!");
            })
            .catch((error) => {
              dispatch(hideLoading());
              toast.error(error?.response?.data?.errors?.message);
            });
        })();
      } catch (error: any) {
        dispatch(hideLoading());
        toast.error(error);
      }
    };


    useEffect(() => {
      if (submitted) handleFormSubmission();
      return () => {
        setSubmitted(false);
      };
    }, [submitted]);

    return (
      <>
        <div className="register_container lg:grid grid-cols-2 h-screen flex">
          <div className="lg:relative lg:block hidden  ">
            <img
              className=" lg:absolute lg:mt-96 ml-96 -z-10 scale-150 flex-shrink"
              src="/ImageUploads/singup logo.webp"
              alt=""
            />
          </div>
          <div className="m-auto lg:mt-20 lg:w-4/5 lg:ml-0 md:p-7">
            <LoginForm
              role="Admin"
              updateForm={updateForm}
              updateGoogleVerification={updateGoogleVerification}
            />
          </div>
        </div>
      </>
    );
};

export default LoginAdmin;