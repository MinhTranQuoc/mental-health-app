import React, { useState, useRef } from 'react';

interface User {
  isLoggedIn: boolean;
  readername: string | null;
  avatar: string | null;
}

interface UserMenuProps {
  user: User;
  onLoginClick: () => void;
  onLogout: () => void;
}

const UserMenu: React.FC<UserMenuProps> = ({ user, onLoginClick, onLogout }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setDropdownOpen(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {user.isLoggedIn ? (
        <div className="relative" ref={dropdownRef}>
          <div
            className="flex items-center space-x-1 cursor-pointer"
            onClick={toggleDropdown}
          >
            <img
              src={user.avatar || '/default-avatar.png'}
              alt="User Avatar"
              className="h-11 w-11 rounded-full border border-gray-300"
            />
            <div className="flex flex-col">
              <span className="md:text-gray-800 font-semibold text-lg text-white">
                {user.readername || 'User'}
              </span>
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
                    onClick={onLogout}
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
          <button
            onClick={onLoginClick}
            className="md:bg-blue-500 md:text-white px-4 py-2 rounded-lg md:hover:bg-blue-600 bg-[#f58120] text-white transition"
          >
            Đăng nhập
          </button>
          <button className="md:bg-blue-500 md:text-white px-4 py-2 rounded-lg md:hover:bg-blue-600 bg-[#f58120] text-white transition">
            Đăng ký
          </button>
        </div>
      )}
    </>
  );
};

export default UserMenu;
