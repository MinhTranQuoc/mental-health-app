import React, { useState } from "react";
import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const EmailLoginForm: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <div className="bg-white py-16 px-4 sm:px-8 lg:px-12 rounded-lg shadow-md w-full max-w-sm sm:max-w-md">
        {/* Back Button */}
        <button onClick={onBack} className="flex items-center mb-6 space-x-2 text-black">
          <span className="text-xl font-bold">{"<"}</span>
          <span className="text-base font-medium">Quay trở lại các tùy chọn đăng nhập</span>
        </button>

        <div className="space-y-6">
          {/* Email Field */}
          <div className="flex flex-col space-y-2">
            <label className="text-lg font-bold text-gray-800">
              Email hoặc tên đăng nhập
            </label>
            <TextField
              variant="outlined"
              placeholder="Email hoặc tên đăng nhập"
              fullWidth
              InputProps={{
                style: {
                  backgroundColor: "#F3F4F6",
                },
              }}
            />
          </div>

          {/* Password Field */}
          <div className="flex flex-col space-y-2">
            <label className="text-lg font-bold text-gray-800">Mật Khẩu</label>
            <TextField
              variant="outlined"
              type={showPassword ? "text" : "password"}
              placeholder="Mật Khẩu"
              fullWidth
              InputProps={{
                style: {
                  backgroundColor: "#F3F4F6",
                },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>

          {/* Submit Button */}
          <Button
            variant="contained"
            fullWidth
            style={{
              height: "48px",
              backgroundColor: "#000",
              color: "#fff",
              borderRadius: "9999px",
              fontSize: "16px",
              fontWeight: "bold",
              textTransform: "none",
            }}
          >
            Đăng nhập
          </Button>
        </div>

        {/* Forgot Password */}
        <div className="text-center mt-6">
          <a href="#" className="text-sm text-gray-600 hover:underline">
            Quên mật khẩu?
          </a>
        </div>
      </div>
    </div>
  );
};

export default EmailLoginForm;
