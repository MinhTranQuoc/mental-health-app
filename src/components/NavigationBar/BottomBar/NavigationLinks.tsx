import React, { useEffect, useRef, useState } from "react";
import Dropdown from "./Dropdown";
import UserMenu from "../../User/UserMenu";
import { useNavigate } from "react-router-dom";

const NavigationLinks = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isRankingDropdownOpen, setRankingDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState({
    isLoggedIn: false,
    name: "",
    avatar: "",
  });

  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const rankingDropdownRef = useRef<HTMLDivElement | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);

  const categories = [
    "Hành Động",
    "Phiêu Lưu",
    "Tình Cảm",
    "Hài Hước",
    "Kinh Dị",
    "Thể Thao",
    "Trinh Thám",
    "Khoa Học Viễn Tưởng",
    "Giả Tưởng",
    "Học Đường",
    "Siêu Nhiên",
    "Huyền Bí",
    "Pháp Thuật",
    "Xuyên Không",
    "Điền Văn",
  ];

  const rankings = [
    "Top Ngày",
    "Top Tuần",
    "Top Tháng",
    "Yêu Thích",
    "Mới Cập Nhật",
    "Truyện Mới",
    "Truyện Full",
    "Truyện Ngẫu Nhiên",
  ];

  const links = {
    "Con Gái": "/con-gai",
    "Con Trai": "/con-trai",
    "Tìm Truyện": "/tim-truyen",
    "Lịch Sử": "/lich-su",
    "Theo Dõi": "/theo-doi",
    "Thảo Luận": "/thao-luan",
    "Fanpage": "/fanpage",
  };

  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);
  const toggleRankingDropdown = () =>
    setRankingDropdownOpen(!isRankingDropdownOpen);
  const toggleMobileMenu = () => setMobileMenuOpen(!isMobileMenuOpen);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
      if (
        rankingDropdownRef.current &&
        !rankingDropdownRef.current.contains(event.target as Node)
      ) {
        setRankingDropdownOpen(false);
      }
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node)
      ) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

  const handleLogout = () => {
    localStorage.removeItem("name");
    localStorage.removeItem("avatar");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("token");
    setUser({
      isLoggedIn: false,
      name: "",
      avatar: "",
    });
  };
  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <div className="bg-[#f58120]">
      <div className="container mx-auto flex items-center justify-between px-4 py-3 md:py-0 md:px-0 ">
        {/* Hamburger Menu for Mobile */}
        <div className=" container mx-auto flex justify-between items-center py-2 md:hidden">
          <button
            className="text-white md:hidden focus:outline-none items-center"
            onClick={toggleMobileMenu}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={
                  isMobileMenuOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              ></path>
            </svg>
          </button>
          <div className="relative flex-1 mx-4 md:hidden">
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

        {/* Navigation Links */}
        <div
          className={`w-full ${
            isMobileMenuOpen ? "block" : "hidden md:flex md:items-center"
          }`}
        >
          {/* Desktop "Trang Chủ" */}
          <a
            href="/"
            className="block text-white hover:bg-[#ff9d6c] px-4 py-2 rounded transition w-full md:w-auto text-center"
          >
            Trang Chủ
          </a>

          {/* Dropdown for 'Thể Loại' */}
          {!isMobileMenuOpen && (
            <Dropdown
              buttonText="Thể Loại"
              items={categories}
              isOpen={isDropdownOpen}
              toggleDropdown={toggleDropdown}
              dropdownRef={dropdownRef}
              isMobile={false} // Desktop-specific styling
            />
          )}

          {/* Dropdown for 'Xếp Hạng' */}
          {!isMobileMenuOpen && (
            <Dropdown
              buttonText="Xếp Hạng"
              items={rankings}
              isOpen={isRankingDropdownOpen}
              toggleDropdown={toggleRankingDropdown}
              dropdownRef={rankingDropdownRef}
              isMobile={false} // Desktop-specific styling
            />
          )}

          {/* Other Links */}
          {Object.entries(links).map(([text, href]) => (
            <a
              href={href}
              key={text}
              className="block text-white hover:bg-[#ff9d6c] px-4 py-2 rounded transition w-full md:w-auto text-center"
            >
              {text}
            </a>
          ))}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="absolute top-0 left-0 right-0 bg-[#f58120] md:hidden"
          style={{ zIndex: 200 }} // Ensure mobile menu has the highest z-index
        >
          {/* Mobile "Trang Chủ" */}
          <a
            href="/"
            className="block text-white hover:bg-[#ff9d6c] px-4 py-2 rounded transition w-full text-center"
          >
            Trang Chủ
          </a>

          <Dropdown
            buttonText="Thể Loại"
            items={categories}
            isOpen={isDropdownOpen}
            toggleDropdown={toggleDropdown}
            dropdownRef={dropdownRef}
            isMobile={true}
          />
          <Dropdown
            buttonText="Xếp Hạng"
            items={rankings}
            isOpen={isRankingDropdownOpen}
            toggleDropdown={toggleRankingDropdown}
            dropdownRef={rankingDropdownRef}
            isMobile={true}
          />
          {Object.entries(links).map(([text, href]) => (
            <a
              href={href}
              key={text}
              className="block text-white hover:bg-[#ff9d6c] px-4 py-2 rounded transition w-full text-center"
            >
              {text}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default NavigationLinks;
