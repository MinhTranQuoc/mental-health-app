import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NavigationBar: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    isLoggedIn: false,
    name: '',
    avatar: '',
  });

  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const name = localStorage.getItem('name') || '';
    const avatar = localStorage.getItem('avatar') || '';
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const token = localStorage.getItem('token');

    if (isLoggedIn && token) {
      setUser({
        isLoggedIn,
        name,
        avatar,
      });
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('avatar');
    localStorage.removeItem('isLoggedIn');
    setUser({
      isLoggedIn: false,
      name: '',
      avatar: '',
    });
    setDropdownOpen(false);
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <nav className="w-full">
      <div className="bg-white w-full border-b border-gray-200">
        <div className="container mx-auto flex justify-between items-center py-4">
          <a href="/" className="flex items-center space-x-2">
            <img
              src="data:image/jpeg;base64,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"
              alt="Logo"
              className="h-10"
            />
            <span className="font-bold text-gray-800 text-xl">MENTAL HEALTH</span>
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

          {user.isLoggedIn ? (
            <div className="relative" ref={dropdownRef}>
              <div className="flex items-center space-x-4 cursor-pointer" onClick={toggleDropdown}>
                <img
                  src={user.avatar}
                  alt="User Avatar"
                  className="h-12 w-12 rounded-full border border-gray-300"
                />
                <div className="flex flex-col">
                  <span className="text-gray-800 font-semibold text-lg">{user.name}</span> {/* Increased font size */}
                </div>
              </div>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg z-50">
                  <ul className="py-1">
                    <li>
                      <a
                        href="#profile"
                        className="block text-gray-700 hover:bg-gray-100 px-4 py-2"
                      >
                        Hồ sơ
                      </a>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="block text-gray-700 hover:bg-gray-100 w-full text-left px-4 py-2"
                      >
                        Đăng xuất
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <div className="flex space-x-4">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
                Đăng ký
              </button>
              <button
                onClick={handleLoginClick}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
              >
                Đăng nhập
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
