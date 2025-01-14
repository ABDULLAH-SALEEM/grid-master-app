import { Typography } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import Wrapper from 'src/components/common/wrapper';
import OTPForm from 'src/components/form/OTPForm';

const OTPVerification = () => {
  const location = useLocation();
  const data = location.state || {};
  const { email, verifcationMode } = data;

  return (
    <Wrapper>
      <Helmet>
        <title>OTP Verification</title>
      </Helmet>
      <Typography sx={{ mb: 2 }} variant="h3" color={'primary'}>
        Verify your Otp
      </Typography>
      <OTPForm email={email} verificationMode={verifcationMode} />
    </Wrapper>
  );
};
export default OTPVerification;
