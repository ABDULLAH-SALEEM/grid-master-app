import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ICONS } from 'src/assets/library';
import { signUpSchema } from 'src/config/yup';
import { useNavigate } from 'react-router-dom';
import { Container, Grid } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import CustomTextField from '../formFields/textField';
import LoaderButton from '../common/loaderButton';
import { SIGN_UP } from 'src/apiService/apiDeclaration';
import { OTP_VERIFICATION_MODE, showErrorTost, showSuccessTost } from 'src/constants';

const SignUpForm = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    handleSubmit,
    formState: { errors, isValid },
    control,
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(signUpSchema),
  });

  const userSignUp = async (data) => {
    setLoading(true);
    try {
      const signUp = await SIGN_UP(data);
      alert(`In case you dont recieve otp because of unverified app. This is your otp "${signUp.data.otp}".`);
      showSuccessTost(signUp.message);
      navigate('/otp', { state: { email: data.email, verifcationMode: OTP_VERIFICATION_MODE.NEW_USER } });
    } catch (error) {
      showErrorTost(error.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <form onSubmit={handleSubmit(userSignUp)}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <CustomTextField
              label={'Email'}
              type="email"
              placeholder={'john@mail.com'}
              icon={ICONS.EMAIL}
              controller={{
                name: 'email',
                control: control,
                errors: errors.email,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextField
              label={'First name'}
              icon={ICONS.USER}
              placeholder={'John'}
              type="name"
              controller={{
                name: 'firstName',
                control: control,
                errors: errors.firstName,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextField
              label={'Last name'}
              icon={ICONS.USER}
              placeholder={'Doe'}
              type="name"
              controller={{
                name: 'lastName',
                control: control,
                errors: errors.lastName,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <CustomTextField
              label={'Password'}
              icon={ICONS.PASSWORD}
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
              icon={ICONS.PASSWORD}
              label={'Confirm password'}
              type="password"
              isPassword
              controller={{
                name: 'confirmPassword',
                control: control,
                errors: errors.confirmPassword,
              }}
            />
          </Grid>

          <Grid item xs={12} sx={{ mb: 3 }}>
            <LoaderButton loading={loading} disabled={!isValid} buttonText={'Proceed'} type="submit" />
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default SignUpForm;
