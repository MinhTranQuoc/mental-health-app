import React, { useEffect, useRef } from 'react';
import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { useGetHotNovelsQuery } from '../../service/api/novelApi'; // Đường dẫn đến novelApi của bạn
import LoadingSpinner from '../Features/LoadingSpinner'; // Giả sử bạn có component loading

const HotComics = () => {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const { data: topComics, isLoading, error } = useGetHotNovelsQuery();

  useEffect(() => {
    console.log(topComics); // Kiểm tra dữ liệu trả về từ API

    const container = scrollContainerRef.current;
    if (container && topComics) {
      const scrollAmount = 300;
      const intervalDelay = 5000;

      const content = container.innerHTML;
      container.innerHTML = `${content}${content}`; // Nhân đôi nội dung để cuộn

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
  }, [topComics]);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div>Error loading hot novels</div>;

  return (
    <>
      <Typography variant="h5" component="h2" sx={{ color: 'red', fontWeight: 'bold', paddingBottom: '16px' }}>
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
        {topComics?.map((comic, index) => (
          <Box
            key={index}
            sx={{ flex: '0 0 auto', width: '20%', padding: '8px', position: 'relative' }}
          >
            <Card sx={{ position: 'relative', height: 'auto' }}>
              <CardMedia
                component="img"
                height="200"
                image={comic.img} // URL của ảnh
                alt={comic.title}
                sx={{ objectFit: 'cover', width: '100%', height: '25rem' }}
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
                    Chương {comic.chapter}
                  </Typography>
                </Box>
                <Box sx={{ flexShrink: 0 }}>
                  <img
                    src={comic.avatar}
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
          </Box>
        ))}
      </div>
    </>
  );
};

export default HotComics;
