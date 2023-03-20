import axios from "axios";
import { FC,useState, useEffect } from "react";
import { USER_BACKEND_PORT } from "../../assets/Config/URLS";
import {useCookies} from 'react-cookie';
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";

const HomeUser: FC = () => {

    const [cookie, setCookie, removeCookie] = useCookies([])
    const [data, setData] = useState({
        name: '',
        email: ''
    });
    const navigate = useNavigate();

    const getUserData = async () => {
        try {
            await axios
                .post(`${USER_BACKEND_PORT}/post-user-by-id`, {}, {
                headers: {
                  Authorization: "Bearer " + localStorage.getItem("jwtUser"),
                },
              })
                .then((response) => {
                    console.log(response);
                    
                  if (response.data.success) setData(response?.data)
                  else {
                      toast.error(response?.data?.message);
                      navigate('/login');
                  } ;                
              })
              .catch((err) => {
                if (axios.isAxiosError(err)) {
                toast.error(err?.response?.data?.message);
                navigate("/login");
            }
              });
        } catch (error) {
            console.log(error);
            navigate('/login');
        }
    }

    useEffect(() => {
        getUserData();
    }, []);

    return (
      <div className="flex justify-center items-center h-screen">
        <div className="font-bold">{`${data?.name ? data?.name:'User'}`} Home Page</div>
      </div>
    );
} 

export default HomeUser;