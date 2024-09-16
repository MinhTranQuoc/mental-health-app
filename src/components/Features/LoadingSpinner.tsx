import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

const LoadingSpinner = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh', // Chiều cao toàn trang
      }}
    >
      <CircularProgress />
      <Typography sx={{ marginTop: 2 }} variant="body2" color="textSecondary">
        Đang tải...
      </Typography>
    </Box>
  );
};

export default LoadingSpinner;
