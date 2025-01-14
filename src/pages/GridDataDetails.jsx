import { Grid } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import CardWrapper from 'src/components/common/cardWrapper';
import LoaderButton from 'src/components/common/loaderButton';
import GridDataForm from 'src/components/form/GridDataForm';

const GridDataDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { data, isEdit } = location.state || {};
  return (
    <Grid container spacing={2}>
      <Grid item xs={4} sm={1}>
        <LoaderButton buttonText={'Go Back'} onClick={() => navigate(-1)} color={'warning'} />
      </Grid>
      <Grid item xs={12}>
        <CardWrapper title={isEdit ? 'Edit Details' : 'View Details'}>
          <GridDataForm data={data} isEdit={isEdit} />
        </CardWrapper>
      </Grid>
    </Grid>
  );
};

export default GridDataDetails;
