import { createSlice } from "@reduxjs/toolkit";
import axios from "../instance/instance";

export const UserSlice = createSlice({
  name: "user",
  initialState: {
    detail: {},
  },
  reducers: {
    setUserDetail: (state, action) => {
      console.log("state", state);
      state.detail = action.payload;
    },
  },
});

export const { setUserDetail } = UserSlice.actions;

export const userDetail = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/user/" + id);

      console.log(data, `di slice detail`);
      dispatch(setUserDetail(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export default UserSlice.reducer;
