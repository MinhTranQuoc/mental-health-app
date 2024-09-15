import React, { RefObject } from "react";

interface DropdownProps {
  buttonText: string;
  items: string[];
  isOpen: boolean;
  toggleDropdown: () => void;
  dropdownRef: RefObject<HTMLDivElement>;
  isMobile: boolean; // Determines whether it's mobile-specific styling
}

const Dropdown: React.FC<DropdownProps> = ({
  buttonText,
  items,
  isOpen,
  toggleDropdown,
  dropdownRef,
  isMobile,
}) => {
  return (
    <div
      className={`relative ${isMobile ? "block md:hidden" : "hidden md:block"}`}
      ref={dropdownRef}
    >
      {/* Dropdown Button */}
      <button
        className={`text-white hover:bg-[#ff9d6c] px-4 py-2 rounded transition ${
          isMobile ? "w-full text-center" : "md:w-auto"
        }`}
        onClick={toggleDropdown}
      >
        {buttonText}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className={`absolute bg-white shadow-lg rounded-md mt-2 z-50 ${
            isMobile ? "w-full" : "w-auto"
          }`}
          style={{ minWidth: isMobile ? 'auto' : '200px' }} // Adjust minimum width based on mobile or desktop
        >
          <ul
            className={`grid ${isMobile ? "grid-cols-1" : "grid-cols-5"} gap-4 p-4`}
            style={{ gridTemplateColumns: isMobile ? "1fr" : "repeat(2, minmax(190px, 1fr))" }}
          >
            {items.map((item) => (
              <li key={item} className="flex items-center">
                <a
                  href={`#${item}`}
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 truncate whitespace-nowrap"
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
};

export default Dropdown;
