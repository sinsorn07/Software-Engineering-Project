import React, { useState } from "react";
import { FaPhotoVideo, FaTimes } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate and useParams
import BackButton from "../../components/backbutton/BackButton";

const CreatePost = ({ onClose }) => {
  const { id } = useParams(); // Get the eventId from the URL
  const navigate = useNavigate(); // Initialize useNavigate

  const [description, setDescription] = useState("");
  const [profileImage, setProfileImage] = useState(
    "https://i.pinimg.com/564x/db/46/81/db4681a9b78f6305a8befe28ca02e8cb.jpg"
  );
  const [username, setUsername] = useState("ichigo");
  const [images, setImages] = useState([]);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImages([...images, URL.createObjectURL(file)]);
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

  const handleBackButtonClick = () => {
    // Navigate back to the EventDetail page with the event ID
    navigate(`/event/${id}`);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      {/* CreatePost Modal Popup */}
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl w-full relative z-50">
        {/* Title and Back Button */}
        <div className="title-post-section flex justify-between items-center py-2 mb-4">
          <div className="flex items-center">
            <BackButton onClick={handleBackButtonClick} />
            <h2 className="text-2xl font-bold ml-4">Create Post</h2>
          </div>
          <button
            className={`post-button px-4 py-2 rounded-md text-white ${
              isFormComplete
                ? "bg-[#508C9B] hover:bg-[#134B70]"
                : "bg-[#C0DBEA] cursor-not-allowed"
            }`}
            disabled={!isFormComplete}
          >
            Post
          </button>
        </div>

        <hr className="my-2" />

        {/* User Profile Section */}
        <div className="user-profile-section flex items-center mb-6">
          <img
            src={profileImage}
            alt="User Avatar"
            className="w-20 h-20 rounded-full mr-4"
          />
          <span className="username font-semibold text-2xl">{username}</span>
        </div>

        {/* Description Textarea */}
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

        {/* Image Upload Section */}
        <div className="image-upload-section mb-4 grid grid-cols-3 gap-4">
          {images.length > 0 &&
            Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="image-upload-container border border-gray-300 rounded-md w-full h-48 flex items-center justify-center overflow-hidden relative"
              >
                {images[index] ? (
                  <>
                    <img
                      src={images[index]}
                      alt="Uploaded"
                      className="w-full h-full object-cover"
                    />
                    <button
                      className="absolute top-1 right-1 text-red-500 text-xl"
                      onClick={() => removeImage(index)}
                    >
                      <FaTimes />
                    </button>
                  </>
                ) : index === images.length && images.length < 3 ? (
                  <label
                    htmlFor="fileInput"
                    className="cursor-pointer text-gray-400 text-3xl flex items-center justify-center w-full h-full"
                  >
                    +
                  </label>
                ) : null}
              </div>
            ))}
          <input
            id="fileInput"
            type="file"
            className="hidden"
            onChange={handleImageChange}
          />
        </div>

        {/* Add Image/Video Button */}
        <label
          htmlFor="fileInput"
          className="add-image-button bg-[#508C9B] text-white py-2 px-4 rounded-md hover:bg-[#134B70] flex items-center justify-center w-full h-12"
        >
          <FaPhotoVideo className="mr-2" />
          Add Image/Video
        </label>
        <input
          id="fileInput"
          type="file"
          className="hidden"
          onChange={handleImageChange}
        />
      </div>
    </div>
  );
};

export default CreatePost;
