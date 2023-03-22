import axios from "axios";
import { FC, useState, useEffect } from "react";
import { USER_BACKEND_PORT } from "../../Utils/Config/URLS";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/Store";

const HomeUser: FC = () => { 

  const [data, setData] = useState({
    name: "",
    email: "",
  });
  const navigate = useNavigate();

  const getUserData = async () => {
    try {
      await axios
        .post(
          `${USER_BACKEND_PORT}/post-user-by-id`,
          {},
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("jwtUser"),
            },
          }
        )
        .then((response) => {
          console.log(response);

          if (response.data.success) setData(response?.data);
          else {
            toast.error(response?.data?.message);
            navigate("/login");
          }
        })
        .catch((err) => {
          if (axios.isAxiosError(err)) {
            toast.error(err?.response?.data?.message);
            navigate("/login");
          }
        });
    } catch (error) {
      console.log(error);
      navigate("/login");
    }
  };

  const handleLogOut = () => {
    localStorage.removeItem('jwtUser');
    toast.success('Logged out successfully!');
    navigate('/login');
  }

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className="flex justify-center items-center h-screen flex-col">
      <div className="font-bold mb-4">
        {`${data?.name ? data?.name : "User"}`} Home Page
      </div>
      <button className="border rounded" onClick={handleLogOut}>LogOut</button>
    </div>
  );
};

export default HomeUser;
