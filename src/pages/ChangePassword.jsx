import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Grid, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { CHANGE_PASSWORD } from 'src/apiService/apiDeclaration';
import LoaderButton from 'src/components/common/loaderButton';
import Wrapper from 'src/components/common/wrapper';
import CustomTextField from 'src/components/formFields/textField';
import { changePasswordSchema } from 'src/config/yup';
import { clearStorage } from 'src/helper/storageHelper';

const ChangePassword = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(changePasswordSchema),
  });
  const setPassword = async (body) => {
    setLoading(true);
    try {
      await CHANGE_PASSWORD(body);
      navigate('/');
      clearStorage();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Wrapper>
      <Helmet>
        <title>Change Password</title>
      </Helmet>
      <Typography sx={{ mb: 3 }} variant="h4" color={'primary'}>
        Change Password
      </Typography>
      <Box sx={{ width: '100%', margin: '0 auto' }}>
        <form onSubmit={handleSubmit(setPassword)}>
          <Grid sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <Grid item xs={12}>
              <CustomTextField
                label={'New password'}
                type="password"
                isPassword
                controller={{
                  name: 'password',
                  control: control,
                  errors: errors.password,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomTextField
                label={'Verify password'}
                type="password"
                isPassword
                controller={{
                  name: 'confirmPassword',
                  control: control,
                  errors: errors.confirmPassword,
                }}
              />
            </Grid>
            <Grid item xs={12} sx={{ mt: 2 }}>
              <LoaderButton
                type="password"
                loading={loading}
                variant="contained"
                disabled={!isValid}
                buttonText={'Change password'}
              />
            </Grid>
          </Grid>
        </form>
      </Box>
    </Wrapper>
  );
};

export default ChangePassword;
