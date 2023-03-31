import axios from "axios";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateAdminDetails } from "../../Redux/Slices/AdminDetailsSlice";
import { ADMIN_BACKEND_PORT } from "../../Utils/Config/URLS";

const NotificationList = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const unseenNotifications = useSelector((store: any) => store.adminDetails.unseenNotifications);
    const handleNotificationAdminClick = async (doctorNotificationDetails: any) => {
            if (doctorNotificationDetails.doctorId) {
                await axios
                  .delete(
                    `${ADMIN_BACKEND_PORT}/delete-seenNotification/${doctorNotificationDetails._id}`,
                    {
                      headers: {
                        Authorization:
                          "Bearer " + localStorage.getItem("jwtAdmin"),
                      },
                    }
                  )
                  .then((response) => {
                      dispatch(updateAdminDetails(response?.data?.response));                   
                      navigate(`/admin/verify-doctor/${doctorNotificationDetails.doctorId}`);
                  })
                  .catch((err) => {
                      console.error(err);
                      toast.error(err?.response?.data?.message);
                  });
            }
    }

    return (
      <div className="px-5 py-3 h-screen">
        <h1 className="text-main-blue font-semibold text-2xl border-b-2">
          Admin Notifications
        </h1>
        <div className="flex justify-center">
          <div className="border border-main-blue rounded-lg w-full h-96 md:w-1/2 mt-14 p-10">
            <h1 className="text-main-blue font-regular text-xl border-b-2 mb-5">
              Unseen Notifications
            </h1>
            {unseenNotifications.map((data:any) => {
                return (
                  <div onClick={()=> handleNotificationAdminClick(data)} key={data._id} className="border rounded-lg h-10 border-gray-400 flex items-center">
                    <h1 className="px-5">{`Dr. ${data.doctorName} is to be verified`}</h1>
                  </div>
                );
            })}
          </div>
        </div>
      </div>
    );
}

export default NotificationList;