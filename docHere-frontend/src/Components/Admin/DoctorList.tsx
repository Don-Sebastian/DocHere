import axios, { AxiosResponse } from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoadingTypeDoctor } from '../../types/DoctorTypes';
import { ADMIN_BACKEND_PORT } from '../../Utils/Config/URLS';

const DoctorList = () => {

    const [doctors, setDoctors] = useState<LoadingTypeDoctor[]>([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const fetchAllDoctors = async () => {
        
        try {
            const response: AxiosResponse<any, any> = await axios.get(
              `${ADMIN_BACKEND_PORT}/all-doctor-list`,
              {
                headers: {
                  Authorization: "Bearer " + localStorage.getItem("jwtAdmin"),
                },
              }
            );
            const { doctorList } = response.data;
            setDoctors(doctorList);
        } catch (err) {
            console.error(err);
        }
    }


    useEffect(() => {
        fetchAllDoctors();
      }, []);

      return (
        <div className=" px-5 py-3 sm:px-6 lg:px-8">
          <h1 className="text-main-blue font-semibold mb-10 text-2xl border-b-2">
            Doctor List
          </h1>
          {doctors.map((doctor) => (
            <div
              key={doctor._id?.toString()}
              onClick={() => navigate(`/admin/verify-doctor/${doctor._id}`)}
              className="bg-white shadow overflow-hidden w-1/2 mx-auto rounded-lg mb-4"
            >
              <div className="px-4 py-5 sm:px-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-medium leading-6 text-gray-900">
                    Dr. {doctor.name}
                  </h2>
                  {doctor.verified_by_admin ? (
                    <span className="text-green-600 font-bold text-base">
                      Verified
                    </span>
                  ) : (
                    <span className="text-red-600 font-semibold text-base">
                      Not Verified
                    </span>
                  )}
                </div>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  {doctor?.profile[0]?.speciality}
                </p>
              </div>
            </div>
          ))}
        </div>
      );
}

export default DoctorList;