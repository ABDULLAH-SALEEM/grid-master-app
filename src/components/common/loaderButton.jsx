import { Button, Grid, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

const LoaderButton = ({ loading, onClick, buttonText, disabled = false, ...props }) => {
  return (
    <Button fullWidth onClick={onClick} variant="contained" size="small" disabled={disabled || loading} {...props}>
      <Grid
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: 1,
          alignItems: 'center',
        }}
      >
        {loading && <CircularProgress sx={{ color: '#ACD629' }} size={20} />}
        <Typography>{buttonText}</Typography>
      </Grid>
    </Button>
  );
};

export default LoaderButton;
