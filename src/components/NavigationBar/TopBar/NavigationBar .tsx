import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store/store";
import { logout } from "../../User/authSlice";
import UserMenu from "../../User/UserMenu";

const NavigationBar: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoggedIn, readername, avatar } = useSelector(
    (state: RootState) => state.auth
  );

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/"); // Redirect to home after logout
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
          />
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
