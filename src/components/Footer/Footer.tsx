import React from 'react';
import { Box, Typography, Link, Container, Stack, IconButton } from '@mui/material';
import { Facebook, Twitter, Instagram, YouTube } from '@mui/icons-material';

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#F58120', // Màu cam
        color: '#fff',
        padding: '40px 20px',
        marginTop: 'auto',
      }}
    >
      <Container>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={4}>
          {/* Cột thông tin liên hệ */}
          <Box flex={1}>
            <Typography variant="h6" gutterBottom>
              Liên hệ
            </Typography>
            <Typography variant="body1">
              Web Đọc Truyện
            </Typography>
            <Typography variant="body2">
              Email: contact@webdoctruyen.com
            </Typography>
            <Typography variant="body2">
              Điện thoại: +84 123 456 789
            </Typography>
          </Box>

          {/* Cột liên kết */}
          <Box flex={1}>
            <Typography variant="h6" gutterBottom>
              Liên kết quan trọng
            </Typography>
            <Link href="#" color="inherit" underline="hover" sx={{ display: 'block', mb: 1 }}>
              Điều khoản dịch vụ
            </Link>
            <Link href="#" color="inherit" underline="hover" sx={{ display: 'block', mb: 1 }}>
              Chính sách bảo mật
            </Link>
            <Link href="#" color="inherit" underline="hover" sx={{ display: 'block', mb: 1 }}>
              Về chúng tôi
            </Link>
          </Box>

          {/* Cột mạng xã hội */}
          <Box flex={1}>
            <Typography variant="h6" gutterBottom>
              Theo dõi chúng tôi
            </Typography>
            <Stack direction="row" spacing={1}>
              <IconButton href="#" color="inherit">
                <Facebook />
              </IconButton>
              <IconButton href="#" color="inherit">
                <Twitter />
              </IconButton>
              <IconButton href="#" color="inherit">
                <Instagram />
              </IconButton>
              <IconButton href="#" color="inherit">
                <YouTube />
              </IconButton>
            </Stack>
          </Box>
        </Stack>

        {/* Phần bản quyền */}
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="body2">
            © 2024 Web Đọc Truyện. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
