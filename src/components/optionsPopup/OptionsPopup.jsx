import React, { useState, useRef } from "react";

const OptionsPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const popupRef = useRef();

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  // Close popup if clicked outside
  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-left">
      {/* Trigger Button */}
      <button
        onClick={togglePopup}
        className="text-[#201E43] hover:text-[#134B70] focus:outline-none"
      >
        <span className="text-2xl">⋮</span> {/* Vertical Ellipsis */}
      </button>

      {/* Popup Menu */}
      {isOpen && (
        <div
          ref={popupRef}
          className="absolute right-0 mt-2 w-32 bg-[#EEEEEE] rounded-lg shadow-lg border border-[#508C9B]"
        >
          <button
            className="w-full px-4 py-2 text-left text-[#201E43] hover:bg-[#508C9B] hover:text-[#EEEEEE] focus:outline-none"
            onClick={() => alert("Edit clicked")}
          >
            Edit
          </button>
          <button
            className="w-full px-4 py-2 text-left text-[#201E43] hover:bg-[#508C9B] hover:text-[#EEEEEE] focus:outline-none"
            onClick={() => alert("Delete clicked")}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default OptionsPopup;