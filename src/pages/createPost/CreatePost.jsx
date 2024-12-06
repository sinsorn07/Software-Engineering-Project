import React, { useState, useContext } from "react";
import { FaPhotoVideo, FaTimes } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import BackButton from "../../components/backbutton/BackButton";
import { AuthContext } from "../../context/authContext"; // Import AuthContext
import axios from "axios";

const CreatePost = ({ onClose }) => {
  const { eventId } = useParams();
  const navigate = useNavigate();

  // Access current user from AuthContext
  const { currentUser } = useContext(AuthContext);

  // States to manage post data
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [err, setErr] = useState(null); // Handle errors
  const [loading, setLoading] = useState(false); // Show loading state

  const handleImageChange = async (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      try {
        const formData = new FormData();
        formData.append("file", file);

        const uploadResponse = await axios.post(
          "http://localhost:8800/api/uploads/file",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials: true,
          }
        );

        const uploadedFileUrl = uploadResponse.data.url;
        setImages([...images, uploadedFileUrl]);
      } catch (error) {
        setErr("Failed to upload image.");
        console.error(error);
      }
    }
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const adjustTextArea = (e) => {
    e.target.style.height = "inherit";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const isFormComplete = description.length > 0 || images.length > 0;

  const handleCreatePost = async (e) => {
    e.preventDefault();

    if (!isFormComplete) {
      setErr("Please provide a description or at least one image.");
      return;
    }

    setLoading(true);
    setErr(null);

    try {
      const postData = {
        description,
        images, // Array of uploaded image URLs
        eventId, // Associate the post with the current event
        userId: currentUser.id, // Add userId from AuthContext
      };

      await axios.post("http://localhost:8800/api/posts", postData, {
        withCredentials: true,
      });

      navigate(`/event/${eventId}`); // Redirect to the event page
    } catch (error) {
      console.error("Failed to create post:", error);
      setErr("An error occurred while creating the post. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl w-full relative z-50">
        <div className="title-post-section flex justify-between items-center py-2 mb-4">
          <div className="flex items-center">
            <BackButton onClick={() => navigate(`/event/${eventId}`)} />
            <h2 className="text-2xl font-bold ml-4">Create Post</h2>
          </div>
          <button
            onClick={handleCreatePost}
            className={`post-button px-4 py-2 rounded-md text-white ${
              isFormComplete
                ? "bg-[#508C9B] hover:bg-[#134B70]"
                : "bg-[#C0DBEA] cursor-not-allowed"
            }`}
            disabled={!isFormComplete || loading}
          >
            {loading ? "Posting..." : "Post"}
          </button>
        </div>

        <hr className="my-2" />

        <div className="user-profile-section flex items-center mb-6">
          <img
            src={currentUser.profilePic || "https://via.placeholder.com/150"}
            alt="User Avatar"
            className="w-20 h-20 rounded-full mr-4"
          />
          <span className="username font-semibold text-2xl">
            {currentUser.username || "User"}
          </span>
        </div>

        <div className="description-section mb-4">
          <textarea
            className="description-input border border-gray-300 rounded-md w-full p-3 text-gray-600"
            placeholder="What is happening?"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onInput={adjustTextArea}
            rows="4"
            style={{ overflow: "hidden" }}
          />
        </div>

        <div className="image-upload-section mb-4 grid grid-cols-3 gap-4">
          {images.map((imgUrl, index) => (
            <div
              key={index}
              className="image-upload-container border border-gray-300 rounded-md w-full h-48 flex items-center justify-center overflow-hidden relative"
            >
              <img
                src={imgUrl}
                alt="Uploaded"
                className="w-full h-full object-cover"
              />
              <button
                className="absolute top-1 right-1 text-red-500 text-xl"
                onClick={() => removeImage(index)}
              >
                <FaTimes />
              </button>
            </div>
          ))}
          {images.length < 3 && (
            <label
              htmlFor="fileInput"
              className="cursor-pointer text-gray-400 text-3xl flex items-center justify-center w-full h-48 border border-gray-300 rounded-md"
            >
              +
            </label>
          )}
          <input
            id="fileInput"
            type="file"
            className="hidden"
            onChange={handleImageChange}
          />
        </div>

        <label
          htmlFor="fileInput"
          className="add-image-button bg-[#508C9B] text-white py-2 px-4 rounded-md hover:bg-[#134B70] flex items-center justify-center w-full h-12"
        >
          <FaPhotoVideo className="mr-2" />
          Add Image/Video
        </label>
      </div>
    </div>
  );
};

export default CreatePost;