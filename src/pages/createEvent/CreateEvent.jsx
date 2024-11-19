import React, { useState } from 'react';
import { FaPhotoVideo, FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const CreateEvent = () => {
    const [eventName, setEventName] = useState("");
    const [description, setDescription] = useState("");
    const [locationName, setLocationName] = useState("");
    const [locationLink, setLocationLink] = useState("");
    const [image, setImage] = useState(null);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");

    const navigate = useNavigate();

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImage(URL.createObjectURL(file));
        }
    };
    const removeImage = () => {
        setImage(null);
    };

    const isFormComplete = eventName && description && locationName && locationLink;

    return (
        <div className="create-event-page flex flex-col items-center justify-center min-h-screen bg-gray-100 p-8 overflow-y-auto">
            {/* Main Content Container */}
            <div className="content-container bg-white rounded-lg shadow-lg w-full max-w-3xl p-6">
                {/* Header Section */}
                <div className="header-section flex items-center justify-start w-full mb-8 relative">
                    <button onClick={() => navigate('/')} className="back-button absolute left-0 bg-gray-100 text-gray-500 p-2 rounded-md hover:bg-pink-500 hover:text-white">
                        <FaArrowLeft className="text-2xl" />
                    </button>
                    <h2 className="text-3xl font-bold ml-12">Create Event</h2>
                </div>

                {/* Image Upload Section */}
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

                {/* Form Section */}
                <div className="form-section space-y-6">
                    {/* Event Name */}
                    <div>
                        <label className="block text-lg font-semibold mb-2">Event Name</label>
                        <input
                            type="text"
                            value={eventName}
                            onChange={(e) => setEventName(e.target.value)}
                            className="w-full border border-gray-300 rounded-md p-3"
                            placeholder="Enter event name"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-lg font-semibold mb-2">Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full border border-gray-300 rounded-md p-3"
                            placeholder="Enter event description"
                            rows="4"
                        ></textarea>
                    </div>

                    {/* Date & Time Section */}
                    <div className="date-time-section space-y-6">
                        <h3 className="text-lg font-semibold">Date & Time</h3>
                        
                        <div className="flex items-start space-x-6">
                            {/* Date */}
                            <div className="flex flex-col space-y-2 w-1/2">
                                <div className="flex items-center space-x-2">
                                    <div className="flex flex-col w-full">
                                        <label className="text-sm font-semibold mb-2">Start</label>
                                        <input 
                                            type="date" 
                                            className="border border-gray-300 rounded-md p-2" 
                                            value={startDate}
                                            onChange={(e) => setStartDate(e.target.value)}
                                        />
                                    </div>
                                    <span className="text-center mt-5">to</span>
                                    <div className="flex flex-col w-full">
                                        <label className="text-sm font-semibold mb-2">End</label>
                                        <input 
                                            type="date"
                                            className="w-full border border-gray-300 rounded-md p-2"
                                            value={endDate}
                                            onChange={(e) => setEndDate(e.target.value)}
                                            min={startDate}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Time */}
                            <div className="flex flex-col w-1/2 space-y-2">
                                <label className="text-sm font-semibold">Time</label>
                                <div className="flex items-center space-x-2">
                                    <input 
                                        type="time" 
                                        className="w-full border border-gray-300 rounded-md p-2"
                                        value={startTime}
                                        onChange={(e) => setStartTime(e.target.value)}
                                    />
                                    <span>-</span>
                                    <input 
                                        type="time"
                                        className="w-full border border-gray-300 rounded-md p-2"
                                        value={endTime}
                                        onChange={(e) => setEndTime(e.target.value)}
                                        min={startDate === endDate ? startTime : undefined} 
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Location Section */}
                    <div>
                        <label className="block text-lg font-semibold mb-2">Location</label>
                        <input
                            type="text"
                            value={locationName}
                            onChange={(e) => setLocationName(e.target.value)}
                            className="w-full border border-gray-300 rounded-md p-3 mb-4"
                            placeholder="Ex: King Mongkut’s University of Technology Thonburi"
                        />
                        <input
                            type="text"
                            value={locationLink}
                            onChange={(e) => setLocationLink(e.target.value)}
                            className="w-full border border-gray-300 rounded-md p-3"
                            placeholder="Ex: https://maps.app.goo.gl/7GB3bHsdE9ZHWuYG7"
                        />
                    </div>
                </div>

                {/* Create Event Button */}
                <div className="mt-8 flex justify-center">
                    <button 
                        className={`px-8 py-3 rounded-md font-semibold ${isFormComplete ? 'bg-pink-500 hover:bg-pink-600 text-white' : 'bg-pink-200 text-white cursor-not-allowed'}`}
                        disabled={!isFormComplete}
                    >
                        Create Event
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CreateEvent;
