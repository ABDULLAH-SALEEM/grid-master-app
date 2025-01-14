import React, { useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import HomeRouter from './routes/homeRoutes';
import AuthRouter from './routes/authRoutes';
import { ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { Box, LinearProgress } from '@mui/material';
import { getLoggedInUser } from './redux/features/auth/actions';

export default function App() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth.status.user);
  const { user, token } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getLoggedInUser());
    // eslint-disable-next-line
  }, [token]);

  return (
    <>
      {loading ? (
        <Box sx={{ width: '100%' }}>
          <LinearProgress />
        </Box>
      ) : user?.email ? (
        <HomeRouter />
      ) : (
        <AuthRouter />
      )}
      <ToastContainer />
    </>
  );
}
