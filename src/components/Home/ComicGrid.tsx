import React, { useEffect, useRef, useState } from 'react';
import { Box, Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import Masonry from '@mui/lab/Masonry';
import { AiOutlineFilter } from 'react-icons/ai';
import Pagination from '@mui/material/Pagination';

const avatarUrl = 'https://cdn-icons-png.flaticon.com/512/6858/6858504.png';

// Dữ liệu các truyện hot
const topComics = [
  { title: 'One Pieceeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', chapter: 1125, updated: '3 Ngày Trước', isHot: true, avatar: avatarUrl },
  { title: 'Ngự Linh Thế Giới', chapter: 847, updated: '4 Ngày Trước', isHot: true, avatar: avatarUrl },
  // Thêm nhiều truyện hot ở đây...
];

// Dữ liệu các truyện mới cập nhật
const updatedComics = [
  { title: 'Centuria', chapter: 22, updated: '5 Giờ Trước', isHot: true, avatar: avatarUrl },
  { title: 'Noa-Senpai Wa Tomodachi', chapter: 32, updated: '6 Giờ Trước', isHot: true, avatar: avatarUrl },
  // Thêm nhiều truyện mới cập nhật ở đây...
];

const ComicGrid = () => {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null); // Tham chiếu đến phần tử chứa danh sách truyện
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const itemsPerPage = 25; // Số lượng truyện hiển thị trên mỗi trang

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = 280; // Số pixel di chuyển mỗi lần
      const intervalDelay = 5000; // Thời gian giữa các lần cuộn (5 giây)

      // Sao chép nội dung để tạo hiệu ứng cuộn liên tục
      const content = container.innerHTML;
      container.innerHTML = `${content}${content}`;

      const scrollWidth = container.scrollWidth / 2; // Chiều rộng tổng cộng của nội dung
      let scrollLeft = 0;

      // Hàm cuộn liên tục
      const scrollInterval = setInterval(() => {
        scrollLeft += scrollAmount;
        if (scrollLeft >= scrollWidth) {
          scrollLeft = 0;
        }
        container.scrollLeft = scrollLeft;
      }, intervalDelay);

      // Dọn dẹp khi component bị hủy
      return () => clearInterval(scrollInterval);
    }
  }, []);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value); // Cập nhật trang hiện tại khi người dùng thay đổi
  };

  // Phân trang các truyện mới cập nhật
  const paginatedComics = updatedComics.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div style={{ width: '70%', margin: '0 auto', padding: '16px' }}>
      {/* Phần danh sách truyện hot */}
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
                {/* Avatar của người đăng */}
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

      {/* Phần danh sách truyện mới cập nhật */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '16px', paddingTop: '16px' }}>
        <Typography variant="h5" component="h2" sx={{ color: 'blue', fontWeight: 'bold' }}>
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
              {/* Avatar của người đăng */}
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

      {/* Điều khiển phân trang */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
        <Pagination
          count={Math.ceil(updatedComics.length / itemsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </div>
    </div>
  );
};

export default ComicGrid;
