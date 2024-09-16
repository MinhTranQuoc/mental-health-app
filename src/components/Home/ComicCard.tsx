import React from 'react';
import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { NovelResponseDto } from '../../interfaces/NovelResponseDto '; // Đảm bảo đường dẫn đúng với nơi bạn định nghĩa NovelResponseDto

interface ComicCardProps {
  comic: NovelResponseDto;
}

const ComicCard: React.FC<ComicCardProps> = ({ comic }) => {
  return (
    <Card sx={{ position: 'relative', overflow: 'hidden', height: 'auto' }}>
      <CardMedia
        component="img"
        height="200"
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
            src={comic.avatar || 'https://cdn-icons-png.flaticon.com/512/6858/6858504.png'}
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
  );
};

export default ComicCard;
