import React from "react";
import { Button } from "@mui/material";
import { Facebook, Google } from "@mui/icons-material";

interface RegisterFormProps {
  onBack: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onBack }) => {
    return (
        <div className="flex justify-center items-center h-screen bg-gray-50">
          <div className="bg-white py-16 px-4 sm:px-8 lg:px-12 rounded-lg shadow-md w-full max-w-sm sm:max-w-md">
            <h2 className="text-xl font-bold mb-6 text-center">
              Hãy đăng ký để tham gia vào cộng đồng sáng tác truyện quy mô nhất
            </h2>
    
            <div className="space-y-4 sm:space-y-6">
              {/* Đăng ký với Google */}
              <Button
                variant="outlined"
                startIcon={<Google sx={{ color: "#DB4437" }} />}
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
                Đăng ký bằng tài khoản Google
              </Button>
    
              {/* Đăng ký với Facebook */}
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
                Đăng ký qua Facebook
              </Button>
    
              <div className="flex items-center">
                <hr className="flex-grow border-gray-300" />
                <span className="px-2 text-gray-500 text-sm">or</span>
                <hr className="flex-grow border-gray-300" />
              </div>
    
              {/* Đăng ký bằng email */}
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
              >
                Đăng ký bằng email
              </Button>
            </div>
    
            <div className="text-center my-6">
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
            onClick={onBack} // Toggle to show register form
          >
            Tôi đã có tài khoản
          </Button>
        </div>
          </div>
        </div>
      );
};

export default RegisterForm;
