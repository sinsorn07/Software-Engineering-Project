import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaPhotoVideo, FaEdit, FaCheck } from "react-icons/fa";
import BackButton from "../../components/backbutton/BackButton";
import axios from "axios";

const EditEvent = () => {
    const { id } = useParams(); // Get the event ID from the URL
    console.log("Event ID:", id);

    const navigate = useNavigate();

    // States to manage event data
    const [inputs, setInputs] = useState({
        eventName: "",
        description: "",
        locationName: "",
        locationLink: "",
        startDate: "",
        endDate: "",
        startTime: "",
        endTime: "",
    });
    const [image, setImage] = useState(null); // New image to upload
    const [existingImage, setExistingImage] = useState(""); // Existing image URL
    const [isEditing, setIsEditing] = useState({}); // Track editable fields
    const [loading, setLoading] = useState(false); // Handle submission state
    const [err, setErr] = useState(null); // Handle errors

    // Fetch event details on component load
    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                const res = await axios.get(`http://localhost:8800/api/event/${id}`, {
                    withCredentials: true,
                });
                const event = res.data;
                setInputs({
                    eventName: event.eventName,
                    description: event.description,
                    locationName: event.locationName,
                    locationLink: event.link,
                    startDate: event.start_date,
                    endDate: event.end_date,
                    startTime: event.start_time,
                    endTime: event.end_time,
                });
                setExistingImage(event.img); // Load existing image
            } catch (error) {
                console.error("Failed to fetch event details:", error);
                setErr("Failed to load event details. Please try again.");
            }
        };
        fetchEventDetails();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const removeImage = () => {
        setImage(null);
        setExistingImage("");
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
            let uploadedFileUrl = existingImage;

            // Upload new image if provided
            if (image) {
                const formData = new FormData();
                formData.append("file", image);

                const uploadResponse = await axios.post(
                    "http://localhost:8800/api/uploads/file",
                    formData,
                    {
                        headers: { "Content-Type": "multipart/form-data" },
                        withCredentials: true,
                    }
                );

                uploadedFileUrl = uploadResponse.data.url;
            }

            // Prepare event data for submission
            const editEvent = {
                eventName: inputs.eventName,
                description: inputs.description,
                locationName: inputs.locationName,
                link: inputs.locationLink,
                start_date: inputs.startDate,
                end_date: inputs.endDate,
                start_time: inputs.startTime,
                end_time: inputs.endTime,
                img: uploadedFileUrl,
            };

            await axios.put(`http://localhost:8800/api/event/${id}`, editEvent, {
                withCredentials: true,
            });

            navigate(`/event/${id}`); // Redirect to the event detail page
        } catch (error) {
            console.error("Failed to update event:", error);
            setErr("Failed to save changes. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (!inputs.eventName) return <p className="text-center text-gray-500">Loading event details...</p>;

    return (
        <div className="edit-event-page flex flex-col items-center justify-center min-h-screen bg-gray-100 p-8 overflow-y-auto">
            <div className="content-container bg-white rounded-lg shadow-lg w-full max-w-3xl p-6">
                <div className="header-section flex items-center justify-start w-full mb-8 relative">
                    <BackButton onClick={() => navigate(`/event/${id}`)} />
                    <h2 className="text-3xl font-bold ml-3">Edit Event Details</h2>
                </div>

                {/* Image Section */}
                <div className="image-upload-section flex flex-col items-center mb-8">
                    <div
                        className="image-frame w-full bg-gray-200 rounded-md flex items-center justify-center mb-4 relative"
                        style={{ aspectRatio: "16 / 9" }}
                    >
                        {image ? (
                            <img
                                src={URL.createObjectURL(image)}
                                alt="Uploaded"
                                className="w-full h-full object-cover rounded-md"
                            />
                        ) : existingImage ? (
                            <img
                                src={existingImage}
                                alt="Event"
                                className="w-full h-full object-cover rounded-md"
                            />
                        ) : (
                            <label className="add-image-button flex flex-col items-center text-gray-500 hover:text-gray-700 cursor-pointer">
                                <FaPhotoVideo className="text-3xl mb-2" />
                                <span>Insert Image</span>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="hidden"
                                />
                            </label>
                        )}
                        {(image || existingImage) && (
                            <button
                                onClick={removeImage}
                                className="absolute top-1 right-1 font-bold text-red-500 text-6xl hover:text-red-700 h-12 w-12 rounded-full"
                                aria-label="Remove image"
                            >
                                &times;
                            </button>
                        )}
                    </div>
                </div>

                {/* Form Fields */}
                <div className="form-section space-y-6">
                    {Object.entries(inputs).map(([field, value]) => (
                        <div key={field} className="mb-4">
                            <div className="flex items-center">
                                <label className="block text-lg font-semibold mb-2 capitalize">
                                    {field.replace("_", " ")}
                                </label>
                                <FaEdit
                                    className="ml-2 cursor-pointer text-gray-500 hover:text-[#508C9B]"
                                    onClick={() => toggleEdit(field)}
                                />
                            </div>
                            {isEditing[field] ? (
                                <div className="flex items-center">
                                    <input
                                        type={field.includes("date") ? "date" : field.includes("time") ? "time" : "text"}
                                        name={field}
                                        value={value}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded-md p-3"
                                    />
                                    <FaCheck
                                        className="ml-2 cursor-pointer text-gray-500 hover:text-[#508C9B]"
                                        onClick={() => toggleEdit(field)}
                                    />
                                </div>
                            ) : (
                                <p>{value}</p>
                            )}
                        </div>
                    ))}
                </div>

                {/* Submit Button */}
                <div className="footer-section flex justify-center mt-8">
                    <button
                        onClick={handleSubmit}
                        className={`w-full bg-[#508C9B] text-white py-3 rounded-md text-lg font-semibold hover:bg-[#134B70] ${loading ? "opacity-50 cursor-not-allowed" : ""
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
