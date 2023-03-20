import { FC, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { USER_BACKEND_PORT } from "../../assets/Config/URLS";
import { toast } from "react-hot-toast";
import LoginForm from "../../Components/LoginForm";

interface User {
  email: string;
  password: string;
}

const LoginUser: FC = () => {

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
            
            
            await axios
              .post(`${USER_BACKEND_PORT}/login`, formDetails, {withCredentials: true})
              .then((response) => {                
                  if (response?.data?.loginStatus) {
                  toast.success(response?.data?.message);
                  localStorage.setItem('jwtUser', response.data.token);
                  navigate("/");
                } else if (response?.data?.errors)
                  toast.error(response?.data?.errors?.message);
                else toast.error("Failed to create account. Please retry!");
              })
              .catch((error) => {
                toast.error(error?.response?.data?.errors?.message);
              });
          })();
        } catch (error: any) {
          toast.error(error);
        }
      }
      return () => {
          setSubmitted(false);
      }
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
            <LoginForm role="Patient" updateForm={updateForm} />
          </div>
        </div>
      </>
    );
}

export default LoginUser;