import React from 'react';
import { Button } from '@mui/material';
import { Facebook, Google } from '@mui/icons-material';

const LoginForm = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <div className="bg-white py-24 px-8 rounded-lg shadow-md w-full max-w-md"> {/* Tăng padding top/bottom để tăng chiều cao */}
        <h2 className="text-xl font-bold mb-10 text-center">Đăng nhập vào Wattpad</h2>

        {/* Form Content with spacing between elements */}
        <div className="space-y-6"> {/* Khoảng cách giữa các nút và các phần tử khác */}
          {/* Google Login Button */}
          <Button
            variant="outlined"
            startIcon={<Google sx={{ color: '#DB4437' }} />} // Màu sắc của icon Google
            fullWidth
            className="normal-case"
            style={{
              justifyContent: 'center',
              height: '56px', // Chiều cao nút
              borderRadius: '9999px', // Bo góc tròn
              borderWidth: '2px',
              borderColor: '#000', // Màu viền đen
              color: '#000', // Màu chữ đen
              fontWeight: 'bold', // Chữ đậm
              fontSize: '16px', // Kích thước chữ to hơn
              textTransform: 'none', // Giữ nguyên chữ cái
            }}
          >
            Đăng nhập bằng tài khoản Google
          </Button>

          {/* Facebook Login Button */}
          <Button
            variant="outlined"
            startIcon={<Facebook sx={{ color: '#1877F2' }} />} // Màu sắc của icon Facebook
            fullWidth
            className="normal-case"
            style={{
              justifyContent: 'center',
              height: '56px', // Chiều cao nút
              borderRadius: '9999px', // Bo góc tròn
              borderWidth: '2px',
              borderColor: '#000', // Màu viền đen
              color: '#000', // Màu chữ đen
              fontWeight: 'bold', // Chữ đậm
              fontSize: '16px', // Kích thước chữ to hơn
              textTransform: 'none', // Giữ nguyên chữ cái
            }}
          >
            Đăng nhập bằng Facebook
          </Button>

          {/* Divider */}
          <div className="flex items-center">
            <hr className="flex-grow border-gray-300" />
            <span className="px-2 text-gray-500 text-sm">or</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          {/* Email Login Button */}
          <Button
            variant="contained"
            fullWidth
            className="bg-black text-white"
            style={{
              height: '56px', // Chiều cao nút
              borderRadius: '9999px', // Bo góc tròn
              backgroundColor: '#000', // Nền đen
              fontWeight: 'bold', // Chữ đậm
              fontSize: '16px', // Kích thước chữ to hơn
              textTransform: 'none', // Giữ nguyên chữ cái
            }}
          >
            Đăng nhập với email
          </Button>
        </div>

        {/* Forgot Password */}
        <div className="text-center my-8">
          <a href="#" className="text-sm text-gray-600 hover:underline">Quên mật khẩu?</a>
        </div>

        {/* Sign Up Button */}
        <div className="text-center">
          <Button
            href="#" // Đường dẫn đến trang đăng ký
            variant="outlined"
            fullWidth
            className="normal-case"
            style={{
              height: '56px', // Chiều cao nút
              borderRadius: '9999px', // Bo góc tròn
              borderWidth: '2px',
              borderColor: '#ffffff', // Màu viền đen
              color: '#000', // Màu chữ đen
              fontWeight: 'bold', // Chữ đậm
              fontSize: '16px', // Kích thước chữ to hơn
              textTransform: 'none', // Giữ nguyên chữ cái
            }}
          >
            Bạn không có tài khoản? Hãy đăng ký
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
