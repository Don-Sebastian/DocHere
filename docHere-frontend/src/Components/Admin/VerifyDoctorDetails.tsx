import axios from 'axios';
import { FC, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { LoadingTypeDoctor } from '../../types/DoctorTypes';
import { ADMIN_BACKEND_PORT } from '../../Utils/Config/URLS';

interface Props{
    doctorId: string | undefined;
}

const VerifyDoctorDetails: FC<Props> = ({ doctorId }) => {
    const [verified, setVerified] = useState(false);
    const [doctorDetails, setDoctorDetails] = useState<LoadingTypeDoctor>({
        _id: '',
      name: "",
      email: "",
      verified_by_admin: false,
      loggedIn: false,
      avatar: "",
      profile: [
        {
          speciality: "",
          educationQuality: "",
          medicalRegNumber: 0,
          medRegCouncil: "",
          medRegYear: 0,
          profileImageDoctor: "",
        },
      ],
    });
    
    const handleVerify =async (isVerified: boolean) => {
        try {
          setVerified(isVerified);

          const response = await axios.put(
            `${ADMIN_BACKEND_PORT}/verify-Doctor/${doctorDetails?._id}`,
            { isVerified },
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("jwtAdmin"),
              },
            }
          );
          toast.success(response?.data?.message);
        } catch (err: any) {
          console.error(err);
          toast.error(err?.response?.data?.message);
        }
    };

    const fetchDoctorDetails = async () => {
      try {
        const response = await axios.get(
          `${ADMIN_BACKEND_PORT}/get-doctor-details/${doctorId}`,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("jwtAdmin"),
            },
          }
        );
        setDoctorDetails(response?.data?.doctorDetails);
      } catch (error) {
        console.error(error);
      }
    };

    useEffect(() => {
      fetchDoctorDetails();
    }, [verified]);

    return (
      <div className="bg-gray-100 min-h-screen">
        <div className="max-w-2xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="overflow-hidden shadow-sm rounded-lg bg-white">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-semibold text-main-blue">
                  Dr. {doctorDetails?.name}
                </h1>
                {doctorDetails.verified_by_admin ? (
                  <>
                    <button
                      className="bg-slate-200 text-main-blue font-semibold py-2 px-4 rounded hover:bg-slate-300 transition duration-300 ease-in-out"
                      onClick={() => handleVerify(false)}
                    >
                      Verified
                    </button>
                  </>
                ) : (
                  <button
                    className="bg-blue-900 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-300 ease-in-out"
                    onClick={() => handleVerify(true)}
                  >
                    Verify
                  </button>
                )}
              </div>
              <div className="mt-4">
                <p className="text-gray-700 font-semibold">Specialization:</p>
                <p className="text-gray-900">
                  {doctorDetails?.profile[0].speciality}
                </p>
              </div>
              <div className="mt-4">
                <p className="text-gray-700 font-semibold">
                  Education Qualification:
                </p>
                <p className="text-gray-900">
                  {doctorDetails?.profile[0].educationQuality}
                </p>
              </div>
              <div className="mt-4">
                <p className="text-gray-700 font-semibold">
                  Medical Registration Number:
                </p>
                <p className="text-gray-900">
                  {doctorDetails?.profile[0]?.medicalRegNumber.toString()}
                </p>
              </div>
              <div className="mt-4">
                <p className="text-gray-700 font-semibold">
                  Medical Registration Council:
                </p>
                <p className="text-gray-900">
                  {doctorDetails?.profile[0].medRegCouncil}
                </p>
              </div>
              <div className="mt-4">
                <p className="text-gray-700 font-semibold">
                  Medical Registration Year:
                </p>
                <p className="text-gray-900">
                  {doctorDetails?.profile[0].medRegYear.toString()}
                </p>
              </div>
              <div className="mt-4">
                <p className="text-gray-700 font-semibold">Contact:</p>
                <p className="text-gray-900">{doctorDetails?.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

}

export default VerifyDoctorDetails;