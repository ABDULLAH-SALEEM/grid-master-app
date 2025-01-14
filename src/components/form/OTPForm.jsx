import { otp } from 'src/config/yup';
import React, { useState } from 'react';
import { Box, Grid2 } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import CustomTextField from '../formFields/textField';
import { yupResolver } from '@hookform/resolvers/yup';
import LoaderButton from '../common/loaderButton';
import { constants, OTP_VERIFICATION_MODE, showErrorTost, showSuccessTost } from 'src/constants';
import { VERIFY_OTP } from 'src/apiService/apiDeclaration';
import { storeData } from 'src/helper/storageHelper';

const OTPForm = ({ email, verificationMode }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(otp),
  });

  const verifyOTP = async (data) => {
    setLoading(true);
    const body = {
      email: email,
      verificationMode: verificationMode,
      otp: data.otp,
    };
    try {
      const response = await VERIFY_OTP(body);
      showSuccessTost(response.message);
      if (verificationMode === OTP_VERIFICATION_MODE.NEW_USER) {
        navigate('/');
      } else {
        storeData(constants.authToken, response.data.token);
        navigate('/change-password');
      }
    } catch (error) {
      showErrorTost(error.message);
      console.error('Error verifying OTP:', error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Box sx={{ width: '100%', margin: '0 auto' }}>
      <form onSubmit={handleSubmit(verifyOTP)}>
        <Grid2 item xs={12}>
          <CustomTextField
            label={'Otp'}
            type="text"
            controller={{
              name: 'otp',
              control: control,
              errors: errors.otp,
            }}
          />
        </Grid2>
        <Grid2 item xs={12} sx={{ mt: 2, float: 'right' }}>
          <LoaderButton type="submit" loading={loading} variant="contained" disabled={!isValid} buttonText={'Verify'} />
        </Grid2>
      </form>
    </Box>
  );
};

export default OTPForm;
