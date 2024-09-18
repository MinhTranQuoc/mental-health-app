import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserMenu from "../../User/UserMenu"; // Import the new component

const NavigationBar: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    isLoggedIn: false,
    name: "",
    avatar: "",
  });

  useEffect(() => {
    const name = localStorage.getItem("name") || "";
    const avatar = localStorage.getItem("avatar") || "";
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const token = localStorage.getItem("token");

    if (isLoggedIn && token) {
      setUser({
        isLoggedIn,
        name,
        avatar,
      });
    }
  }, []);

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("avatar");
    localStorage.removeItem("isLoggedIn");
    setUser({
      isLoggedIn: false,
      name: "",
      avatar: "",
    });
  };

  return (
    <nav className="hidden md:block w-full">
      {/* Add 'hidden md:block' to hide on mobile */}
      <div className="bg-white w-full border-b border-gray-200">
        <div className="container mx-auto flex justify-between items-center py-4">
          <a href="/" className="flex items-center space-x-2">
            <img src="" alt="Logo" className="h-10" />
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

          <UserMenu user={user} onLoginClick={handleLoginClick} onLogout={handleLogout} />
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
