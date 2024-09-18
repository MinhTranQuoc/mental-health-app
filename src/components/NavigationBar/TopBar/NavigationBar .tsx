import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store/store";
import { logout } from "../../User/authSlice";
import UserMenu from "../../User/UserMenu";
import LoginForm from "../../Login/LoginForm";
import RegisterForm from "../../Register/RegisterForm"; // Import RegisterForm

const NavigationBar: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoggedIn, readername, avatar } = useSelector(
    (state: RootState) => state.auth
  );

  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const [isRegisterPopupOpen, setIsRegisterPopupOpen] = useState(false); // State for Register Popup
  const popupRef = useRef<HTMLDivElement>(null);

  const handleLoginClick = () => {
    setIsLoginPopupOpen(true);
  };

  const handleBackToLoginForm = () => {
    setIsLoginPopupOpen(true);
    setIsRegisterPopupOpen(false);
  };

  const handleRegisterClick = () => {
    setIsRegisterPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsLoginPopupOpen(false);
    setIsRegisterPopupOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
      handleClosePopup();
    }
  };

  useEffect(() => {
    if (isLoginPopupOpen || isRegisterPopupOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isLoginPopupOpen, isRegisterPopupOpen]);

  useEffect(() => {
    if (!isLoggedIn) {
      setIsLoginPopupOpen(true);
    }
  }, [isLoggedIn]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <nav className="hidden md:block w-full">
      <div className="bg-white w-full border-b border-gray-200">
        <div className="container mx-auto flex justify-between items-center py-4">
          <a href="/" className="flex items-center space-x-2">
            <img
              src="https://upload-os-bbs.hoyolab.com/upload/2023/02/05/132415658/548c4b3d7abf671b4bf338de4f8c0bc1_6253957035541607485.jpg?x-oss-process=image%2Fresize%2Cs_1000%2Fauto-orient%2C0%2Finterlace%2C1%2Fformat%2Cwebp%2Fquality%2Cq_70"
              alt="Logo"
              className="h-12 w-12"
            />
            <span className="font-bold text-gray-800 text-xl">
              MENTAL HEALTH
            </span>
          </a>

          <div className="relative w-1/2">
            <input
              type="text"
              placeholder="Bạn muốn tìm truyện gì"
              className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-4.35-4.35M11 17a6 6 0 100-12 6 6 0 000 12z"
                />
              </svg>
            </button>
          </div>

          <UserMenu
            user={{ isLoggedIn, readername, avatar }}
            onLoginClick={handleLoginClick}
            onLogout={handleLogout}
            onRegister={handleRegisterClick} // Pass the handler to UserMenu
          />
        </div>
      </div>

      {isLoginPopupOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-30">
          <div
            ref={popupRef}
            className="bg-white p-4 rounded-lg shadow-lg z-50"
          >
            <LoginForm />
          </div>
        </div>
      )}

      {isRegisterPopupOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-30">
          <div
            ref={popupRef}
            className="bg-white p-4 rounded-lg shadow-lg z-40"
          >
            <RegisterForm onBackToLogin={handleBackToLoginForm} />
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavigationBar;
