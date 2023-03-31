import { createSlice } from "@reduxjs/toolkit";
import { LoadingTypeDoctor } from "../../types/DoctorTypes";

const initialState: LoadingTypeDoctor = {
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
};

const doctorDetailSlice = createSlice({
  name: "doctorDetail",
  initialState,
  reducers: {
    updateDoctorDetails: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.verified_by_admin = action.payload.verified_by_admin;
      state.loggedIn = action.payload.success;
      state.avatar = action.payload.avatar;

      state.profile[0].speciality = action.payload.profile[0].speciality;
      state.profile[0].educationQuality = action.payload.profile[0].educationQuality;
      state.profile[0].medicalRegNumber = action.payload.profile[0].medicalRegNumber;
      state.profile[0].medRegCouncil = action.payload.profile[0].medRegCouncil;
      state.profile[0].medRegYear = action.payload.profile[0].medRegYear;
      state.profile[0].profileImageDoctor = action.payload.profile[0].profileImageDoctor;
    },
      clearDoctorDetails: (state) => {
          state.name = "";
          state.email = "";
          state.verified_by_admin = false;
          state.loggedIn = false;
          state.avatar = "";
          state.profile[0].speciality = '';
          state.profile[0].educationQuality = '';
          state.profile[0].medicalRegNumber = 0;
          state.profile[0].medRegCouncil = '';
          state.profile[0].medRegYear = 0;
          state.profile[0].profileImageDoctor = '';
      }
  },
});

export const { updateDoctorDetails, clearDoctorDetails } =
  doctorDetailSlice.actions;

export default doctorDetailSlice.reducer;
