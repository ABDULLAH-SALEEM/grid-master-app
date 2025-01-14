import { AUTH_ME, SIGN_UP } from '../../../apiService/apiDeclaration';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getLoggedInUser = createAsyncThunk('auth/getLoggedInUser', AUTH_ME);
export const signUp = createAsyncThunk('auth/signUp', SIGN_UP);
