import { Card, Typography } from '@mui/material';

const CardWrapper = ({ children, title }) => {
  return (
    <Card sx={{ p: 2 }}>
      {title && (
        <Typography mb={0.5} variant="h5">
          {title}
        </Typography>
      )}
      {children}
    </Card>
  );
};

export default CardWrapper;
