import React, { useState, useEffect } from "react";
import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useLoginMutation } from "../../service/api/loginApi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../components/User/authSlice';

const LoginForm: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login] = useLoginMutation();

  // Retrieve token from localStorage and update Redux Store on component mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const readername = localStorage.getItem("readername");
      const avatar = localStorage.getItem("avatar");
      dispatch(setCredentials({
        token,
        readername,
        avatar
      }));
    }
  }, [dispatch]);

  // Validation schema
  const validationSchema = Yup.object({
    username: Yup.string().required("Vui lòng nhập tên đăng nhập"),
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
      if (isSubmitting) return; // Prevent multiple form submissions
      setIsSubmitting(true); // Set form to submitting state

      try {
        const { data } = await login(values).unwrap();
        localStorage.setItem("token", data.token);
        localStorage.setItem("readername", data.readername);
        localStorage.setItem("avatar", data.avatar);

        // Dispatch setCredentials with userData
        dispatch(setCredentials({
          token: data.token,
          readername: data.readername,
          avatar: data.avatar
        }));

        navigate("/"); // Navigate to dashboard on success
      } catch (error) {
        console.error("Login error:", error);
        setLoginError("Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.");
      } finally {
        setIsSubmitting(false); // Reset submitting state
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
            disabled={isSubmitting}
            style={{
              height: "48px",
              backgroundColor: isSubmitting ? "#ccc" : "#000",
              color: "#fff",
              borderRadius: "9999px",
              fontSize: "16px",
              fontWeight: "bold",
              textTransform: "none",
            }}
          >
            {isSubmitting ? "Đang đăng nhập..." : "Đăng nhập"}
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
