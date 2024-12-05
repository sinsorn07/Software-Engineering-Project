import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { FaCamera } from "react-icons/fa";
import { AuthContext } from "../../context/authContext";

const EditProfile = () => {
  const { userId } = useParams(); // Get user ID from URL
  const navigate = useNavigate();
  const { updateUser } = useContext(AuthContext);

  const [profileData, setProfileData] = useState({
    username: "",
    bio: "",
    profilePic: "",
    coverPic: "",
    email: "", // Include email
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user data
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8800/api/users/find/${userId}`
        );
        setProfileData({
          username: response.data.username,
          bio: response.data.description,
          profilePic: response.data.profilePic,
          coverPic: response.data.coverPic,
          email: response.data.email || "", // Include email
        });
      } catch (err) {
        setError("Failed to fetch profile data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [userId]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file upload
  const handleFileUpload = async (e, field) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:8800/api/uploads/file",
        formData
      );
      const uploadedFileUrl = response.data.url; // Use the returned URL
      setProfileData((prev) => ({ ...prev, [field]: uploadedFileUrl })); // Update the state with the URL
    } catch (err) {
      alert("Failed to upload image.");
      console.error(err);
    }
  };

  // Handle saving profile
  const handleSaveProfile = async () => {
    try {
      const response = await axios.put(
        "http://localhost:8800/api/users",
        {
          username: profileData.username,
          description: profileData.bio,
          profilePic: profileData.profilePic,
          coverPic: profileData.coverPic,
          email: profileData.email, // Ensure email is sent
        },
        { withCredentials: true }
      );
      alert("Profile updated successfully!");
      updateUser({
        username: profileData.username,
        profilePic: profileData.profilePic,
        coverPic: profileData.coverPic,
      });
      navigate(`/profile/${userId}`);
      
      
    } catch (err) {
      console.error(
        "Error updating profile:",
        err.response?.data || err.message
      );
    //   alert("Failed to update profile.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="flex h-screen bg-gray-200">
      <div className="flex-grow p-6 bg-[#134B70] rounded-b-lg">
        <div className="relative mb-10">
          {/* Cover Photo */}
          <img
          src={profileData.coverPic || "https://via.placeholder.com/600x300/cccccc/cccccc"}
          alt="Cover"
          className="w-full h-[28rem] object-cover rounded-lg"
          />

          <label
            htmlFor="coverPicUpload"
            className="absolute top-[29rem] right-4 bg-[#D1E7F3] text-[#134B70] px-4 py-2 rounded-md hover:bg-[#B3D4E0] cursor-pointer"
          >
            Change Cover
            <input
              id="coverPicUpload"
              type="file"
              accept="image/*"
              onChange={(e) => handleFileUpload(e, "coverPic")}
              className="hidden"
            />
          </label>

          {/* Profile Picture */}
          <div className="absolute top-[19rem] left-1/2 transform -translate-x-1/2 w-56 h-56 border-4 border-gray-200 rounded-full overflow-hidden z-20">
          <img
          src={profileData.profilePic || "https://i.postimg.cc/nzJJzdBt/default-avatar-profile-icon.jpg"} // Specific URL you provided
          alt="Profile"
          className="w-full h-full object-cover"
           />
          </div>
          <label
            htmlFor="profilePicUpload"
            className="absolute top-[30rem] left-[calc(50%+4rem)] bg-white p-2 rounded-full shadow-md cursor-pointer z-50"
          >
            <FaCamera className="text-[#134B70]" />
            <input
              id="profilePicUpload"
              type="file"
              accept="image/*"
              onChange={(e) => handleFileUpload(e, "profilePic")}
              className="hidden"
            />
          </label>
        </div>

        {/* Edit Form */}
        <div className="flex flex-col items-center mt-20">
          <h2 className="text-3xl font-semibold mb-4 text-[#EEEEEE]">
            Edit Profile
          </h2>
          <form className="w-full max-w-md space-y-6 bg-white p-6 rounded-lg shadow-md">
            <div>
              <label className="block text-sm font-medium text-[#201E43] mb-2">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={profileData.username}
                onChange={handleInputChange}
                className="w-full p-2 rounded-md bg-gray-100 border-none focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#201E43] mb-2">
                Bio
              </label>
              <textarea
                name="bio"
                value={profileData.bio}
                onChange={handleInputChange}
                className="w-full p-2 rounded-md bg-gray-100 border-none focus:outline-none"
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#201E43] mb-2">
                Email
              </label>
              <input
                type="text"
                name="email"
                value={profileData.email || ""}
                readOnly
                className="w-full p-2 rounded-md bg-gray-100 border-none focus:outline-none text-gray-500 cursor-not-allowed"
              />
            </div>

            <button
              type="button"
              onClick={handleSaveProfile}
              className="w-full py-2 bg-[#134B70] text-[#EEEEEE] font-semibold rounded-lg hover:bg-[#0E3A56] focus:outline-none"
            >
              Save Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
