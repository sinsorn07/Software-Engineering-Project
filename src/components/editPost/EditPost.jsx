import React, { useState, useEffect } from "react";
import { FaTimes, FaPhotoVideo } from "react-icons/fa";

const EditPostPopup = ({ isOpen, onClose, postContent, postImage, onSave }) => {
  // State to manage the updated content and image
  const [content, setContent] = useState(postContent || "");
  const [images, setImages] = useState(postImage ? [postImage] : []); // Initialize with passed image

  // Handle image upload
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImages([...images, URL.createObjectURL(e.target.files[0])]); // Add new image to images array
    }
  };

  // Remove image from the images array
  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index)); // Remove selected image
  };

  // Save changes and close the popup
  const handleSave = () => {
    if (content.trim() === "") {
      alert("Post content cannot be empty!");
      return;
    }
    onSave({ content, image: images }); // Pass updated content and images
    onClose(); // Close the popup
  };

  useEffect(() => {
    setContent(postContent); // Ensure the content is updated when prop changes
    setImages(postImage ? [postImage] : []); // Ensure the image is updated when prop changes
  }, [postContent, postImage]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      {/* Popup Container */}
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl w-full relative z-50">
        {/* Title and Close Button */}
        <div className="flex justify-between items-center py-2 mb-4">
          <div className="flex items-center">
            <button className="text-gray-600" onClick={onClose}>
              <FaTimes className="text-2xl" />
            </button>
            <h2 className="text-2xl font-bold ml-4">Edit Post</h2>
          </div>
          {/* Save Changes Button */}
          <button
            onClick={handleSave}
            className={`post-button px-4 py-2 rounded-md text-white ${
              content && images.length > 0
                ? "bg-[#508C9B] hover:bg-[#134B70]"
                : "bg-[#C0DBEA] cursor-not-allowed"
            }`}
            disabled={!content && images.length === 0}
          >
            Save Changes
          </button>
        </div>

        <hr className="my-2" />

        {/* Description Textarea */}
        <div className="description-section mb-4">
          <textarea
            className="description-input border border-gray-300 rounded-md w-full p-3 text-gray-600"
            placeholder="What is happening?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="4"
            style={{ overflow: "hidden", resize: "none" }}
          />
        </div>

        {/* Image Upload Section */}
        <div className="image-upload-section mb-4 grid grid-cols-3 gap-4">
          {images.length > 0 &&
            Array.from({ length: 3 }).map((_, index) => {
              // Check if there is an image or if the index is for a placeholder
              if (index < images.length) {
                return (
                  <div
                    key={index}
                    className="image-upload-container border border-gray-300 rounded-md w-full h-48 flex items-center justify-center overflow-hidden relative"
                  >
                    <img
                      src={images[index]}
                      alt="Uploaded"
                      className="w-full h-full object-cover"
                    />
                    <button
                      className="absolute top-1 right-1 text-red-500 text-xl"
                      onClick={() => removeImage(index)} // Remove image
                    >
                      <FaTimes />
                    </button>
                  </div>
                );
              }
              // If index is equal to the number of images, show the placeholder (+) if images < 3
              if (images.length < 3 && index === images.length) {
                return (
                  <div
                    key={index}
                    className="image-upload-container border border-gray-300 rounded-md w-full h-48 flex items-center justify-center overflow-hidden relative"
                  >
                    <label
                      htmlFor="fileInput"
                      className="cursor-pointer text-gray-400 text-3xl flex items-center justify-center w-full h-full"
                    >
                      +
                    </label>
                  </div>
                );
              }
              return null; // Don't display the placeholder if images are 3 or more
            })}
        </div>

        {/* Add Image Button, Only Visible If Images < 3 */}
        {images.length < 3 && (
          <label
            htmlFor="fileInput"
            className="add-image-button bg-[#508C9B] text-white py-2 px-4 rounded-md hover:bg-[#134B70] flex items-center justify-center w-full h-12"
          >
            <FaPhotoVideo className="mr-2" />
            Add Image/Video
          </label>
        )}

        <input
          id="fileInput"
          type="file"
          className="hidden"
          onChange={handleImageChange} // Handle image upload
        />
      </div>
    </div>
  );
};

export default EditPostPopup;
