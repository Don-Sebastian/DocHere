import { FC, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { USER_BACKEND_PORT } from "../../Utils/Config/URLS";
import { toast } from "react-hot-toast";
import LoginForm from "../../Components/LoginForm";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../Redux/Slices/alertsSlice";

interface User {
  email: string;
  password: string;
}

interface UserObject {
  email: string;
  email_verified: boolean;
  given_name: string;
  family_name: string;
  name: string;
  picture: string;
}

// type UserDetails = UserObject | User;

const LoginUser: FC = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [googleVerification, setGoogleVerification] = useState(false);
  const [formDetails, setFormDetails] = useState({});

  const updateForm = (value: User): void => {
    setSubmitted(true);
    setFormDetails(value);
  };

  const updateGoogleVerification = (value: UserObject) => {
    setSubmitted(true);
    setFormDetails(value); 
    setGoogleVerification(true);       
  };

  const handleFormSubmission = () => {
    try {
      (async () => {
        dispatch(showLoading());
        await axios
          .post(`${USER_BACKEND_PORT}/login`, formDetails, {
            withCredentials: true,
          })
          .then((response) => {
            dispatch(hideLoading());
            if (response?.data?.loginStatus) {
              toast.success(response?.data?.message);
              localStorage.setItem("jwtUser", response.data.token);
              navigate("/");
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
  }

  const handleGoogleVerification = async () => {
    try {
      dispatch(showLoading());
      await axios
        .post(`${USER_BACKEND_PORT}/google/auth`, formDetails, {
          withCredentials: true,
        })
        .then((response) => {
          dispatch(hideLoading());
          if (response?.data?.loginStatus) {
            toast.success(response?.data?.message);
            localStorage.setItem("jwtUser", response.data.token);
            navigate("/");
          } else if (response?.data?.errors)
            toast.error(response?.data?.errors?.message);
          else toast.error("Failed to create account. Please retry!");
        })
        .catch((error) => {
          dispatch(hideLoading());
          toast.error(error?.response?.data?.errors?.message);
        });
    } catch (error) {
      dispatch(hideLoading());
      console.error(error);
    }
  };

  useEffect(() => {
    if (submitted) {
      if (googleVerification) handleGoogleVerification();
      else handleFormSubmission();
    }
    return () => {
      setSubmitted(false);
      setGoogleVerification(false);
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
            role="Patient"
            updateForm={updateForm}
            updateGoogleVerification={updateGoogleVerification}
          />
        </div>
      </div>
    </>
  );
};

export default LoginUser;
