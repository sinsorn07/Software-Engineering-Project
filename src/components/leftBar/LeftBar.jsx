import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { FaHome, FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { AuthContext } from "../../context/authContext"; // Import AuthContext
import Meetro from "../../assets/MeetroLogo2.png";
import LogoutPopup from "../logout/Logout";

export default function LeftBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext); // Use AuthContext to get currentUser
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);

  const handleLogoutPopup = () => {
    setShowLogoutPopup(true);
  };

  const handleLogout = () => {
    // Clear localStorage or session for user logout
    localStorage.removeItem("user");
    navigate("/login"); // Redirect to login page
    setShowLogoutPopup(false); // Close the popup
  };

  const profile = {
    username: currentUser?.username || "Unknown User", // Display username from AuthContext
    avatar:
      currentUser?.profilePic ||
      "https://via.placeholder.com/150", // Default avatar if not available
  };

  const menus = [
    { to: "/", icon: <FaHome />, label: "Home" },
    { to: "/my-event", icon: <FaUserCircle />, label: "My Event" },
  ];

  return (
    <nav className="flex flex-col h-full bg-[#134B70] shadow-md">
      {/* Logo Section */}
      <div className="p-4 border-b border-[#201E43] flex items-center gap-2">
        <img
          src={Meetro}
          alt="Meetro Logo"
          className="w-[32px] h-[32px] object-contain"
        />
        <Link
          to="/"
          className="text-2xl font-bold text-white hover:text-indigo-200"
        >
          Meetro
        </Link>
      </div>

      {/* Profile Section */}
      <Link
        to={`/profile/${currentUser?.id}`}
        className={`flex items-center gap-3 p-4 border-b border-[#201E43] transition-all duration-150 ${
          location.pathname.includes("/profile")
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

      {/* Logout Section */}
      <div className="flex-grow flex items-end justify-start p-4">
        <button
          onClick={handleLogoutPopup}
          className="flex items-center gap-3 text-white hover:bg-[#508C9B] p-3 rounded-full mt-auto"
        >
          <FaSignOutAlt className="text-xl" />
          <span>Logout</span>
        </button>
      </div>

      {/* Show Logout Popup */}
      {showLogoutPopup && (
        <LogoutPopup
          isOpen={showLogoutPopup}
          onClose={() => setShowLogoutPopup(false)} // Close the popup
          onLogout={handleLogout} // Handle actual logout
        />
      )}
    </nav>
  );
}
