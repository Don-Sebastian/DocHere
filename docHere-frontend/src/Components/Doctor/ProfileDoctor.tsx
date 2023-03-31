import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../Redux/Slices/alertsSlice";
import { updateDoctorDetails } from "../../Redux/Slices/DoctorDetailsSlice";
import { DOCTOR_BACKEND_PORT } from "../../Utils/Config/URLS";

type Inputs = {
  name: string;
  speciality: string;
  educationQuality: string;
  medicalRegNumber: number;
  medRegCouncil: string;
  medRegYear: number;
  profileImageDoctor: FileList;
};

const ProfileDoctor = () => {
  const dispatch = useDispatch();
  const [sendFormDetails, setSendFormDetails] = useState({});
  const [newFormData, setNewFormData] = useState<FormData>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (!Object.keys(errors).length) {
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("speciality", data.speciality);
      formData.append("educationQuality", data.educationQuality);
      formData.append("medicalRegNumber", data.medicalRegNumber.toString());
      formData.append("medRegCouncil", data.medRegCouncil);
      formData.append("medRegYear", data.medRegYear.toString());
      for (let value of data.profileImageDoctor)
        formData.append("profileImageDoctor", value);
      setNewFormData(formData);
      setSendFormDetails(data);
    }
  };
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const handleFormSubmit = async () => {
    dispatch(showLoading());

    await axios
      .post(`${DOCTOR_BACKEND_PORT}/update-doctor-profile`, newFormData, {
        withCredentials: true,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwtDoc"),
        },
      })
      .then((response) => {
        dispatch(updateDoctorDetails(response?.data?.response));
        dispatch(hideLoading());
        toast.success(response.data.message);
      })
      .catch((errors) => {
        console.error(errors);
        dispatch(hideLoading());
        toast.error(errors.message);
      });
  };

  useEffect(() => {
    if (Object.keys(sendFormDetails).length) {
      handleFormSubmit();
    }
  }, [sendFormDetails]);

  return (
    <div className="px-5 py-3 h-screen">
      <h1 className="text-main-blue font-semibold text-2xl border-b-2">
        Profile Doctor
      </h1>

      <h2 className="text-main-blue mt-5 font-bold text-4xl">
        Hello Dr.Poly, Let's build your profile
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid lg:grid-flow-col gap-4 p-5">
          <div className="mb-4">
            <div className="grid gap-6 mb-6 md:grid-cols-2">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Name
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  {...register("name", { required: "This field is required." })}
                  placeholder="Name"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs italic">
                    {errors.name?.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Speciality
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  {...register("speciality", {
                    required: "This field is required.",
                  })}
                  placeholder="Speciality"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs italic">
                    {errors.speciality?.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Education Qualification
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  {...register("educationQuality", {
                    required: "This field is required.",
                  })}
                  placeholder="Education Qualification"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs italic">
                    {errors.educationQuality?.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Medical Registration Number
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  {...register("medicalRegNumber", {
                    required: "This field is required.",
                    pattern: {
                      value: /^[0-9]{1,6}$/,
                      message: "Enter Valid Registration number",
                    },
                  })}
                  placeholder="Medical Registration Number"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs italic">
                    {errors.medicalRegNumber?.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Registration Council
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  {...register("medRegCouncil", {
                    required: "This field is required.",
                  })}
                  placeholder="Registration Council"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs italic">
                    {errors.medRegCouncil?.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Registration Year
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  {...register("medRegYear", {
                    required: "This field is required.",
                    pattern: {
                      value: /^(19[5-9]\d|20[0-4]\d|2050)$/,
                      message: "Enter Valid Year",
                    },
                  })}
                  placeholder="Registration Year"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs italic">
                    {errors.medRegYear?.message}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="m-auto">
            <div className="mb-3 w-96">
              <label className="mb-2 inline-block text-main-blue">
                Upload Profile Picture
              </label>
              <input
                className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding py-[0.32rem] px-3 text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[margin-inline-end:0.75rem] file:[border-inline-end-width:1px] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-[0_0_0_1px] focus:shadow-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100"
                type="file"
                {...register("profileImageDoctor")}
                name="profileImageDoctor"
              />
              {errors.name && (
                <p className="text-red-500 text-xs italic">
                  {errors.profileImageDoctor?.message}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center mt-10">
          <button
            className="bg-blue-900 lg:w-1/4 hover:bg-main-blue text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Upload Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileDoctor;
