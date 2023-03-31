import axios from "axios";
import { FC, useState, useEffect } from "react";
import { ADMIN_BACKEND_PORT } from "../../Utils/Config/URLS";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Redux/Store";
import NavbarAdmin from "../../Components/Admin/NavbarAdmin";
import { clearAdminDetails, updateAdminDetails } from "../../Redux/Slices/AdminDetailsSlice";

const HomeAdmin: FC = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
  });
    const navigate = useNavigate();
    const dispatch = useDispatch();

  const getUserData = async () => {
    try {
      await axios
        .post(
          `${ADMIN_BACKEND_PORT}/admin-home`,
          {},
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("jwtAdmin"),
            },
          }
        )
        .then((response) => {
          console.log(response);

            if (response.data.success) {
              dispatch(updateAdminDetails(response?.data))
          } else {
            toast.error(response?.data?.message);
            navigate("/admin/admin-login");
          }
        })
        .catch((err) => {
          if (axios.isAxiosError(err)) {
            toast.error(err?.response?.data?.message);
            navigate("/admin/admin-login");
          }
        });
    } catch (error) {
      console.log(error);
      navigate("/admin/admin-login");
    }
  };

  const handleLogOut = () => {
      localStorage.removeItem("jwtUser");
      dispatch(clearAdminDetails());
    toast.success("Logged out successfully!");
    navigate("/admin/admin-login");
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <>
      <NavbarAdmin />
      <div className="flex justify-center items-center h-screen flex-col">
        <div className="font-bold mb-4">
          {`${data?.name ? data?.email : "Admin"}`} Home Page
        </div>
        <button className="border rounded" onClick={handleLogOut}>
          LogOut
        </button>
      </div>
    </>
  );
};

export default HomeAdmin;
