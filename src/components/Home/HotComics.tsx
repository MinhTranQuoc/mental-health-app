import React, { useEffect, useRef } from 'react';
import { Box, Typography } from '@mui/material';
import { useGetHotNovelsQuery } from '../../service/api/novelApi'; // Đường dẫn đến novelApi của bạn
import ComicCard from './ComicCard'; // Import the new ComicCard component
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
        {topComics?.map((comic) => (
          <Box
            key={comic.id}
            sx={{ flex: '0 0 auto', width: '20%', padding: '8px', position: 'relative' }}
          >
            <ComicCard comic={comic} />
          </Box>
        ))}
      </div>
    </>
  );
};

export default HotComics;
