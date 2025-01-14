import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Grid2, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { VERIFY_EMAIL } from 'src/apiService/apiDeclaration';
import Wrapper from 'src/components/common/wrapper';
import CustomTextField from 'src/components/formFields/textField';
import LoaderButton from 'src/components/common/loaderButton';
import { forgetFormSchema } from 'src/config/yup';
import { OTP_VERIFICATION_MODE, showErrorTost, showSuccessTost } from 'src/constants';

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(forgetFormSchema),
  });
  const forgetform = async (body) => {
    setLoading(true);
    try {
      const resp = await VERIFY_EMAIL(body);
      showSuccessTost(resp.message);
      navigate('/otp', { state: { email: body.email, verifcationMode: OTP_VERIFICATION_MODE.ACCOUNT_RECOVERY } });
    } catch (error) {
      showErrorTost(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Wrapper>
      <Helmet>
        <title>Recover Account</title>
      </Helmet>
      <Typography sx={{ mb: 3 }} variant="h4" color={'primary'}>
        Recover Account
      </Typography>
      <Box sx={{ width: '100%', margin: '0 auto' }}>
        <form onSubmit={handleSubmit(forgetform)}>
          <Grid2 item xs={12}>
            <CustomTextField
              label={'Email'}
              placeholder="Please enter your email"
              type="text"
              controller={{
                name: 'email',
                control: control,
                errors: errors.email,
              }}
            />
          </Grid2>
          <Grid2 item xs={12} sx={{ mt: 2, float: 'right' }}>
            <LoaderButton type="submit" loading={loading} variant="contained" disabled={!isValid} buttonText={'next'} />
          </Grid2>
        </form>
      </Box>
    </Wrapper>
  );
};

export default ForgotPassword;
