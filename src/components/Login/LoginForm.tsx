import React, { useState } from "react";
import { Button } from "@mui/material";
import { Facebook } from "@mui/icons-material";
import GoogleLoginButton from "./GoogleLoginButton";
import EmailLoginForm from "./EmailLoginForm";
import RegisterForm from "../Register/RegisterForm"; // Import RegisterForm

interface GoogleProfile {
  token: string;
  name: string;
  picture: string;
}

const LoginForm: React.FC = () => {
  const [showEmailForm, setShowEmailForm] = useState(false); // State to toggle email form
  const [showRegisterForm, setShowRegisterForm] = useState(false); // State to toggle register form

  // Hàm lấy thông tin profile từ Google API
  const fetchGoogleProfile = async (token: string) => {
    try {
      const response = await fetch(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Failed to fetch Google profile:", error);
      return null;
    }
  };

  // Hàm xử lý khi đăng nhập Google thành công
  const handleGoogleSuccess = async (response: any) => {
    console.log("Google login successful:", response);
    const token = response.access_token;
    const profileData = await fetchGoogleProfile(token);

    if (profileData) {
      const profile: GoogleProfile = {
        token: token,
        name: profileData.name,
        picture: profileData.picture,
      };

      localStorage.setItem("token", profile.token);
      localStorage.setItem("name", profile.name);
      localStorage.setItem("avatar", profile.picture);
      localStorage.setItem("isLoggedIn", "true");
      // navigate to home page
    }
  };

  // Hàm xử lý khi đăng nhập Google gặp lỗi
  const handleGoogleError = () => {
    console.error("Google login error");
  };

  // Nếu form đăng nhập email đang được hiển thị, trả về component EmailLoginForm
  if (showEmailForm) {
    return <EmailLoginForm onBack={() => setShowEmailForm(false)} />;
  }

  // Nếu form đăng ký đang được hiển thị, trả về component RegisterForm
  if (showRegisterForm) {
    return <RegisterForm onBackToLogin={() => setShowRegisterForm(false)} />;
  }

  return (
    <div className="flex justify-center items-center">
      <div className="bg-white py-16 px-4 sm:px-8 lg:px-12 w-full max-w-sm sm:max-w-md">
        <h2 className="text-4xl font-bold mb-6 text-center">
          Đăng nhập vào Mental Health
        </h2>

        <div className="space-y-4 sm:space-y-6">
          {/* Google Login */}
          <GoogleLoginButton
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
          />

          {/* Facebook Login */}
          <Button
            variant="outlined"
            startIcon={<Facebook sx={{ color: "#1877F2" }} />}
            fullWidth
            className="normal-case"
            style={{
              justifyContent: "center",
              height: "48px",
              borderRadius: "9999px",
              borderWidth: "2px",
              borderColor: "#000",
              color: "#000",
              fontWeight: "bold",
              fontSize: "16px",
              textTransform: "none",
            }}
          >
            Đăng nhập bằng Facebook
          </Button>

          <div className="flex items-center">
            <hr className="flex-grow border-gray-300" />
            <span className="px-2 text-gray-500 text-sm">hoặc</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          {/* Email Login Button */}
          <Button
            variant="contained"
            fullWidth
            className="bg-black text-white"
            style={{
              height: "48px",
              borderRadius: "9999px",
              backgroundColor: "#000",
              fontWeight: "bold",
              fontSize: "16px",
              textTransform: "none",
            }}
            onClick={() => setShowEmailForm(true)} // Toggle to show email form
          >
            Đăng nhập với email
          </Button>
        </div>

        <div className="text-center my-6">
          <a href="#" className="text-sm text-gray-600 hover:underline">
            Quên mật khẩu?
          </a>
        </div>

        <div className="text-center">
          {/* Button to toggle RegisterForm */}
          <Button
            variant="outlined"
            fullWidth
            className="normal-case"
            style={{
              height: "48px",
              borderRadius: "9999px",
              borderWidth: "2px",
              borderColor: "#ffffff",
              color: "#000",
              fontWeight: "bold",
              fontSize: "16px",
              textTransform: "none",
            }}
            onClick={() => setShowRegisterForm(true)} // Toggle to show register form
          >
            Bạn không có tài khoản? Hãy đăng ký
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
