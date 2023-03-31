import { FC } from "react";
import DoctorNavbar from "../../Components/Doctor/DoctorNavbar";
import ProfileDoctor from "../../Components/Doctor/ProfileDoctor";

const ProfileDoc: FC = () => {
  return (
    <>
      <DoctorNavbar />
      <ProfileDoctor />
      profile doctor
    </>
  );
};

export default ProfileDoc;
