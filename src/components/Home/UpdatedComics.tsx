import React, { useState } from 'react';
import { Box, Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import Masonry from '@mui/lab/Masonry';
import { AiOutlineFilter } from 'react-icons/ai';
import Pagination from '@mui/material/Pagination';
import { useGetAllNovelsQuery } from '../../service/api/novelApi'; // Import the query hook

const avatarUrl = 'https://cdn-icons-png.flaticon.com/512/6858/6858504.png';

const UpdatedComics = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

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
      <Masonry columns={5} spacing={2} sx={{marginLeft: '2px'}}>
        {paginatedComics.map((comic, index) => (
          <Card key={index} sx={{ position: 'relative', overflow: 'hidden'}}>
            <CardMedia
              component="img"
              height="180"
              image={comic.img || 'https://minhducpc.vn/uploads/images/hinh-cute01.png'}
              alt={comic.title}
              sx={{ objectFit: 'cover', width: '100%', height: '25rem' }} // Ensure images fit the container
            />
            {comic.isHot && (
              <Box sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                backgroundColor: 'red',
                color: 'white',
                padding: '4px 8px',
                fontSize: '0.75rem',
                borderRadius: '4px',
                zIndex: 10,
              }}>
                Hot
              </Box>
            )}
            <Box sx={{
              position: 'absolute',
              top: 8,
              left: 8,
              backgroundColor: 'blue',
              color: 'white',
              padding: '4px 8px',
              fontSize: '0.75rem',
              borderRadius: '4px',
              zIndex: 10,
            }}>
              {comic.updated}
            </Box>
            <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                <Typography variant="body2" sx={{
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  fontWeight: 'bold',
                  fontSize: "18px",
                }}>
                  {comic.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Chapter {comic.chapter}
                </Typography>
              </Box>
              <Box sx={{ flexShrink: 0 }}>
                <img
                  src={comic.avatar || avatarUrl}
                  alt="avatar"
                  style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                  }}
                />
              </Box>
            </CardContent>
          </Card>
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
