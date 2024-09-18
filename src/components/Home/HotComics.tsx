import React, { useEffect, useRef } from 'react';
import { Box, Typography } from '@mui/material';
import { useGetHotNovelsQuery } from '../../service/api/novelApi';
import ComicCard from './ComicCard';
import LoadingSpinner from '../Features/LoadingSpinner';

const HotComics = () => {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const { data: topComics, isLoading, error } = useGetHotNovelsQuery();

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container && topComics) {
      const scrollAmount = 300;
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
  }, [topComics]);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div>Error loading hot novels</div>;

  return (
    <>
      <Typography variant="h5" component="h2" className="text-red-500 font-bold pb-4">
        ⭐ Truyện Hay
      </Typography>
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-hidden md:whitespace-nowrap scroll-smooth"
      >
        {topComics?.map((comic) => (
          <Box
            key={comic.id}
            className="flex-shrink-0 w-40 sm:w-48 md:w-60 lg:w-72 p-2 relative"
          >
            <ComicCard comic={comic} />
          </Box>
        ))}
      </div>
    </>
  );
};

export default HotComics;
