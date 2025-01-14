import { CircularProgress } from '@mui/material';

const CustomLoader = () => {
  return (
    <div style={{ height: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <CircularProgress />
    </div>
  );
};

export default CustomLoader;
