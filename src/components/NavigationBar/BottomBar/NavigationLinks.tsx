import React, { useState, useRef, useEffect } from "react";

const Dropdown = ({
  buttonText,
  items,
  isOpen,
  toggleDropdown,
  dropdownRef,
  isMobile,
}: {
  buttonText: string;
  items: string[];
  isOpen: boolean;
  toggleDropdown: () => void;
  dropdownRef: React.RefObject<HTMLDivElement>;
  isMobile: boolean;
}) => (
  <div
    className={`relative ${isMobile ? "block md:hidden" : "hidden md:block"}`}
    ref={dropdownRef}
    style={{ zIndex: 100 }}
  >
    <button
      className="block text-white hover:bg-[#ff9d6c] px-4 py-2 rounded transition w-full md:w-auto text-center"
      onClick={toggleDropdown}
      aria-expanded={isOpen}
    >
      {buttonText}
    </button>
    {isOpen && (
      <div
        className={`absolute left-0 right-0 mt-2 bg-white shadow-lg rounded-lg ${
          isMobile ? "md:w-full" : "md:w-[1000px]"
        }`}
        style={{ zIndex: 150 }} // Ensure dropdown has a higher z-index
      >
        <ul
          className={`grid ${
            isMobile ? "grid-cols-1" : "md:grid-cols-5"
          } gap-2 p-4`}
        >
          {items.map((item) => (
            <li key={item} className="whitespace-nowrap">
              <a
                href="#"
                className="block text-gray-700 hover:bg-gray-100 px-4 py-2"
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      </div>
    )}
  </div>
);

const NavigationLinks = () => {
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
    Fanpage: "/fanpage",
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

  return (
    <div className="bg-[#f58120]">
      <div className="container mx-auto flex items-center justify-between px-4 py-3 md:py-0 md:px-0">
        {/* Hamburger Menu for Mobile */}
        <button
          className="text-white block md:hidden focus:outline-none"
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

        {/* Navigation Links */}
        <div
          className={`w-full ${
            isMobileMenuOpen ? "block" : "hidden md:flex md:items-center"
          }`}
        >
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

          {/* Login, Register, or Logout buttons */}
          {user.isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="block text-white hover:bg-[#ff9d6c] px-4 py-2 rounded transition w-full text-center mt-2 md:hidden"
            >
              Đăng Xuất
            </button>
          ) : (
            <>
              <a
                href="/login"
                className="block text-white hover:bg-[#ff9d6c] px-4 py-2 rounded transition w-full text-center mt-2 md:hidden"
              >
                Đăng Nhập
              </a>
              <a
                href="/register"
                className="block text-white hover:bg-[#ff9d6c] px-4 py-2 rounded transition w-full text-center mt-2 md:hidden"
              >
                Đăng Ký
              </a>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="absolute top-0 left-0 right-0 bg-[#f58120] md:hidden"
          style={{ zIndex: 200 }} // Ensure mobile menu has the highest z-index
        >
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
          {/* Orange line */}
          {Object.entries(links).map(([text, href]) => (
            <a
              href={href}
              key={text}
              className="block text-white hover:bg-[#ff9d6c] px-4 py-2 rounded transition w-full text-center"
            >
              {text}
            </a>
          ))}
          {user.isLoggedIn && (
            <>
              <div className="border-t border-[#ff9d6c] my-2"></div>{" "}
              <a
                href="/profile"
                className="block text-white hover:bg-[#ff9d6c] px-4 py-2 rounded transition w-full text-center"
              >
                Hồ Sơ Của Tôi
              </a>
              <button
                onClick={handleLogout}
                className="block text-white hover:bg-[#ff9d6c] px-4 py-2 rounded transition w-full text-center"
              >
                Đăng Xuất
              </button>
            </>
          )}
          {!user.isLoggedIn && (
            <>
              <div className="border-t border-[#ff9d6c] my-2"></div>{" "}
              <a
                href="/login"
                className="block text-white hover:bg-[#ff9d6c] px-4 py-2 rounded transition w-full text-center"
              >
                Đăng Nhập
              </a>
              <a
                href="/register"
                className="block text-white hover:bg-[#ff9d6c] px-4 py-2 rounded transition w-full text-center"
              >
                Đăng Ký
              </a>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default NavigationLinks;
