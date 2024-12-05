import React, { useState } from "react";
import { FaPhotoVideo } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import BackButton from "../../components/backbutton/BackButton";
import axios from "axios";

const CreateEvent = () => {
  const [inputs, setInputs] = useState({
    eventName: "",
    description: "",
    locationName: "",
    locationLink: "",
    start_date: "",
    end_date: "",
    start_time: "",
    end_time: "",
  });
  const [image, setImage] = useState(null); // Store selected image file
  const [err, setErr] = useState(null); // Handle errors
  const [loading, setLoading] = useState(false); // Show loading state

  const navigate = useNavigate();

  const validateUrl = (url) => {
    const urlRegex = /^(https?:\/\/)?(www\.)?([a-zA-Z0-9_-]+)\.([a-zA-Z]{2,})(\/[a-zA-Z0-9#_-]+)*\/?$/;
    return urlRegex.test(url);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]); // Set the image file for upload
    }
  };

  const handleCreateEvent = async (e) => {
    e.preventDefault();

    // Ensure required fields are filled
    if (!inputs.eventName || !inputs.description || !inputs.start_date || !inputs.end_date || !inputs.locationName || !inputs.locationLink) {
      setErr("Required fields are missing!");
      return;
    }

    // Validate locationLink
    if (!validateUrl(inputs.locationLink)) {
      setErr("Please enter a valid URL for the location link!");
      return;
    }

    setLoading(true);
    setErr(null);

    try {
      let uploadedFileUrl = null; // Updated variable name for clarity
    
      // Upload the image first if it exists
      if (image) {
        const formData = new FormData();
        formData.append("file", image);
    
        const uploadResponse = await axios.post("http://localhost:8800/api/uploads/file", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true, // Include cookies for authentication
        });
    
        // Get the URL directly from the server response
        uploadedFileUrl = uploadResponse.data.url; // Use the `url` field from the response
      }
    
      // Prepare event data
      const eventPayload = {
        eventName: inputs.eventName,
        description: inputs.description,
        locationName: inputs.locationName,
        link: inputs.locationLink,
        start_date: inputs.start_date,
        end_date: inputs.end_date,
        start_time: inputs.start_time || "00:00",
        end_time: inputs.end_time || "00:00",
        img: uploadedFileUrl, // Use the URL returned from the backend
      };
    
      // Create the event
      await axios.post("http://localhost:8800/api/event", eventPayload, {
        withCredentials: true,
      });
    
      navigate("/"); // Redirect to home on success
    } catch (error) {
      console.error(error);
      setErr(error.response?.data || "An error occurred while creating the event.");
    } finally {
      setLoading(false);
    }
    
  };
  
  

  return (
    <div className="create-event-page flex flex-col items-center justify-center min-h-screen bg-gray-100 p-8 overflow-y-auto">
      <div className="content-container bg-white rounded-lg shadow-lg w-full max-w-3xl p-6">
        <div className="header-section flex items-center justify-start w-full mb-8 relative">
          <BackButton onClick={() => navigate("/")} />
          <h2 className="text-3xl font-bold ml-4">Create Event</h2>
        </div>

        <div className="image-upload-section flex flex-col items-center mb-8">
          <div
            className="image-frame w-full bg-gray-200 rounded-md flex items-center justify-center mb-4 relative"
            style={{ aspectRatio: "16 / 9" }}
          >
            {image ? (
              <div className="relative w-full h-full">
                <img
                  src={URL.createObjectURL(image)}
                  alt="Uploaded"
                  className="w-full h-full object-cover rounded-md"
                />
                <button
                  onClick={() => setImage(null)}
                  className="absolute top-1 right-1 font-bold text-red-500 text-6xl hover:text-red-700 h-12 w-12 rounded-full"
                  aria-label="Remove image"
                >
                  &times;
                </button>
              </div>
            ) : (
              <label className="add-image-button flex flex-col items-center text-gray-500 hover:text-gray-700 cursor-pointer">
                <FaPhotoVideo className="text-3xl mb-2" />
                <span>Insert Image</span>
                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
              </label>
            )}
          </div>
        </div>

        <div className="form-section space-y-6">
          <div>
            <label className="block text-lg font-semibold mb-2">Event Name</label>
            <input
              type="text"
              name="eventName"
              value={inputs.eventName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-3"
              placeholder="Enter event name"
            />
          </div>

          <div>
            <label className="block text-lg font-semibold mb-2">Description</label>
            <textarea
              name="description"
              value={inputs.description}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-3"
              placeholder="Enter event description"
              rows="4"
            ></textarea>
          </div>

          <div className="date-time-section space-y-6">
            <h3 className="text-lg font-semibold">Date & Time</h3>
            <div className="flex space-x-4">
              <div className="flex flex-col w-1/2">
                <label className="text-sm font-semibold">Start Date</label>
                <input
                  type="date"
                  name="start_date"
                  value={inputs.start_date}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md p-2"
                />
              </div>
              <div className="flex flex-col w-1/2">
                <label className="text-sm font-semibold">End Date</label>
                <input
                  type="date"
                  name="end_date"
                  value={inputs.end_date}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md p-2"
                />
              </div>
            </div>

            <div className="flex space-x-4">
              <div className="flex flex-col w-1/2">
                <label className="text-sm font-semibold">Start Time</label>
                <input
                  type="time"
                  name="start_time"
                  value={inputs.start_time}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md p-2"
                />
              </div>
              <div className="flex flex-col w-1/2">
                <label className="text-sm font-semibold">End Time</label>
                <input
                  type="time"
                  name="end_time"
                  value={inputs.end_time}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md p-2"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-lg font-semibold mb-2">Location</label>
            <input
              type="text"
              name="locationName"
              value={inputs.locationName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-3 mb-4"
              placeholder="Enter location name"
            />
            <input
              type="text"
              name="locationLink"
              value={inputs.locationLink}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-3"
              placeholder="Enter location link"
            />
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={handleCreateEvent}
            className={`px-8 py-3 rounded-md font-semibold ${
              loading || !inputs.eventName || !inputs.description || !inputs.start_date || !inputs.end_date
                ? "bg-[#C0DBEA] text-white cursor-not-allowed"
                : "bg-[#508C9B] text-white hover:bg-[#134B70]"
            }`}
            disabled={loading || !inputs.eventName || !inputs.description || !inputs.start_date || !inputs.end_date}
          >
            {loading ? "Creating..." : "Create Event"}
          </button>
        </div>

        {err && <p className="text-red-500 text-center mt-4">{typeof err === "string" ? err : "An unexpected error occurred."}</p>}
      </div>
    </div>
  );
};

export default CreateEvent;
