import { Helmet } from 'react-helmet-async';
import { Link as RouterLink } from 'react-router-dom';
import { Link, Typography } from '@mui/material';
import Wrapper from 'src/components/common/wrapper';
import LoginForm from 'src/components/form/LoginForm';

const SigninPage = () => {
  return (
    <Wrapper>
      <Helmet>
        <title>Grid Master</title>
      </Helmet>
      <Typography sx={{ mb: 3, textAlign: 'center' }} variant="h4" color={'primary'}>
        Welcome back to Grid Master
      </Typography>
      <LoginForm />
      <Typography variant="h8" mt={0.5}>
        Don't have an account?{' '}
        <Link component={RouterLink} to={'/sign-up'} underline="hover" sx={{ cursor: 'pointer' }}>
          Join now
        </Link>
      </Typography>
    </Wrapper>
  );
};

export default SigninPage;
