import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { FaHome, FaUserCircle } from "react-icons/fa";
import Meetro from '../../assets/MeetroLogo2.png';

export default function LeftBar() {
  const location = useLocation();

  const [profileImage, setProfileImage] = useState(
    "https://i.pinimg.com/564x/db/46/81/db4681a9b78f6305a8befe28ca02e8cb.jpg"
  );
  const [username, setUsername] = useState("ichigo");

  const profile = {
    username: username,
    avatar: profileImage,
  };

  const menus = [
    { to: "/", icon: <FaHome />, label: "Home" },
    { to: "/my-event", icon: <FaUserCircle />, label: "My Event" },
  ];

  return (
    <nav className="flex flex-col h-full bg-[#134B70] shadow-md">
      {/* Logo Section */}
      <div className="p-4 border-b border-[#201E43] flex items-center gap-2">
        {/* Logo Image */}
        <img 
          src={Meetro} 
          alt="Meetro Logo" 
          className="w-[32px] h-[32px] object-contain" 
        />
        
        {/* Logo Text */}
        <Link
          to="/"
          className="text-2xl font-bold text-white hover:text-indigo-200"
        >
          Meetro
        </Link>
      </div>

      {/* Profile Section */}
      <Link
        to="/profile"
        className={`flex items-center gap-3 p-4 border-b border-[#201E43] transition-all duration-150 ${
          location.pathname === "/profile"
            ? "bg-[#201E43] text-white"
            : "text-white hover:bg-[#201E43]"
        }`}
      >
        <div className="relative bg-gray-200 w-[60px] h-[60px] rounded-full overflow-hidden">
          <img
            src={profile.avatar}
            alt="Profile Avatar"
            className="w-full h-full object-cover"
          />
        </div>
        <span className="font-medium text-base text-white">{profile.username}</span>
      </Link>

      {/* Navigation Menu */}
      <ul className="flex flex-col p-4 gap-4">
        {menus.map((item, index) => (
          <li key={index}>
            <Link
              to={item.to}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-150 ${
                location.pathname === item.to
                  ? "bg-[#201E43] text-white"
                  : "text-white hover:bg-[#201E43]"
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
