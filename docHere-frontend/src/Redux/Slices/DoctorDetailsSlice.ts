import { createSlice } from "@reduxjs/toolkit";
import { LoadingTypeDoctor } from "../../types/DoctorTypes";

const initialState: LoadingTypeDoctor = {
  name: "",
  email: "",
  verified_by_admin: false,
  loggedIn: false,
};

const doctorDetailSlice = createSlice({
    name: 'doctorDetail',
    initialState,
    reducers: {
        updateDoctorDetails: (state, action) => {
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.verified_by_admin = action.payload.verified_by_admin;
            state.loggedIn = action.payload.success;
        },
        clearDoctorDetails: (state) => {
            state.name = '';
            state.email = '';
            state.verified_by_admin = false;
        }
    }
});

export const { updateDoctorDetails, clearDoctorDetails } = doctorDetailSlice.actions;

export default doctorDetailSlice.reducer;