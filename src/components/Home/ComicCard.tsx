import React from 'react';
import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { NovelResponseDto } from '../../interfaces/NovelResponseDto';

interface ComicCardProps {
  comic: NovelResponseDto;
}

const ComicCard: React.FC<ComicCardProps> = ({ comic }) => {
  return (
    <Card className="relative overflow-hidden h-auto w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
      <CardMedia
        component="img"
        image={comic.img || 'https://minhducpc.vn/uploads/images/hinh-cute01.png'}
        alt={comic.title}
        className="object-cover w-full h-[15rem] sm:h-[25rem]"
      />
      {comic.isHot && (
        <Box className="absolute top-2 right-2 bg-red-500 text-white p-1 text-xs rounded z-10">
          Hot
        </Box>
      )}
      <Box className="absolute top-2 left-2 bg-blue-500 text-white p-1 text-xs rounded z-10">
        {comic.updated}
      </Box>
      <CardContent className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-2 sm:p-4">
        <Box className="flex-1 overflow-hidden">
          <Typography variant="body2" className="truncate font-bold text-base sm:text-lg">
            {comic.title}
          </Typography>
          <Typography variant="body2" className="text-gray-600">
            Chapter {comic.chapter}
          </Typography>
        </Box>
        <Box className="flex-shrink-0 mt-2 sm:mt-0">
          <img
            src={comic.avatar || 'https://cdn-icons-png.flaticon.com/512/6858/6858504.png'}
            alt="avatar"
            className="w-12 h-12 rounded-full object-cover"
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default ComicCard;
