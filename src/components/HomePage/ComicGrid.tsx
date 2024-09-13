import React, { useEffect, useRef, useState } from 'react';
import { Box, Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import Masonry from '@mui/lab/Masonry';
import { AiOutlineFilter } from 'react-icons/ai';
import Pagination from '@mui/material/Pagination';

const topComics = [
    { title: 'One Piece', chapter: 1125, updated: '3 Ngày Trước', isHot: true },
  { title: 'Ngự Linh Thế Giới', chapter: 847, updated: '4 Ngày Trước', isHot: true },
  { title: 'Onepunch Man', chapter: 258, updated: '7 Ngày Trước', isHot: true },
  { title: 'Attack on Titan', chapter: 140, updated: '1 Ngày Trước', isHot: true },
  { title: 'Dragon Ball', chapter: 325, updated: '2 Ngày Trước', isHot: true },
  { title: 'Naruto', chapter: 701, updated: '5 Ngày Trước', isHot: true },
  { title: 'Bleach', chapter: 686, updated: '6 Ngày Trước', isHot: true },
  // Your top comics data here
];

const updatedComics = [
    { title: 'Centuria', chapter: 22, updated: '5 Giờ Trước', isHot: true },
  { title: 'Noa-Senpai Wa Tomodachi', chapter: 32, updated: '6 Giờ Trước', isHot: true },
  { title: 'Centuria', chapter: 22, updated: '5 Giờ Trước', isHot: true },
  { title: 'Noa-Senpai Wa Tomodachi', chapter: 32, updated: '6 Giờ Trước', isHot: true },
  { title: 'Centuria', chapter: 22, updated: '5 Giờ Trước', isHot: true },
  { title: 'Noa-Senpai Wa Tomodachi', chapter: 32, updated: '6 Giờ Trước', isHot: true },
  { title: 'Centuria', chapter: 22, updated: '5 Giờ Trước', isHot: true },
  { title: 'Noa-Senpai Wa Tomodachi', chapter: 32, updated: '6 Giờ Trước', isHot: true },
  { title: 'Centuria', chapter: 22, updated: '5 Giờ Trước', isHot: true },
  { title: 'Noa-Senpai Wa Tomodachi', chapter: 32, updated: '6 Giờ Trước', isHot: true },
  { title: 'Centuria', chapter: 22, updated: '5 Giờ Trước', isHot: true },
  { title: 'Noa-Senpai Wa Tomodachi', chapter: 32, updated: '6 Giờ Trước', isHot: true },
  { title: 'Centuria', chapter: 22, updated: '5 Giờ Trước', isHot: true },
  { title: 'Noa-Senpai Wa Tomodachi', chapter: 32, updated: '6 Giờ Trước', isHot: true },
  { title: 'Centuria', chapter: 22, updated: '5 Giờ Trước', isHot: true },
  { title: 'Noa-Senpai Wa Tomodachi', chapter: 32, updated: '6 Giờ Trước', isHot: true },
  // Your updated comics data here
];

const ComicGrid = () => {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = 255; // Amount of scroll per frame
      const intervalDelay = 4000; 

      const content = container.innerHTML;
      container.innerHTML = `${content}${content}`;

      const scrollWidth = container.scrollWidth / 2;
      let scrollLeft = 0;

      const scrollInterval = setInterval(() => {
        scrollLeft += scrollAmount;
        if (scrollLeft >= scrollWidth) {
          scrollLeft = 0;
        }
        container.scrollLeft = scrollLeft;
      }, intervalDelay);

      return () => clearInterval(scrollInterval);
    }
  }, []);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  const paginatedComics = updatedComics.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div style={{ width: '70%', margin: '0 auto', padding: '16px' }}>
      {/* First Map: Truyện Hay */}
      <Typography variant="h5" component="h2" className="text-red-500 font-bold pb-4">
        ⭐ Truyện Hay
      </Typography>
      <div
        ref={scrollContainerRef}
        style={{
          display: 'flex',
          overflowX: 'hidden',
          whiteSpace: 'nowrap',
          scrollBehavior: 'smooth',
          width: '100%',
        }}
        className="scroll-container"
      >
        {topComics.map((comic, index) => (
          <Box
            key={index}
            sx={{ flex: '0 0 auto', width: '20%', padding: '8px', position: 'relative' }}
          >
            <Card sx={{ position: 'relative', height: 'auto' }}>
              <CardMedia
                component="img"
                height="200"
                image={`https://minhducpc.vn/uploads/images/hinh-cute01.png`} // Replace with actual image source
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
              <CardContent>
                <Typography variant="body2" className="font-bold">
                  {comic.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Chương {comic.chapter}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        ))}
      </div>

      {/* Second Map: Truyện Mới Cập Nhật */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '16px', paddingTop:'16px' }}>
        <Typography variant="h5" component="h2" className="text-blue-500 font-bold">
          🌐 Truyện Mới Cập Nhật
        </Typography>
        <Button variant="outlined" startIcon={<AiOutlineFilter />} sx={{ color: 'orange', borderColor: 'orange' }}>
          Filter
        </Button>
      </div>
      <Masonry columns={5} spacing={2}>
        {paginatedComics.map((comic, index) => (
          <Card key={index} sx={{ position: 'relative' }}>
            <CardMedia
              component="img"
              height="200"
              image={`https://minhducpc.vn/uploads/images/hinh-cute01.png`} // Replace with actual image source
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
            <CardContent>
              <Typography variant="body2" className="font-bold">
                {comic.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Chapter {comic.chapter}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Masonry>

      {/* Pagination Controls */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
        <Pagination
          count={Math.ceil(updatedComics.length / itemsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          siblingCount={1}
          boundaryCount={1}
          shape="rounded"
          color="primary"
        />
      </div>
    </div>
  );
};

export default ComicGrid;
