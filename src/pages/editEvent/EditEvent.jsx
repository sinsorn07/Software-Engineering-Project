import React, { useState } from 'react';
import { FaPhotoVideo, FaArrowLeft, FaEdit, FaCheck } from 'react-icons/fa';
import BackButton from '../../components/backbutton/BackButton';

const EditEvent = () => {
    const [eventName, setEventName] = useState("2024 Yuji Birthday Celebration Event");
    const [description, setDescription] = useState("Join us at PARCO Sendai to celebrate the 2024 birthday of Yuji Itadori, the beloved protagonist from Jujutsu Kaisen!");
    const [locationName, setLocationName] = useState("PARCO Sendai");
    const [locationLink, setLocationLink] = useState("https://maps.app.goo.gl/K5cnmkfopP9LpUK36");
    const [image, setImage] = useState("https://pbs.twimg.com/media/Ew1rrKcVcAI0XzW.jpg");
    const [startDate, setStartDate] = useState("2024-03-20");
    const [endDate, setEndDate] = useState("2024-03-20");
    const [startTime, setStartTime] = useState("09:00");
    const [endTime, setEndTime] = useState("20:00");

    const [isEditing, setIsEditing] = useState({
        eventName: false,
        description: false,
        locationName: false,
        locationLink: false,
        startDate: false,
        endDate: false,
        startTime: false,
        endTime: false,
    });

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImage(URL.createObjectURL(file));
        }
    };

    const removeImage = () => {
        setImage(null);
    };

    const toggleEdit = (field) => {
        setIsEditing((prevState) => ({
            ...prevState,
            [field]: !prevState[field],
        }));
    };

    const isFormComplete = eventName && description && locationName && locationLink;

    const handleSubmit = () => {
        console.log("Form submitted");
    };

    return (
        <div className="edit-event-page flex flex-col items-center justify-center min-h-screen bg-gray-100 p-8 overflow-y-auto">
            <div className="content-container bg-white rounded-lg shadow-lg w-full max-w-3xl p-6">
                <div className="header-section flex items-center justify-start w-full mb-8 relative">
                    <BackButton />
                    <h2 className="text-3xl font-bold ml-3">Edit Event Details</h2>
                </div>

                <div className="image-upload-section flex flex-col items-center mb-8">
                    <div className="image-frame w-full bg-gray-200 rounded-md flex items-center justify-center mb-4 relative" style={{ aspectRatio: '16 / 9' }}>
                        {image ? (
                            <div className="relative w-full h-full">
                                <img src={image} alt="Uploaded" className="w-full h-full object-cover rounded-md" />
                                <button 
                                    onClick={removeImage}
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
                    {/* Event Name */}
                    <div className="flex items-center">
                        <label className="block text-lg font-semibold mb-2">Event Name</label>
                        <FaEdit className="ml-2 cursor-pointer text-gray-500 hover:text-[#508C9B] mb-2" onClick={() => toggleEdit("eventName")} />
                    </div>
                    {isEditing.eventName ? (
                        <div className="flex items-center">
                            <input
                                type="text"
                                value={eventName}
                                onChange={(e) => setEventName(e.target.value)}
                                className="w-full border border-gray-300 rounded-md p-3"
                            />
                            <FaCheck className="ml-2 cursor-pointer text-gray-500 hover:[#508C9B]" onClick={() => toggleEdit("eventName")} />
                        </div>
                    ) : (
                        <p>{eventName}</p>
                    )}

                    {/* Description */}
                    <div className="flex items-center">
                        <label className="block text-lg font-semibold mb-2">Description</label>
                        <FaEdit className="ml-2 cursor-pointer text-gray-500 hover:[#508C9B] mb-2" onClick={() => toggleEdit("description")} />
                    </div>
                    {isEditing.description ? (
                        <div className="flex items-center">
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full border border-gray-300 rounded-md p-3"
                                placeholder="Enter event description"
                                rows="4"
                            ></textarea>
                            <FaCheck className="ml-2 cursor-pointer text-gray-500 hover:[#508C9B]" onClick={() => toggleEdit("description")} />
                        </div>
                    ) : (
                        <p>{description}</p>
                    )}

                    {/* Location Name */}
                    <div className="flex items-center">
                        <label className="block text-lg font-semibold mb-2">Location</label>
                        <FaEdit className="ml-2 cursor-pointer text-gray-500 hover:text-[#508C9B] mb-2" onClick={() => toggleEdit("locationName")} />
                    </div>
                    {isEditing.locationName ? (
                        <div className="flex items-center">
                            <input
                                type="text"
                                value={locationName}
                                onChange={(e) => setLocationName(e.target.value)}
                                className="w-full border border-gray-300 rounded-md p-3"
                            />
                            <FaCheck className="ml-2 cursor-pointer text-gray-500 hover:text-[#508C9B]" onClick={() => toggleEdit("locationName")} />
                        </div>
                    ) : (
                        <p>{locationName}</p>
                    )}

                    {/* Location Link */}
                    <div className="flex items-center">
                        <label className="block text-lg font-semibold mb-2">Location Link</label>
                        <FaEdit className="ml-2 cursor-pointer text-gray-500 hover:text-[#508C9B] mb-2" onClick={() => toggleEdit("locationLink")} />
                    </div>
                    {isEditing.locationLink ? (
                        <div className="flex items-center">
                            <input
                                type="text"
                                value={locationLink}
                                onChange={(e) => setLocationLink(e.target.value)}
                                className="w-full border border-gray-300 rounded-md p-3"
                            />
                            <FaCheck className="ml-2 cursor-pointer text-gray-500 hover:text-[#508C9B]" onClick={() => toggleEdit("locationLink")} />
                        </div>
                    ) : (
                        <p className="w-full">
                            <a href={locationLink} target="_blank" rel="noopener noreferrer" className="text-black hover:underline hover:text-blue-600">
                                {locationLink}
                            </a>
                        </p>
                    )}

                    {/* Start Date */}
                    <div className="flex items-center">
                        <label className="block text-lg font-semibold mb-2">Start Date</label>
                        <FaEdit className="ml-2 cursor-pointer text-gray-500 hover:text-[#508C9B] mb-2" onClick={() => toggleEdit("startDate")} />
                    </div>
                    {isEditing.startDate ? (
                        <div className="flex items-center">
                            <input
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="w-full border border-gray-300 rounded-md p-3"
                            />
                            <FaCheck className="ml-2 cursor-pointer text-gray-500 hover:text-[#508C9B]" onClick={() => toggleEdit("startDate")} />
                        </div>
                    ) : (
                        <p>{startDate}</p>
                    )}

                    {/* End Date */}
                    <div className="flex items-center">
                        <label className="block text-lg font-semibold mb-2">End Date</label>
                        <FaEdit className="ml-2 cursor-pointer text-gray-500 hover:text-[#508C9B] mb-2" onClick={() => toggleEdit("endDate")} />
                    </div>
                    {isEditing.endDate ? (
                        <div className="flex items-center">
                            <input
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="w-full border border-gray-300 rounded-md p-3"
                            />
                            <FaCheck className="ml-2 cursor-pointer text-gray-500 hover:text-[#508C9B]" onClick={() => toggleEdit("endDate")} />
                        </div>
                    ) : (
                        <p>{endDate}</p>
                    )}

                    {/* Start Time */}
                    <div className="flex items-center">
                        <label className="block text-lg font-semibold mb-2">Start Time</label>
                        <FaEdit className="ml-2 cursor-pointer text-gray-500 hover:text-[#508C9B] mb-2" onClick={() => toggleEdit("startTime")} />
                    </div>
                    {isEditing.startTime ? (
                        <div className="flex items-center">
                            <input
                                type="time"
                                value={startTime}
                                onChange={(e) => setStartTime(e.target.value)}
                                className="w-full border border-gray-300 rounded-md p-3"
                            />
                            <FaCheck className="ml-2 cursor-pointer text-gray-500 hover:text-[#508C9B]" onClick={() => toggleEdit("startTime")} />
                        </div>
                    ) : (
                        <p>{startTime}</p>
                    )}

                    {/* End Time */}
                    <div className="flex items-center">
                        <label className="block text-lg font-semibold mb-2">End Time</label>
                        <FaEdit className="ml-2 cursor-pointer text-gray-500 hover:text-[#508C9B] mb-2" onClick={() => toggleEdit("endTime")} />
                    </div>
                    {isEditing.endTime ? (
                        <div className="flex items-center">
                            <input
                                type="time"
                                value={endTime}
                                onChange={(e) => setEndTime(e.target.value)}
                                className="w-full border border-gray-300 rounded-md p-3"
                            />
                            <FaCheck className="ml-2 cursor-pointer text-gray-500 hover:text-[#508C9B]" onClick={() => toggleEdit("endTime")} />
                        </div>
                    ) : (
                        <p>{endTime}</p>
                    )}
                </div>

                <div className="footer-section flex justify-center mt-8">
                    <button
                        onClick={handleSubmit}
                        className={`w-full bg-[#508C9B] text-white py-3 rounded-md text-lg font-semibold hover:bg-[#134B70] ${
                            !isFormComplete ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                        disabled={!isFormComplete}
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditEvent;
