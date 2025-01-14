import { Grid } from '@mui/material';
import CardWrapper from 'src/components/common/cardWrapper';
import ProfileForm from 'src/components/form/profileForm';
import PageHeader from 'src/components/pageHeader/PageHeader';
import TabTitle from 'src/components/tabTitle/tabTitle';

const Profile = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TabTitle title={'Profile'} />
        <PageHeader pageTitle={'Profile'} />
      </Grid>
      <Grid item xs={12}>
        <CardWrapper>
          <ProfileForm />
        </CardWrapper>
      </Grid>
    </Grid>
  );
};

export default Profile;
