import React, { useState } from "react";
import { Button, IconButton, InputAdornment, TextField, Snackbar, Alert } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRegisterMutation } from "../../service/api/registerApi"; // Import useRegisterMutation
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../User/authSlice";

interface RegisterProps {
  onEmailRegister: () => void;
}

const Register: React.FC<RegisterProps> = ({ onEmailRegister }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false); // State for Snackbar
  const [redirect, setRedirect] = useState(false); // State for redirection

  // Hook đăng ký
  const [register] = useRegisterMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Validation schema
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Email không hợp lệ")
      .required("Vui lòng nhập địa chỉ email"),
    username: Yup.string().required("Vui lòng nhập tên đăng nhập"),
    password: Yup.string().required("Vui lòng nhập mật khẩu"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Mật khẩu không khớp")
      .required("Vui lòng nhập lại mật khẩu"),
  });

  // Formik initialization
  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        // Gọi API đăng ký
        const response = await register(values).unwrap();
        console.log("Register response:", response);

        // Hiển thị thông báo thành công
        setOpenSnackbar(true);
      } catch (error: any) {
        console.error("Registration error:", error);
        // Handle registration error
        const errorMessage = error?.response?.data?.message || error?.data?.message || error.message;
        if (errorMessage === "User already exists") {
          formik.setErrors({ username: "Tên đăng nhập đã tồn tại" });
        } else if (errorMessage === "Email already exists") {
          formik.setErrors({ email: "Email đã tồn tại" });
        }
      }
    },
  });

  // Handle Snackbar close
  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
    // Redirect and reload after Snackbar closes
    setTimeout(() => {
      navigate("/");
      window.location.reload();
    }, 300); // Small delay to ensure Snackbar has fully closed
  };

  return (
    <div className="flex justify-center items-center">
      <div className="bg-white py-16 px-4 sm:px-8 lg:px-12 w-full max-w-sm sm:max-w-md">
        <button
          onClick={onEmailRegister}
          className="flex items-center mb-6 space-x-2 text-black"
        >
          <span className="text-xl font-bold">{"<"}</span>
          <span className="text-base font-medium">Quay trở lại</span>
        </button>

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div className="flex flex-col space-y-2">
            <label className="text-lg font-bold text-gray-800">
              Địa chỉ Email
            </label>
            <TextField
              variant="outlined"
              placeholder="Nhập địa chỉ email"
              fullWidth
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              InputProps={{
                style: {
                  backgroundColor: "#F3F4F6",
                },
              }}
            />
          </div>

          {/* Username Field */}
          <div className="flex flex-col space-y-2">
            <label className="text-lg font-bold text-gray-800">
              Tên đăng nhập
            </label>
            <TextField
              variant="outlined"
              placeholder="Nhập tên đăng nhập của bạn"
              fullWidth
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
              sx={{
                style: {
                  backgroundColor: "#F3F4F6",
                },
              }}
            />
          </div>

          {/* Password Field */}
          <div className="flex flex-col space-y-2">
            <label className="text-lg font-bold text-gray-800">
              Mật Khẩu Mới
            </label>
            <TextField
              variant="outlined"
              type={showPassword ? "text" : "password"}
              placeholder="Mật Khẩu Mới"
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

          {/* Confirm Password Field */}
          <div className="flex flex-col space-y-2">
            <label className="text-lg font-bold text-gray-800">
              Nhập lại mật khẩu
            </label>
            <TextField
              variant="outlined"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Nhập lại mật khẩu"
              fullWidth
              name="confirmPassword"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.confirmPassword &&
                Boolean(formik.errors.confirmPassword)
              }
              helperText={
                formik.touched.confirmPassword && formik.errors.confirmPassword
              }
              InputProps={{
                style: {
                  backgroundColor: "#F3F4F6",
                },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>

          {/* Agreement Checkbox */}
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="terms" name="terms" required />
            <label htmlFor="terms" className="text-sm text-gray-600">
              Tôi đã đọc và đồng ý với{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Điều khoản dịch vụ
              </a>{" "}
              và{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Chính sách bảo mật
              </a>
              .
            </label>
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
            Đăng ký bằng email
          </Button>
        </form>

        {/* Snackbar for success message */}
        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000} // Set to 3 seconds
          onClose={handleSnackbarClose}
          sx={{ zIndex: 500 }}
        >
          <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
            Đăng ký thành công! Vui lòng đăng nhập.
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
};

export default Register;
