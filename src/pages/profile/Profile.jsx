import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV, faHeart, faCommentAlt, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const Profile = () => {
  const { userId } = useParams(); // Extract user ID from the URL
  const navigate = useNavigate();
  const location = useLocation();

  const [userData, setUserData] = useState(null); // State for user data
  const [posts, setPosts] = useState([]); // State for user's posts
  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState(null); // State for errors

  // Fetch user data and posts on component load
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await axios.get(`http://localhost:8800/api/users/find/${userId}`, {
          withCredentials: true,
        });
        setUserData(userResponse.data);

        const postsResponse = await axios.get(`http://localhost:8800/api/posts?userId=${userId}`, {
          withCredentials: true,
        });

        const postsWithParsedImages = postsResponse.data.map((post) => {
          let parsedImages;
          try {
            parsedImages = post.img ? JSON.parse(post.img) : []; // Attempt to parse `img` field
          } catch {
            parsedImages = Array.isArray(post.img) ? post.img : [post.img].filter(Boolean); // Fallback to array
          }

          return {
            ...post,
            img: parsedImages, // Ensure `img` is always an array
          };
        });

        setPosts(postsWithParsedImages);
      } catch (err) {
        setError(err.message || "Unable to load user data or posts.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  // Handle navigating back to the previous page
  const handleGoBack = () => {
    if (location.state?.from === "edit-profile") {
      navigate(-2); // Skip the edit profile page
    } else {
      navigate(-1); // Navigate to the previous page
    }
  };

  // Navigate to the edit profile page
  const handleEditProfile = () => {
    navigate(`/edit-profile/${userId}`, { state: { from: "profile" } });
  };

  if (loading) return <div>Loading...</div>; // Display loading state
  if (error) return <div>{error}</div>; // Display error state

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* User Information Section */}
      <div className="bg-[#134B70] h-[80vh] relative">
        <button
          onClick={handleGoBack}
          className="absolute top-4 left-4 text-white p-2 rounded-full hover:bg-[#1a4d6f]"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <img
          src={userData.coverPic || "https://via.placeholder.com/600x300/cccccc/cccccc"}
          alt="Cover"
          className="w-full h-[28rem] object-cover rounded-lg"
        />
        <div className="absolute top-[19rem] left-1/2 transform -translate-x-1/2 w-56 h-56 border-4 border-[#EEEEEE] rounded-full overflow-hidden z-20">
          <img
            src={userData && userData.profilePic ? userData.profilePic : "https://i.postimg.cc/nzJJzdBt/default-avatar-profile-icon.jpg"}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        <button
          onClick={handleEditProfile}
          className="absolute top-[29rem] right-4 bg-[#D1E7F3] text-[#134B70] px-4 py-2 rounded-md hover:bg-[#B3D4E0]"
        >
          Edit Profile
        </button>
        <div className="flex flex-col items-center mt-20 z-10 relative">
          <h2 className="text-3xl font-semibold mb-4 text-[#EEEEEE]">
            {userData.username || "Unknown User"}
          </h2>
          <p className="text-[#EEEEEE] text-lg">{userData.description || "No description available"}</p>
        </div>
      </div>

      {/* User's Posts Section */}
      <div className="flex-grow bg-gray-100 p-6 overflow-y-auto">
        <div className="space-y-8">
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg p-6 shadow-md max-w-3xl mx-auto">
              {/* Post Header */}
              <div className="flex items-center text-base text-[#201E43] mb-4">
                <img
                  src={post.profilePic || "https://via.placeholder.com/150"}
                  alt="User"
                  className="w-10 h-10 rounded-full mr-2"
                />
                <span className="text-[#201E43] font-bold">{post.userName}</span>
                <span className="ml-3">
                  {new Date(post.created_datetime).toLocaleString()}
                </span>
              </div>
              {/* Post Description */}
              <p className="text-[#201E43] mb-3 text-lg">{post.description}</p>
              {/* Optional Post Images */}
              {post.img && post.img.length > 0 && (
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                  {post.img.map((imageUrl, index) => (
                    <img
                      key={index}
                      src={imageUrl}
                      alt={`Post Image ${index + 1}`}
                      className="rounded-lg w-full"
                    />
                  ))}
                </div>
              )}
              {/* Event Name */}
              {post.eventName && (
                <p className="text-sm text-gray-500 mt-2">Event: {post.eventName}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
