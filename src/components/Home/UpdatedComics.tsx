import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import Masonry from '@mui/lab/Masonry';
import { AiOutlineFilter } from 'react-icons/ai';
import Pagination from '@mui/material/Pagination';
import { useGetAllNovelsQuery } from '../../service/api/novelApi'; // Import the query hook
import ComicCard from './ComicCard'; // Import the new ComicCard component

const UpdatedComics = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 25;

  // Fetch data from the API
  const { data, error, isLoading } = useGetAllNovelsQuery({ page: currentPage - 1, size: itemsPerPage });

  // Handle pagination change
  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  if (isLoading) return <Typography>Loading...</Typography>;

  // Error handling
  let errorMessage = 'An unexpected error occurred.';
  if (error) {
    if ('status' in error && 'data' in error) {
      errorMessage = (error as any).data?.message || errorMessage;
    } else if ('message' in error) {
      errorMessage = (error as { message: string }).message;
    }
  }

  if (error) return <Typography>Error: {errorMessage}</Typography>;

  const paginatedComics = data?.content || []; // Use data from API query
  const totalItems = data?.totalElements || 0; // Total number of items for pagination

  return (
    <>
      <Box display="flex" justifyContent="space-between" alignItems="center" paddingBottom="16px" paddingTop="16px">
        <Typography variant="h5" component="h2" sx={{ color: 'blue', fontWeight: 'bold' }}>
          🌐 Truyện Mới Cập Nhật
        </Typography>
        <Button variant="outlined" startIcon={<AiOutlineFilter />} sx={{ color: 'orange', borderColor: 'orange' }}>
          Filter
        </Button>
      </Box>
      <Masonry columns={5} spacing={2} sx={{ marginLeft: '2px' }}>
        {paginatedComics.map((comic) => (
          <ComicCard key={comic.id} comic={comic} />
        ))}
      </Masonry>

      <Box display="flex" justifyContent="center" marginTop="16px">
        <Pagination
          count={Math.ceil(totalItems / itemsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
        />
      </Box>
    </>
  );
};

export default UpdatedComics;
