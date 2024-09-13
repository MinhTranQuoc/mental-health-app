import React, { useState, useRef, useEffect } from 'react';

const NavigationLinks = () => {
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

  // Close dropdown when clicking outside
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
  );
};

export default NavigationLinks;
