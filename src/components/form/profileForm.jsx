import { Grid } from '@mui/material';
import CustomTextField from '../formFields/textField';
import { useSelector } from 'react-redux';

const ProfileForm = () => {
  const { user } = useSelector((state) => state.auth);

  console.log(user);
  return (
    <Grid container spacing={2.5}>
      {Object.keys(user).map((field, index) => (
        <Grid key={index} item xs={12} md={4}>
          <CustomTextField label={field.toUpperCase()} value={user[field]} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ProfileForm;
