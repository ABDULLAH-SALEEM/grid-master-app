import { Grid, Link, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ICONS } from 'src/assets/library';
import { signinFormScheme } from 'src/config/yup';
import { yupResolver } from '@hookform/resolvers/yup';
import LoaderButton from 'src/components/common/loaderButton';
import CustomTextField from 'src/components/formFields/textField';
import { SIGNIN } from 'src/apiService/apiDeclaration';
import { constants, showErrorTost, showSuccessTost } from 'src/constants';
import SocialLogin from '../common/socialLogin';
import { useDispatch } from 'react-redux';
import { setToken } from 'src/redux/features/auth/slice';
import { storeData } from 'src/helper/storageHelper';

const LoginForm = ({ loading }) => {
  const dispatch = useDispatch();
  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(signinFormScheme),
  });

  const onSignin = async (data) => {
    try {
      const resp = await SIGNIN(data);
      const token = resp.data.token;
      dispatch(setToken(token));
      storeData(constants.authToken, token);
      showSuccessTost(resp.message);
    } catch (error) {
      showErrorTost(error.message);
      console.error('Error during sign-in:', error);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSignin)}>
      <Grid container spacing={2.5}>
        <Grid item xs={12}>
          <CustomTextField
            label={'Email'}
            placeholder={'name@domain.com'}
            type="email"
            icon={ICONS.EMAIL}
            controller={{
              name: 'email',
              control: control,
              errors: errors.email,
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <CustomTextField
            label={'Password'}
            isPassword
            placeholder={'Please enter your password.'}
            type="password"
            icon={ICONS.PASSWORD}
            controller={{
              name: 'password',
              control: control,
              errors: errors.password,
            }}
          />
        </Grid>
        <Grid iteem xs={12} sx={{ display: 'flex', justifyContent: 'end', mt: 0.5 }}>
          <Typography variant="h8">
            <Link component={RouterLink} to="/recover-account" underline="hover" sx={{ cursor: 'pointer' }}>
              Forgot password
            </Link>
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <LoaderButton disabled={!isValid} loading={loading} buttonText={'Login'} type="submit" />
        </Grid>
        <Grid item xs={12}>
          <SocialLogin />
        </Grid>
      </Grid>
    </form>
  );
};

export default LoginForm;
