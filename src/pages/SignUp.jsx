import { Link, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Wrapper from 'src/components/common/wrapper';
import SignUpForm from 'src/components/form/SignUpForm';

const SignUp = () => {
  return (
    <Wrapper>
      <Helmet>
        <title>Sign Up</title>
      </Helmet>
      <Typography sx={{ my: 5, textAlign: 'center' }} variant="h4" color={'primary'}>
        Join Grid Master
      </Typography>
      <SignUpForm />
      <Typography variant="body1" textAlign={'center'}>
        Already have an account?{' '}
        <Link component={RouterLink} to={'/'} underline="hover">
          Login
        </Link>
      </Typography>
    </Wrapper>
  );
};

export default SignUp;
