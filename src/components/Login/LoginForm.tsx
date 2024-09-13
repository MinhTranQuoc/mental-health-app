// File LoginForm.tsx
import React from 'react';
import { Button } from '@mui/material';
import { Facebook } from '@mui/icons-material';
import GoogleLoginButton from './GoogleLoginButton';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

interface GoogleProfile {
  token: string;
  name: string;
  picture: string;
}

const LoginForm: React.FC = () => {
  const navigate = useNavigate(); // Khởi tạo useNavigate

  // Hàm lấy thông tin profile từ Google API
  const fetchGoogleProfile = async (token: string) => {
    try {
      const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Failed to fetch Google profile:', error);
      return null;
    }
  };

  // Hàm xử lý khi đăng nhập Google thành công
  const handleGoogleSuccess = async (response: any) => {
    console.log('Google login successful:', response);

    const token = response.access_token;
    console.log('Google access token:', token);

    const profileData = await fetchGoogleProfile(token);

    if (profileData) {
      const profile: GoogleProfile = {
        token: token,
        name: profileData.name,
        picture: profileData.picture,
      };

      // Lưu thông tin vào localStorage
      localStorage.setItem('token', profile.token);
      localStorage.setItem('name', profile.name);
      localStorage.setItem('avatar', profile.picture);
      localStorage.setItem('isLoggedIn', 'true');
      navigate('/');
    }
  };

  // Hàm xử lý khi đăng nhập Google gặp lỗi
  const handleGoogleError = () => {
    console.error('Google login error');
    // Xử lý lỗi đăng nhập Google ở đây
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <div className="bg-white py-24 px-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-10 text-center">Đăng nhập vào Wattpad</h2>

        <div className="space-y-6">
          {/* Nút Đăng Nhập Google */}
          <GoogleLoginButton 
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
          />

          {/* Nút Đăng Nhập Facebook */}
          <Button
            variant="outlined"
            startIcon={<Facebook sx={{ color: '#1877F2' }} />}
            fullWidth
            className="normal-case"
            style={{
              justifyContent: 'center',
              height: '56px',
              borderRadius: '9999px',
              borderWidth: '2px',
              borderColor: '#000',
              color: '#000',
              fontWeight: 'bold',
              fontSize: '16px',
              textTransform: 'none',
            }}
          >
            Đăng nhập bằng Facebook
          </Button>

          {/* Phân cách */}
          <div className="flex items-center">
            <hr className="flex-grow border-gray-300" />
            <span className="px-2 text-gray-500 text-sm">or</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          {/* Nút Đăng Nhập Email */}
          <Button
            variant="contained"
            fullWidth
            className="bg-black text-white"
            style={{
              height: '56px',
              borderRadius: '9999px',
              backgroundColor: '#000',
              fontWeight: 'bold',
              fontSize: '16px',
              textTransform: 'none',
            }}
          >
            Đăng nhập với email
          </Button>
        </div>

        {/* Quên Mật Khẩu */}
        <div className="text-center my-8">
          <a href="#" className="text-sm text-gray-600 hover:underline">Quên mật khẩu?</a>
        </div>

        {/* Nút Đăng Ký */}
        <div className="text-center">
          <Button
            href="#"
            variant="outlined"
            fullWidth
            className="normal-case"
            style={{
              height: '56px',
              borderRadius: '9999px',
              borderWidth: '2px',
              borderColor: '#ffffff',
              color: '#000',
              fontWeight: 'bold',
              fontSize: '16px',
              textTransform: 'none',
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
