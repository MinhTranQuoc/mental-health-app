import React, { useState } from 'react';
import { Box, Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import Masonry from '@mui/lab/Masonry';
import { AiOutlineFilter } from 'react-icons/ai';
import Pagination from '@mui/material/Pagination';

const avatarUrl = 'https://cdn-icons-png.flaticon.com/512/6858/6858504.png';

const updatedComics = [
  { title: 'Centuria', chapter: 22, updated: '5 Giờ Trước', isHot: true, avatar: avatarUrl },
  { title: 'Noa-Senpai Wa Tomodachi', chapter: 32, updated: '6 Giờ Trước', isHot: true, avatar: avatarUrl },
  { title: 'Centuria', chapter: 22, updated: '5 Giờ Trước', isHot: true, avatar: avatarUrl },
  { title: 'Noa-Senpai Wa Tomodachi', chapter: 32, updated: '6 Giờ Trước', isHot: true, avatar: avatarUrl },
  // Thêm nhiều truyện mới cập nhật ở đây...
];

const UpdatedComics = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 25;

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  const paginatedComics = updatedComics.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

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
      <Masonry columns={5} spacing={2}>
        {paginatedComics.map((comic, index) => (
          <Card key={index} sx={{ position: 'relative' }}>
            <CardMedia
              component="img"
              height="180"
              image={`https://minhducpc.vn/uploads/images/hinh-cute01.png`} // Thay thế bằng nguồn hình ảnh thực tế
              alt={comic.title}
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
                }}>
                  {comic.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Chapter {comic.chapter}
                </Typography>
              </Box>
              <Box sx={{ flexShrink: 0 }}>
                <img
                  src={comic.avatar}
                  alt="avatar"
                  style={{
                    width: '40px',
                    height: '40px',
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
          count={Math.ceil(updatedComics.length / itemsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
        />
      </Box>
    </>
  );
};

export default UpdatedComics;
