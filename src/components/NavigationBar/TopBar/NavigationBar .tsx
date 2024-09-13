import React, { useState, useEffect, useRef } from 'react';

const NavigationBar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isRankingDropdownOpen, setRankingDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const rankingDropdownRef = useRef<HTMLDivElement | null>(null);

  // Các thể loại truyện
  const categories = [
    'Hành Động',
    'Phiêu Lưu',
    'Tình Cảm',
    'Hài Hước',
    'Kinh Dị',
    'Thể Thao',
    'Trinh Thám',
    'Khoa Học Viễn Tưởng',
    'Giả Tưởng',
    'Học Đường',
    'Siêu Nhiên',
    'Huyền Bí',
    'Pháp Thuật',
    'Xuyên Không',
    'Điền Văn',
  ];

  // Các tùy chọn xếp hạng
  const rankings = [
    'Top Ngày',
    'Top Tuần',
    'Top Tháng',
    'Yêu Thích',
    'Mới Cập Nhật',
    'Truyện Mới',
    'Truyện Full',
    'Truyện Ngẫu Nhiên',
  ];

  // Toggle dropdown
  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const toggleRankingDropdown = () => {
    setRankingDropdownOpen(!isRankingDropdownOpen);
  };

  // Đóng dropdown khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
      if (rankingDropdownRef.current && !rankingDropdownRef.current.contains(event.target as Node)) {
        setRankingDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="w-full">
      {/* Top section with logo, search bar, and buttons */}
      <div className="bg-white w-full border-b border-gray-200">
        <div className="container mx-auto flex justify-between items-center py-4">
          {/* Logo */}
          <a href="/" className="flex items-center space-x-2">
            <img
              src="https://via.placeholder.com/40"
              alt="Logo"
              className="h-10"
            />
            <span className="font-bold text-gray-800 text-xl">TRUYENQQ</span>
          </a>

          {/* Search bar */}
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

          {/* Sign up and Login buttons */}
          <div className="flex space-x-4">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
              Đăng ký
            </button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
              Đăng nhập
            </button>
          </div>
        </div>
      </div>

      {/* Bottom section with navigation links */}
      <div className="bg-[#f58120]">
        <div className="container mx-auto flex items-center space-x-4">
          <a
            href="/"
            className="text-white hover:bg-[#ff9d6c] px-4 py-3 rounded transition"
          >
            Trang Chủ
          </a>

          {/* Dropdown for 'Thể Loại' */}
          <div className="relative" ref={dropdownRef} style={{ zIndex: 100 }}>
            <button
              className="text-white hover:bg-[#ff9d6c] px-4 py-3 rounded transition"
              onClick={toggleDropdown}
            >
              Thể Loại
            </button>

            {isDropdownOpen && (
              <div className="absolute left-0 mt-2 w-[1000px] bg-white shadow-lg rounded-lg z-50">
                <ul className="grid grid-cols-5 gap-4 p-4">
                  {categories.map((category) => (
                    <li key={category} className="whitespace-nowrap">
                      <a
                        href="#"
                        className="block text-gray-700 hover:bg-gray-100 px-4 py-3"
                      >
                        {category}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Dropdown for 'Xếp Hạng' */}
          <div className="relative" ref={rankingDropdownRef} style={{ zIndex: 100 }}>
            <button
              className="text-white hover:bg-[#ff9d6c] px-4 py-3 rounded transition"
              onClick={toggleRankingDropdown}
            >
              Xếp Hạng
            </button>

            {isRankingDropdownOpen && (
              <div className="absolute left-0 mt-2 w-[500px] bg-white shadow-lg rounded-lg z-50">
                <ul className="grid grid-cols-2 gap-4 p-4">
                  {rankings.map((ranking) => (
                    <li key={ranking} className="whitespace-nowrap">
                      <a
                        href="#"
                        className="block text-gray-700 hover:bg-gray-100 px-4 py-3"
                      >
                        {ranking}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <a
            href="#"
            className="text-white hover:bg-[#ff9d6c] px-4 py-3 rounded transition"
          >
            Con Gái
          </a>
          <a
            href="#"
            className="text-white hover:bg-[#ff9d6c] px-4 py-3 rounded transition"
          >
            Con Trai
          </a>
          <a
            href="#"
            className="text-white hover:bg-[#ff9d6c] px-4 py-3 rounded transition"
          >
            Tìm Truyện
          </a>
          <a
            href="#"
            className="text-white hover:bg-[#ff9d6c] px-4 py-3 rounded transition"
          >
            Lịch Sử
          </a>
          <a
            href="#"
            className="text-white hover:bg-[#ff9d6c] px-4 py-3 rounded transition"
          >
            Theo Dõi
          </a>
          <a
            href="#"
            className="text-white hover:bg-[#ff9d6c] px-4 py-3 rounded transition"
          >
            Thảo Luận
          </a>
          <a
            href="#"
            className="text-white hover:bg-[#ff9d6c] px-4 py-3 rounded transition"
          >
            Fanpage
          </a>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
