import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useGoogleLogin } from '@react-oauth/google';
import { Button, Grid, Stack, Typography } from '@mui/material';
import { storeData } from 'src/helper/storageHelper';
import { constants, showErrorTost, showSuccessTost } from 'src/constants';
import { SOCIAL_LOGIN } from 'src/apiService/apiDeclaration';
import { setToken } from 'src/redux/features/auth/slice';
import { IMAGES } from 'src/assets/library';

const SocialLogin = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState();
  const onGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      await onSocialLogin(tokenResponse);
    },
  });

  const onSocialLogin = async (tokenResponse) => {
    setLoading(true);
    try {
      const resp = await SOCIAL_LOGIN(tokenResponse);
      dispatch(setToken(resp.data.token));
      storeData(constants.authToken, resp.data.token);
      showSuccessTost(resp.message);
    } catch (error) {
      showErrorTost(error.message);
    } finally {
      setLoading(false);
    }
  };

  const platform = [
    {
      icon: <img src={IMAGES.google} width={25} height={25} alt="google" />,
      title: 'google',
      onClick: onGoogleLogin,
    },
  ];
  return (
    <Stack gap={3}>
      <Typography variant="body2" textAlign={'center'} color={'#b4b4b7'}>
        OR
      </Typography>
      <Grid>
        {platform.map(({ icon, title, color, onClick }, index) => (
          <Button
            disabled={loading}
            key={index}
            fullWidth
            size="small"
            variant="outlined"
            onClick={onClick}
            sx={{
              backgroundColor: color,
              '&:hover': {
                backgroundColor: color,
              },
            }}
            startIcon={icon}
          >
            {title}
          </Button>
        ))}
      </Grid>
    </Stack>
  );
};

export default SocialLogin;
