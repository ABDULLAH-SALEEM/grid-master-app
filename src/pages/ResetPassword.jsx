import { Typography } from '@mui/material';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Wrapper from 'src/components/common/wrapper';
import ResetPasswordForm from 'src/components/form/ResetPasswordForm';

const ResetPassword = () => {
  return (
    <Wrapper>
      <Helmet>
        <title>Reset Password</title>
      </Helmet>
      <Typography sx={{ mb: 3 }} variant="h4" color={'primary'}>
        Reset Password
      </Typography>
      <ResetPasswordForm />
    </Wrapper>
  );
};

export default ResetPassword;
