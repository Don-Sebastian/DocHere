import { createSlice } from "@reduxjs/toolkit";
import { AdminDetailsType } from "../../types/DoctorTypes";

const initialState: AdminDetailsType = {
  email: "",
  unseenNotifications: [],
};

const AdminDetailsSlice = createSlice({
  name: "AdminDetails",
  initialState,
    reducers: {
        updateAdminDetails: (state, action) => {
            state.email = action.payload.email;
            state.unseenNotifications = action.payload.unseenNotifications;
        },
        clearAdminDetails: (state) => {
            state.email = '';
            state.unseenNotifications = [];
        }
  },
});

export const { updateAdminDetails, clearAdminDetails } = AdminDetailsSlice.actions;

export default AdminDetailsSlice.reducer;