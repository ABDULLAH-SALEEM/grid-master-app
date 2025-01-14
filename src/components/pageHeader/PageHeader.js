import { Grid, Stack, Typography, Button } from '@mui/material';

const PageHeader = ({ pageTitle, onButtonClick, buttonTitle, children }) => {
  return (
    <Stack direction={'row'} flexWrap={'wrap'} justifyContent={'space-between'}>
      <Typography variant="h4" color={'primary'}>
        {pageTitle}
      </Typography>
      {buttonTitle && (
        <Grid>
          <Button variant="contained" onClick={onButtonClick}>
            {buttonTitle}
          </Button>
        </Grid>
      )}
      {children}
    </Stack>
  );
};

export default PageHeader;
