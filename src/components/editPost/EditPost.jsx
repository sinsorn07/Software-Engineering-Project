import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaPhotoVideo, FaTimes } from "react-icons/fa";
import axios from "axios";

const EditPost = () => {
  const { postId } = useParams();
  const navigate = useNavigate();

  // State for post data
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);

  // Fetch existing post details on mount
  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/api/posts/${postId}`, {
          withCredentials: true,
        });
        const post = res.data;
        setContent(post.description || "");
        setExistingImages(post.img ? JSON.parse(post.img) : []);
      } catch (error) {
        setErr("Failed to fetch post details. Please try again.");
        console.error(error);
      }
    };
    fetchPostDetails();
  }, [postId]);

  // Handle content change
  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  // Handle new image upload
  const handleImageUpload = async (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      try {
        const formData = new FormData();
        formData.append("file", file);

        const res = await axios.post(
          "http://localhost:8800/api/uploads/file",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials: true,
          }
        );

        setImages((prev) => [...prev, res.data.url]); // Add new uploaded image URL
      } catch (error) {
        setErr("Failed to upload image. Please try again.");
        console.error(error);
      }
    }
  };

  // Remove an image (both new and existing)
  const removeImage = (index, isExisting) => {
    if (isExisting) {
      setExistingImages((prev) => prev.filter((_, i) => i !== index));
    } else {
      setImages((prev) => prev.filter((_, i) => i !== index));
    }
  };

  // Save changes
  const handleSaveChanges = async () => {
    if (!content.trim() && existingImages.length === 0 && images.length === 0) {
      setErr("Post content or at least one image is required.");
      return;
    }

    setLoading(true);
    setErr(null);

    try {
      // Prepare the updated post payload
      const updatedPost = {
        description: content,
        img: JSON.stringify([...existingImages, ...images]), // Merge new and existing images
      };

      // Update post via API
      await axios.put(`http://localhost:8800/api/posts/${postId}`, updatedPost, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      // navigate(`/event/${postId}`); 
      navigate(-1);
    } catch (error) {
      setErr("Failed to save changes. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (!content && existingImages.length === 0 && images.length === 0) {
    return <p className="text-center text-gray-500">Loading post details...</p>;
  }

  return (
    <div className="edit-post-page flex flex-col items-center justify-center min-h-screen bg-gray-100 p-8 overflow-y-auto">
      <div className="content-container bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl relative">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Edit Post</h2>
          <button
            onClick={handleSaveChanges}
            className={`px-4 py-2 rounded-md text-white ${
              loading
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-[#508C9B] hover:bg-[#134B70]"
            }`}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>

        {err && <p className="text-red-500 mb-4">{err}</p>}

        {/* Post Content */}
        <textarea
          className="w-full p-3 border border-gray-300 rounded-md mb-6"
          rows="5"
          placeholder="Edit your post..."
          value={content}
          onChange={handleContentChange}
        />

        {/* Image Uploads */}
        <div className="grid grid-cols-3 gap-4">
          {/* Existing Images */}
          {existingImages.map((img, index) => (
            <div key={index} className="relative">
              <img
                src={img}
                alt={`Existing ${index + 1}`}
                className="w-full aspect-square object-cover rounded-md"
              />
              <button
                onClick={() => removeImage(index, true)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
              >
                &times;
              </button>
            </div>
          ))}

          {/* New Images */}
          {images.map((img, index) => (
            <div key={index} className="relative">
              <img
                src={img}
                alt={`New ${index + 1}`}
                className="w-full aspect-square object-cover rounded-md"
              />
              <button
                onClick={() => removeImage(index, false)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
              >
                &times;
              </button>
            </div>
          ))}

          {/* Add New Image */}
          {existingImages.length + images.length < 3 && (
            <label className="w-full aspect-square border border-gray-300 flex items-center justify-center rounded-md text-gray-400 cursor-pointer">
              <FaPhotoVideo className="text-3xl" />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </label>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditPost;
