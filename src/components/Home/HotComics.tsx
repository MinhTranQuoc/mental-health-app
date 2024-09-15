import React, { useEffect, useRef } from 'react';
import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';

const avatarUrl = 'https://cdn-icons-png.flaticon.com/512/6858/6858504.png';

const topComics = [
  { title: 'One Pieceeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', chapter: 1125, updated: '3 Ngày Trước', isHot: true, avatar: avatarUrl,img:"https://img.wattpad.com/cover/186401212-256-k923164.jpg" },
  { title: 'Ngự Linh Thế Giới', chapter: 847, updated: '4 Ngày Trước', isHot: true, avatar: avatarUrl, img:"https://img.wattpad.com/cover/194458604-256-k678602.jpg" },
  // Thêm nhiều truyện hot ở đây...
];

const HotComics = () => {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = 280;
      const intervalDelay = 5000;

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
        {topComics.map((comic, index) => (
          <Box
            key={index}
            sx={{ flex: '0 0 auto', width: '20%', padding: '8px', position: 'relative' }}
          >
            <Card sx={{ position: 'relative', height: 'auto' }}>
              <CardMedia
                component="img"
                height="200"
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
                    Chương {comic.chapter}
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
          </Box>
        ))}
      </div>
    </>
  );
};

export default HotComics;
