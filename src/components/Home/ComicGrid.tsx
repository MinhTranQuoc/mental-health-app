import React from 'react';
import { Container, Box } from '@mui/material';
import HotComics from './HotComics';
import UpdatedComics from './UpdatedComics';

const ComicGrid: React.FC = () => {
  return (
    <Container sx={{ width: '75%', margin: '0 auto', padding: '16px' }} maxWidth={false}>
      <Box >
        <HotComics />
      </Box>
      <Box>
        <UpdatedComics />
      </Box>
    </Container>
  );
};

export default ComicGrid;
