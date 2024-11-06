import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaArrowLeft,FaEllipsisV } from 'react-icons/fa';
import useScrollDirection from '../../hooks/useScrollDirection';
import MapComponent from '../../components/map/MapComponent';
import BackButton from '../../components/backbutton/BackButton';
import Post from '../../components/post/Post'; 
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
        // Additional events can be added here if needed
    };

    const event = eventData[id] || {};
    const participants = event.participants || [];

    // Sample data for posts related to the event
        const eventPosts = [
            {
                user: {
                    name: 'Ichigo',
                    username: 'ichigo',
                    profilePic: 'https://i.pinimg.com/564x/db/46/81/db4681a9b78f6305a8befe28ca02e8cb.jpg',
                },
                time: '10:00 AM', // Separate the time
                eventName: 'Sung Hyeonje Birthday Party🎂', // Add event name as a separate field
                content: 'What a wonderful event! Can\'t wait to see everyone there.',
                image: 'https://i.pinimg.com/474x/22/fd/8c/22fd8c474753173569f5ec106978718a.jpg',
                likes: 45,
                comments: [
                    { username: 'BlackFlame', profilePic: 'https://static1.personality-database.com/profile_images/8b28017ec040491cb89ecf24b031e536.png', text: 'Looking forward to it!' },
                    { username: 'Honeypot2512', profilePic: 'https://pbs.twimg.com/profile_images/1535154420043788289/VpKXcleb_400x400.jpg', text: 'Excited!' },
                ],
            },
            // Add more posts as needed
        ];

    const handleProfileLink = (username) => {
        console.log(`Navigate to profile of ${username}`);
    };

    return (
        <div className="event-detail-page flex flex-col items-center justify-start min-h-screen bg-gray-100 p-8 overflow-y-hidden">
            {/* Box Container for Top Section */}
            <div className="top-section-container bg-white rounded-t-lg shadow-lg w-full max-w-3xl p-6">
                <div className="header-section flex items-center justify-start mb-8 relative">
                    <BackButton onClick={() => console.log("Back button clicked")} /> 
                    <h2 className="text-3xl font-bold ml-4">{event.eventName || "Event Not Found"}</h2>
                    <button className="ml-auto text-gray-600 hover:text-gray-800">
                        <FaEllipsisV className="text-xl" />
                    </button>
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
                        <>
                            {/* Display Event Posts Using Post Component */}
                            {eventPosts.map((post, index) => (
                                <Post
                                    key={index}
                                    user={post.user}
                                    time={post.time}
                                    eventName={post.eventName} // Pass the event name
                                    content={post.content}
                                    image={post.image}
                                    likes={post.likes}
                                    comments={post.comments}
                                    onProfileClick={handleProfileLink}
                                />
                            ))}
                        </>
                    )}

                </div>
            </div>
        </div>
    );
};

export default EventDetail;
