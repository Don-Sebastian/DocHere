import { FC } from 'react';
import DoctorNavbar from '../../Components/DoctorNavbar';
import ProfileDoctor from '../../Components/ProfileDoctor';

const ProfileDoc: FC = () => {
    return (
        <>
            <DoctorNavbar />
            <ProfileDoctor />
            profile doctor
        </>
    )
}

export default ProfileDoc;