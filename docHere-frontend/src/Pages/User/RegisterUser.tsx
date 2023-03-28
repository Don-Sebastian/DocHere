import { FC, useEffect, useState } from "react";
import axios from "axios";
import RegisterForm from "../../Components/RegisterForm";
import { USER_BACKEND_PORT } from "../../Utils/Config/URLS";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../Redux/Slices/alertsSlice";

interface User {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const RegisterUser: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [formDetails, setFormDetails] = useState({});

  const updateForm = (value: User): void => {
    setSubmitted(true);
    setFormDetails(value);
  };

  useEffect(() => {
    if (submitted) {
      try {
        (async () => {
          dispatch(showLoading());
          await axios
            .post(`${USER_BACKEND_PORT}/register`, formDetails, {
              withCredentials: true,
            })
            .then((response) => {
              dispatch(hideLoading());
              if (response.data.created) {
                toast.success(response.data.message);
                localStorage.setItem("jwtUser", response.data.token);
                navigate("/");
              } else if (response.data.errors)
                toast.error(response.data.errors.message);
              else toast.error("Failed to create account. Please retry!");
            })
            .catch((error) => {
              dispatch(hideLoading());
              toast.error(error.response.data.errors.message);
            });
        })();
      } catch (error: any) {
        dispatch(hideLoading());
        toast.error(error);
      }
    }
    return () => {
      setSubmitted(false);
    };
  }, [submitted]);

  return (
    <>
      <div className="register_container lg:grid grid-cols-2 h-screen flex">
        <div className="m-auto lg:w-4/5 lg:mr-0 md:p-7">
          <RegisterForm role="Patient" updateForm={updateForm} />
        </div>
        <div className="lg:relative lg:block hidden  ">
          <img
            className=" lg:absolute lg:mt-96 -ml-10 -z-10 scale-150 flex-shrink"
            src="/ImageUploads/singup logo.webp"
            alt=""
          />
        </div>
      </div>
    </>
  );
};

export default RegisterUser;
