import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import useScrollDirection from '../../hooks/useScrollDirection';
import MapComponent from '../../components/map/MapComponent'; // Ensure this path is correct
import SHJ from '../../assets/shj.jpg';

const EventDetail = () => {
    const { id } = useParams();
    const [activeTab, setActiveTab] = useState('Details');

    const eventData = { // each event detail, including participants
        1: {
            eventName: "Sung Hyeonje Birthday Party🎂",
            description: "Greeting Hunters, you are all invited to join the Sesung Guild Leader's birthday party!",
            locationName: "Seseong Guild building, Seoul, South Korea",
            latitude: 37.5665, // Example latitude for Seoul
            longitude: 126.9780, // Example longitude for Seoul
            locationLink: "https://maps.app.goo.gl/v6XtDzX3pfWMmWUm8",
            image: SHJ,
            startDate: "30 August 2024",
            endDate: "31 August 2024",
            startTime: "10:00",
            endTime: "17:00",
            eventCreator: "Chain3008",
            participants: [
                { id: 1, username: 'BlackFlame', profilePic: 'https://static1.personality-database.com/profile_images/8b28017ec040491cb89ecf24b031e536.png' },
                { id: 2, username: 'Honeypot2512', profilePic: 'https://pbs.twimg.com/profile_images/1535154420043788289/VpKXcleb_400x400.jpg' },
                { id: 3, username: 'SnowBunnyBYR', profilePic: 'https://64.media.tumblr.com/d211ccfb8f77569e08d21b8a31b16c80/8d6ab8101b440cec-9d/s250x250_c1/ffb41bca040a68772c4ac69ee2295a376b4b2d48.jpg' },
                { id: 4, username: 'GoldForge', profilePic: 'https://i.pinimg.com/736x/a0/eb/3b/a0eb3b7bd43f1760c7faa41da47eb2af.jpg' },
            ],
        },
        // Other events can be added here as needed
    };

    const event = eventData[id] || {};
    const participants = event.participants || [];

    return (
        <div className="event-detail-page flex flex-col items-center justify-start min-h-screen bg-gray-100 p-8 overflow-y-hidden">
            {/* Box Container for Top Section */}
            <div className="top-section-container bg-white rounded-t-lg shadow-lg w-full max-w-3xl p-6">
                <div className="header-section flex items-center justify-start mb-8 relative">
                    <button
                        className="back-button absolute left-0 bg-gray-100 text-gray-500 p-2 rounded-md hover:bg-pink-500 hover:text-white flex items-center mr-4"
                    >
                        <FaArrowLeft className="text-2xl" />
                    </button>
                    <h2 className="text-3xl font-bold ml-12">{event.eventName || "Event Not Found"}</h2>
                </div>

                {/* Image Section */}
                <div className="image-section w-full mb-8">
                    {event.image && (
                        <div className="image-frame w-full bg-gray-200 rounded-md mb-4 relative" style={{ aspectRatio: '16 / 9' }}>
                            <img src={event.image} alt="Event" className="w-full h-full object-cover rounded-md" />
                        </div>
                    )}
                </div>

                {/* Event Description */}
                <div className="w-full">
                    <h3 className="text-lg font-semibold mb-2">Description</h3>
                    <p className="text-gray-700 mb-4">{event.description || "No description available."}</p>
                    
                    {/* Date & Time */}
                    <h3 className="text-lg font-semibold mb-2">Date & Time</h3>
                    <p className="text-gray-600">
                        {event.startDate ? `${event.startDate} - ${event.endDate || "End date not specified."}` : "Date not specified."}
                    </p>
                    <p className="text-gray-600 mb-4">
                        {event.startTime && event.endTime ? `from ${event.startTime} to ${event.endTime}` : ""}
                    </p>

                    {/* Event Creator */}
                    {event.eventCreator && (
                        <div className="flex items-center text-gray-600 mb-4">
                            <strong className="mr-2">Event Creator:</strong>
                            <img 
                                src="https://payhip.com/cdn-cgi/image/format=auto/https://pe56d.s3.amazonaws.com/o_1i5b6afha13qt1ti2hht1dsi1ql515.png" 
                                alt="Profile" 
                                className="w-8 h-8 rounded-full object-cover mr-2"
                            />
                            <span>{event.eventCreator}</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Navbar Section */}
            <div className="navbar-section w-full max-w-3xl mt-0 rounded-lg sticky top-0 z-10">
                <div className="flex justify-around border-b-2 border-gray-300 bg-white">
                    <button
                        onClick={() => setActiveTab('Details')}
                        className={`py-2 px-4 ${activeTab === 'Details' ? 'border-b-4 border-pink-500 font-bold' : 'text-gray-600'}`}
                    >
                        Details
                    </button>
                    <button
                        onClick={() => setActiveTab('Posts')}
                        className={`py-2 px-4 ${activeTab === 'Posts' ? 'border-b-4 border-pink-500 font-bold' : 'text-gray-600'}`}
                    >
                        Posts
                    </button>
                </div>

                {/* Content for Each Tab */}
                <div className="tab-content mt-6">
                    {activeTab === 'Details' && (
                        <div className="details-content text-gray-700">
                            <div className="location-box bg-white shadow-md rounded-lg flex p-4 mb-6">
                                <div className="location-details w-1/2 pr-4 flex flex-col justify-center">
                                    <h4 className="text-lg font-semibold text-black ml-2 mb-2 mt-2">Location</h4>
                                    <p className="text-gray-600 ml-2 mb-2">{event.locationName || "Location not specified."}</p>
                                    {event.locationLink && (
                                        <a href={event.locationLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 ml-2 hover:underline">
                                            View Location on Map
                                        </a>
                                    )}
                                </div>

                                <div className="map w-1/2">
                                    <MapComponent
                                        latitude={event.latitude}
                                        longitude={event.longitude}
                                        locationName={event.locationName}
                                    />
                                </div>
                            </div>

                            {/* Participants Section */}
                            <div className="participants-section bg-white rounded-lg shadow-md p-4">
                                <h3 className="text-lg font-semibold text-black ml-2 mb-2 mt-2">Participants</h3>
                                {participants.length > 0 ? (
                                    <div className="participants-list flex flex-col space-y-2">
                                        {participants.map((participant) => (
                                            <div key={participant.id} className="flex items-center space-x-3 p-2 rounded-md">
                                                <img
                                                    src={participant.profilePic}
                                                    alt={`${participant.username}'s profile`}
                                                    className="w-12 h-12 rounded-full object-cover"
                                                />
                                                <span className="text-gray-600">{participant.username}</span>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-500 text-center">This event has no participants yet.</p>
                                )}
                            </div>
                        </div>
                    )}

                    {activeTab === 'Posts' && (
                        <div className="posts-content text-700 mt-0 bg-white rounded-lg p-4">
                            <h3 className="text-xl font-semibold mt-0 mb-4">Posts</h3>
                            {/* Sample post structure */}
                            <div className="post flex flex-col mb-6 p-4 border bg-white border-gray-200 rounded-md">
                                {/* User Profile Section */}
                                <div className="user-profile-section flex items-center mb-4">
                                    <img
                                        src="https://i.pinimg.com/564x/db/46/81/db4681a9b78f6305a8befe28ca02e8cb.jpg"
                                        alt="User Avatar"
                                        className="w-12 h-12 rounded-full mr-3"
                                    />
                                    <span className="username font-semibold text-lg">ichigo</span>
                                </div>

                                {/* Post Description */}
                                <p className="text-gray-600 mb-4">What a wonderful event! Can't wait to see everyone there.</p>

                                {/* Image Section */}
                                <div className="image-upload-section mb-4 grid grid-cols-3 gap-4">
                                    {/* Uploaded image */}
                                    <div className="image-container border border-gray-300 rounded-md w-full h-48 flex items-center justify-center overflow-hidden">
                                        <img
                                            src="https://i.pinimg.com/474x/22/fd/8c/22fd8c474753173569f5ec106978718a.jpg"
                                            alt="Uploaded"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    {/* Additional empty or placeholder spaces */}
                                    <div className="image-container border border-gray-300 rounded-md w-full h-48 flex items-center justify-center">
                                        <label htmlFor="fileInput" className="cursor-pointer text-gray-400 text-3xl">
                                            +
                                        </label>
                                        <input id="fileInput" type="file" className="hidden" />
                                    </div>
                                    <div className="image-container border border-white rounded-md w-full h-48"></div>
                                </div>
                            </div>

                            {/* Placeholder for more posts */}
                            <p className="text-gray-500 text-center">More posts will appear here as they are added.</p>
                        </div>
                    )}

                                    </div>
                                </div>
                            </div>
                        );
                    };

export default EventDetail;
