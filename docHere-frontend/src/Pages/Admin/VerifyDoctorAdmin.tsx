import { useParams } from "react-router-dom";
import { FC } from 'react';
import NavbarAdmin from "../../Components/Admin/NavbarAdmin";
import VerifyDoctorDetails from "../../Components/Admin/VerifyDoctorDetails";


const VerifyDoctorAdmin: FC = () => {

    const { doctorId } = useParams();

    return <>
        <NavbarAdmin />
        <VerifyDoctorDetails doctorId={doctorId} />
        {/* <DoctorList /> */}
    </>
}

export default VerifyDoctorAdmin;;