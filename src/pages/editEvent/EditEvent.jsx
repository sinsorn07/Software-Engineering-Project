import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaPhotoVideo } from "react-icons/fa";
import BackButton from "../../components/backbutton/BackButton";
import axios from "axios";

const EditEvent = () => {
    const { eventId } = useParams(); // Get the event ID from the URL
    const navigate = useNavigate();

    // States for event data
    const [inputs, setInputs] = useState({
        eventName: "",
        description: "",
        locationName: "",
        link: "",
        start_date: "",
        end_date: "",
        start_time: "",
        end_time: "",
    });
    const [image, setImage] = useState(null); // For new image upload
    const [existingImage, setExistingImage] = useState(""); // Existing image URL
    const [loading, setLoading] = useState(false); // Submission state
    const [err, setErr] = useState(null); // Error handling

    // Format date and time utilities
    const formatDate = (date) => new Date(date).toISOString().split("T")[0];
    const formatTime = (timeString) => (timeString ? timeString.slice(0, 5) : "");

    // Fetch event details on mount
    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                const res = await axios.get(`http://localhost:8800/api/event/${eventId}`, {
                    withCredentials: true,
                });
                const event = res.data;
                setInputs({
                    eventName: event.eventName,
                    description: event.description,
                    locationName: event.locationName,
                    link: event.link,
                    start_date: formatDate(event.start_date),
                    end_date: formatDate(event.end_date),
                    start_time: formatTime(event.start_time),
                    end_time: formatTime(event.end_time),
                });
                setExistingImage(event.img); // Load existing image
            } catch (error) {
                console.error("Failed to fetch event details:", error);
                setErr("Failed to load event details. Please try again.");
            }
        };
        fetchEventDetails();
    }, [eventId]);

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
            setExistingImage(response.data.url); // Set the uploaded image URL
            setImage(file); // Update the image state for preview
       } catch (error) {
            setErr("Failed to upload image. Please try again.");
            console.error(error);
        }
    };

    const removeImage = () => {
        setExistingImage("");
        setImage(null);
    };

    const toggleEdit = (field) => {
        setIsEditing((prevState) => ({
            ...prevState,
            [field]: !prevState[field],
        }));
    };

   const handleSubmit = async () => {
        setLoading(true);
        setErr(null);

        try {
            // Validate required fields
            if (!inputs.eventName || !inputs.start_date || !inputs.end_date) {
                setErr("Please fill out all required fields.");
                setLoading(false);
                return;
            }

            // Prepare payload
            const editEvent = {
                ...inputs,
                img: existingImage || null,
            };

            // Update the event
            await axios.put(
                `http://localhost:8800/api/event/${eventId}`,
                editEvent,
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );

            navigate(`/event/${eventId}`); // Redirect to event detail page
        } catch (error) {
            console.error("Failed to update event:", error);
            setErr("Failed to save changes. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (!inputs.eventName) {
        return <p className="text-center text-gray-500">Loading event details...</p>;
    }

    return (
        <div className="edit-event-page flex flex-col items-center justify-center min-h-screen bg-gray-100 p-8 overflow-y-auto">
            <div className="content-container bg-white rounded-lg shadow-lg w-full max-w-3xl p-6">
                <div className="header-section flex items-center justify-start w-full mb-8 relative">
                    <BackButton onClick={() => navigate(`/event/${eventId}`)} />
                    <h2 className="text-3xl font-bold ml-4">Edit Event</h2>
                </div>

                {/* Image Upload Section */}
                <div className="image-upload-section flex flex-col items-center mb-8">
                    <div
                        className="image-frame w-full bg-gray-200 rounded-md flex items-center justify-center mb-4 relative"
                        style={{ aspectRatio: "16 / 9" }}
                    >
                        {existingImage || image ? (
                            <div className="relative w-full h-full">
                                <img
                                    src={image ? URL.createObjectURL(image) : existingImage}
                                    alt="Uploaded"
                                    className="w-full h-full object-cover rounded-md"
                                />
                                <button
                                    onClick={removeImage}
                                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-700"
                                    aria-label="Remove image"
                                >
                                    &times;
                                </button>
                            </div>
                       ) : (
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

                {/* Form Fields */}
                <div className="form-section space-y-6">
                    <div>
                        <label className="block text-lg font-semibold mb-2">Event Name</label>
                        <input
                            type="text"
                            name="eventName"
                            value={inputs.eventName}
                            onChange={handleInputChange}
                            className="w-full border border-gray-300 rounded-md p-3"
                        />
                    </div>

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

                    <div className="date-time-section space-y-6">
                        <h3 className="text-lg font-semibold">Date & Time</h3>
                        <div className="flex space-x-4">
                            <input
                                type="date"
                                name="start_date"
                                value={inputs.start_date}
                                onChange={handleInputChange}
                                className="border border-gray-300 rounded-md p-2"
                            />
                            <input
                                type="date"
                                name="end_date"
                                value={inputs.end_date}
                                onChange={handleInputChange}
                                className="border border-gray-300 rounded-md p-2"
                            />
                        </div>
                        <div className="flex space-x-4">
                            <input
                                type="time"
                                name="start_time"
                                value={inputs.start_time}
                                onChange={handleInputChange}
                                className="border border-gray-300 rounded-md p-2"
                            />
                            <input
                                type="time"
                                name="end_time"
                                value={inputs.end_time}
                                onChange={handleInputChange}
                                className="border border-gray-300 rounded-md p-2"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-lg font-semibold mb-2">Location Name</label>
                        <input
                            type="text"
                            name="locationName"
                            value={inputs.locationName}
                            onChange={handleInputChange}
                            className="w-full border border-gray-300 rounded-md p-3 mb-4"
                        />
                        <label className="block text-lg font-semibold mb-2">Location Link</label>
                        <input
                            type="text"
                            name="link"
                            value={inputs.link}
                            onChange={handleInputChange}
                            className="w-full border border-gray-300 rounded-md p-3"
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <div className="mt-8 flex justify-center">
                    <button
                        onClick={handleSubmit}
                        className={`px-8 py-3 rounded-md font-semibold ${
                            loading ? "bg-gray-300 cursor-not-allowed" : "bg-[#508C9B] text-white hover:bg-[#134B70]"
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

export default EditEvent;
