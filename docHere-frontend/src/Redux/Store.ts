import { configureStore } from "@reduxjs/toolkit";
import AdminDetailsSlice from "./Slices/AdminDetailsSlice";
import alertSlice from "./Slices/alertsSlice";
import DoctorDetailsSlice from "./Slices/DoctorDetailsSlice";

export const store = configureStore({
  reducer: {
    alert: alertSlice,
    doctorDetail: DoctorDetailsSlice,
    adminDetails: AdminDetailsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;