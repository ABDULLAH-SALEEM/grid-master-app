import { Box, Grid2 } from '@mui/material';
import React, { useState } from 'react';
import CustomTextField from '../formFields/textField';
import LoaderButton from '../common/loaderButton';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { resetPasswordSchema } from 'src/config/yup';
import { RESET_PASSWORD } from 'src/apiService/apiDeclaration';
import { showErrorTost, showSuccessTost } from 'src/constants';
import { useNavigate } from 'react-router-dom';

const ResetPasswordForm = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(resetPasswordSchema),
  });

  const changePass = async (body) => {
    setLoading(true);
    try {
      const resp = await RESET_PASSWORD(body);
      showSuccessTost(resp.message);
      navigate('/');
    } catch (error) {
      showErrorTost(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ width: '100%', margin: '0 auto' }}>
      <form onSubmit={handleSubmit(changePass)}>
        <Grid2 sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Grid2 item xs={12}>
            <CustomTextField
              label={'resetPasswordPage.currentPass'}
              type="password"
              isPassword
              controller={{
                name: 'currentPass',
                control: control,
                errors: errors.currentPass,
              }}
            />
          </Grid2>
          <Grid2 item xs={12}>
            <CustomTextField
              label={'resetPasswordPage.newPass'}
              type="password"
              isPassword
              controller={{
                name: 'password',
                control: control,
                errors: errors.password,
              }}
            />
          </Grid2>
          <Grid2 item xs={12}>
            <CustomTextField
              label={'common.confirmPassword'}
              type="password"
              isPassword
              controller={{
                name: 'confirmPassword',
                control: control,
                errors: errors.confirmPassword,
              }}
            />
          </Grid2>
          <Grid2 item xs={12} sx={{ mt: 2 }}>
            <LoaderButton
              type="password"
              loading={loading}
              variant="contained"
              disabled={!isValid}
              buttonText={'resetPasswordPage.changePass'}
            />
          </Grid2>
        </Grid2>
      </form>
    </Box>
  );
};

export default ResetPasswordForm;
