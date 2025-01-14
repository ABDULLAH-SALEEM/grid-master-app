import React from 'react';
import { Box, Container } from '@mui/material';

const Wrapper = ({ children }) => {
  return (
    <Box minHeight={'100svh'}>
      <Container maxWidth="xs">
        <Box display="flex" flexDirection={'column'} justifyContent="center" alignItems="center" minHeight={'94svh'}>
          {children}
        </Box>
      </Container>
    </Box>
  );
};

export default Wrapper;
