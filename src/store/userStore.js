import { createSlice } from '@reduxjs/toolkit';

let user = createSlice({
  name: 'user',
  initialState: {
    user: null,
  },
  reducers: {
    setUserAllInto: (state, action) => {
      state.user = action.payload;
    },
  },
});
export const { setUserAllInto } = user.actions;
export default user;
