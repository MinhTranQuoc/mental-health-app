import React from "react";
import { Button } from "@mui/material";
import { Google } from "@mui/icons-material";
import { useGoogleLogin } from "@react-oauth/google"; // Sử dụng hook để đăng nhập

interface GoogleLoginButtonProps {
  onSuccess: (response: any) => void;
  onError?: () => void;
}

const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({
  onSuccess,
  onError,
}) => {
  const login = useGoogleLogin({
    onSuccess: (response) => {
      console.log("Google login successful:", response); // Log success
      onSuccess(response);
    },
    onError: (error) => {
      console.error("Google login error:", error); // Log error details
      if (onError) onError();
    },
  });

  return (
    <Button
      variant="outlined"
      startIcon={<Google sx={{ color: "#DB4437" }} />}
      fullWidth
      className="normal-case"
      style={{
        justifyContent: "center",
        height: "56px",
        borderRadius: "9999px",
        borderWidth: "2px",
        borderColor: "#000",
        color: "#000",
        fontWeight: "bold",
        fontSize: "16px",
        textTransform: "none",
      }}
      onClick={() => login()}
    >
      Đăng nhập bằng tài khoản Google
    </Button>
  );
};

export default GoogleLoginButton;
