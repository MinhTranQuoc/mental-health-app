import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import Masonry from '@mui/lab/Masonry';
import { AiOutlineFilter } from 'react-icons/ai';
import Pagination from '@mui/material/Pagination';
import { useGetAllNovelsQuery } from '../../service/api/novelApi';
import ComicCard from './ComicCard';

const UpdatedComics = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 25;

  const { data, error, isLoading } = useGetAllNovelsQuery({ page: currentPage - 1, size: itemsPerPage });

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  if (isLoading) return <Typography>Loading...</Typography>;

  let errorMessage = 'An unexpected error occurred.';
  if (error) {
    if ('status' in error && 'data' in error) {
      errorMessage = (error as any).data?.message || errorMessage;
    } else if ('message' in error) {
      errorMessage = (error as { message: string }).message;
    }
  }

  if (error) return <Typography>Error: {errorMessage}</Typography>;

  const paginatedComics = data?.content || [];
  const totalItems = data?.totalElements || 0;

  return (
    <>
      <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems="center" pb={4} pt={4}>
        <Typography variant="h5" component="h2" className="text-blue-500 font-bold">
          🌐 Truyện Mới Cập Nhật
        </Typography>
        <Button variant="outlined" startIcon={<AiOutlineFilter />} className="text-orange-500 border-orange-500">
          Filter
        </Button>
      </Box>
      <Masonry columns={{ xs: 2, sm: 3, md: 4, lg: 5 }} spacing={2}>
        {paginatedComics.map((comic) => (
          <ComicCard key={comic.id} comic={comic} />
        ))}
      </Masonry>

      <Box display="flex" justifyContent="center" mt={4}>
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
