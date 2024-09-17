import React, { useState } from "react";
import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useLoginMutation } from "../../service/api/loginApi"; // Import API từ loginApi
import { useNavigate } from "react-router-dom";

const LoginForm: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();

  // Gọi API đăng nhập
  const [login] = useLoginMutation();

  // Validation schema
  const validationSchema = Yup.object({
    username: Yup.string()
      .required("Vui lòng nhập tên đăng nhập"),
    password: Yup.string().required("Vui lòng nhập mật khẩu"),
  });

  // Formik initialization
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {

      try {
        const { data } = await login(values).unwrap(); // Gửi yêu cầu đăng nhập
        localStorage.setItem("token", data.token); // Lưu token vào localStorage
        localStorage.setItem("readername",data.readername);
        localStorage.setItem("avatar",data.avatar)
        navigate("/"); // Điều hướng tới trang dashboard sau khi đăng nhập thành công
      } catch (error) {
        console.error("Login error:", error); // Log error to debug
        setLoginError("Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.");
      }
    },
  });

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <div className="bg-white py-16 px-4 sm:px-8 lg:px-12 rounded-lg shadow-md w-full max-w-sm sm:max-w-md">
        <button onClick={onBack} className="flex items-center mb-6 space-x-2 text-black">
          <span className="text-xl font-bold">{"<"}</span>
          <span className="text-base font-medium">Quay trở lại các tùy chọn đăng nhập</span>
        </button>

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {/* Username Field */}
          <div className="flex flex-col space-y-2">
            <label className="text-lg font-bold text-gray-800">Tên đăng nhập</label>
            <TextField
              variant="outlined"
              placeholder="Tên đăng nhập"
              fullWidth
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
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
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
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
            type="submit"
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

          {/* Hiển thị lỗi đăng nhập nếu có */}
          {loginError && (
            <div className="text-red-500 text-center mt-4">
              {loginError}
            </div>
          )}
        </form>

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

export default LoginForm;
