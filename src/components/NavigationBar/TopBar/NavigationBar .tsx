import React, { useState, useRef, useEffect } from 'react';

const NavigationBar: React.FC = () => {
  // Hardcoded token for testing
  const hardcodedToken = 'mock-auth-token';

  const [user, setUser] = useState({
    isLoggedIn: false,
    name: '',
    avatar: '',
  });
  
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simulate checking for the hardcoded token
    const token = localStorage.getItem('authToken') || hardcodedToken;

    if (token === hardcodedToken) {
      // Simulate fetching user data based on the hardcoded token
      setUser({
        isLoggedIn: true,
        name: 'Nguyen Van A',
        avatar: 'https://via.placeholder.com/40',
      });
    }

    // Close the dropdown if clicked outside
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
    // Remove token and clear user data
    localStorage.removeItem('authToken');
    setUser({
      isLoggedIn: false,
      name: '',
      avatar: '',
    });
    setDropdownOpen(false); // Close dropdown on logout
  };

  return (
    <nav className="w-full">
      <div className="bg-white w-full border-b border-gray-200">
        <div className="container mx-auto flex justify-between items-center py-4">
          <a href="/" className="flex items-center space-x-2">
            <img
              src="https://via.placeholder.com/40"
              alt="Logo"
              className="h-10"
            />
            <span className="font-bold text-gray-800 text-xl">TRUYENQQ</span>
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
                  <span className="text-gray-800 font-semibold">{user.name}</span>
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
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
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
