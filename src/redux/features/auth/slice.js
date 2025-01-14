import { createSlice } from '@reduxjs/toolkit';
import { getLoggedInUser } from './actions';
import { constants } from 'src/constants';
import { clearStorage, retrieveData } from 'src/helper/storageHelper';

const initialState = {
  user: null,
  token: retrieveData(constants.authToken),
  status: {
    user: { loading: true, errorMessage: '', successMessage: '' },
    join: { loading: false, errorMessage: '', successMessage: '' },
    signIn: { loading: false, errorMessage: '', successMessage: '' },
  },
  notifications: [],
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: () => initialState,
    signOut: (state) => {
      state.user = null;
      clearStorage();
      state.token = '';
    },
    changeLanguage: (state, action) => {
      state.language = action.payload;
    },
    setToken: (state, payload) => {
      state.token = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // getLoggedInUser
      .addCase(getLoggedInUser.pending, (state) => {
        state.status.user.loading = true;
      })
      .addCase(getLoggedInUser.fulfilled, (state, action) => {
        state.status.user.loading = false;
        state.user = action.payload.data;
        state.language = action.payload.data.language;
      })
      .addCase(getLoggedInUser.rejected, (state, action) => {
        state.status.user.loading = false;
        state.status.user.errorMessage = action.error.message;
      });
  },
});

export const { reset, signOut, changeLanguage, addNotification, setNotifications, setToken } = authSlice.actions;

export default authSlice.reducer;
