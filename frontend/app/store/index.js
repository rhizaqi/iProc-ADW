import { configureStore } from "@reduxjs/toolkit";
import { UserSlice } from "../features/userSlices";

export default configureStore({
  reducer: {
    user: UserSlice,
  },
});
