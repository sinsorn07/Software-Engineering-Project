//We won't use this file, Completed EditPost.jsx is in components

import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaPhotoVideo } from "react-icons/fa";
import BackButton from "../../components/backbutton/BackButton";
import { AuthContext } from "../../context/authContext";
import axios from "axios";

const EditPost = () => {
  const { postId } = useParams(); // Get the post ID from the URL
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  const [inputs, setInputs] = useState({
    description: "",
  });
  const [images, setImages] = useState([]); // Existing and new images
  const [existingImages, setExistingImages] = useState([]); // Only existing images
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);

  // Fetch post details
  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/api/posts/${postId}`, {
          withCredentials: true,
        });
        const post = res.data;
        setInputs({ description: post.description });
        const parsedImages = post.img ? JSON.parse(post.img) : [];
        setExistingImages(parsedImages);
        setImages(parsedImages); // Load existing images
      } catch (error) {
        console.error("Failed to fetch post details:", error);
        setErr("Failed to load post details. Please try again.");
      }
    };
    fetchPostDetails();
  }, [postId]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image upload
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:8800/api/uploads/file",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      setImages((prev) => [...prev, response.data.url]); // Append uploaded image URL
    } catch (error) {
      setErr("Failed to upload image. Please try again.");
      console.error(error);
    }
  };

  // Remove image
  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Handle form submission
  const handleSubmit = async () => {
    setLoading(true);
    setErr(null);

    try {
      if (!inputs.description && images.length === 0) {
        setErr("Please provide a description or at least one image.");
        setLoading(false);
        return;
      }

      const editPost = {
        description: inputs.description,
        img: JSON.stringify(images), // Store images as JSON string
      };

      await axios.put(
        `http://localhost:8800/api/posts/${postId}`,
        editPost,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      navigate(`/event/${postId}`); // Redirect to the relevant page
    } catch (error) {
      console.error("Failed to update post:", error);
      setErr("Failed to save changes. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!inputs.description && images.length === 0) {
    return <p className="text-center text-gray-500">Loading post details...</p>;
  }

  return (
    <div className="edit-post-page flex flex-col items-center justify-center min-h-screen bg-gray-100 p-8 overflow-y-auto">
      <div className="content-container bg-white rounded-lg shadow-lg w-full max-w-3xl p-6">
        <div className="header-section flex items-center justify-start w-full mb-8 relative">
          <BackButton onClick={() => navigate(-1)} />
          <h2 className="text-3xl font-bold ml-4">Edit Post</h2>
        </div>

        <div className="image-upload-section flex flex-col items-center mb-8">
          <div
            className="image-frame w-full bg-gray-200 rounded-md flex items-center justify-center mb-4 relative"
            style={{ aspectRatio: "16 / 9" }}
          >
            {images.map((img, index) => (
              <div key={index} className="relative w-full h-full">
                <img
                  src={img}
                  alt={`Uploaded ${index + 1}`}
                  className="w-full h-full object-cover rounded-md"
                />
                <button
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-700"
                  aria-label="Remove image"
                >
                  &times;
                </button>
              </div>
            ))}
            {images.length < 3 && (
              <label className="add-image-button flex flex-col items-center text-gray-500 hover:text-gray-700 cursor-pointer">
                <FaPhotoVideo className="text-3xl mb-2" />
                <span>Upload Image</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            )}
          </div>
        </div>

        <div className="form-section space-y-6">
          <div>
            <label className="block text-lg font-semibold mb-2">Description</label>
            <textarea
              name="description"
              value={inputs.description}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md p-3"
              rows="4"
            />
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={handleSubmit}
            className={`px-8 py-3 rounded-md font-semibold ${
              loading
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-[#508C9B] text-white hover:bg-[#134B70]"
            }`}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>

        {err && <p className="text-red-500 text-center mt-4">{err}</p>}
      </div>
    </div>
  );
};

export default EditPost;
