import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { FaArrowLeft, FaEllipsisV, FaPen, FaCommentDots, FaArrowUp } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import useScrollDirection from '../../hooks/useScrollDirection';
import MapComponent from '../../components/map/MapComponent';
import BackButton from '../../components/backbutton/BackButton';
import Post from '../../components/post/Post'; 
import SHJ from '../../assets/shj.jpg';

const EventDetail = () => {
    const { id } = useParams();
    const [activeTab, setActiveTab] = useState('Details');
    const [showOptions, setShowOptions] = useState(false); // State to control options box visibility

    const navigate = useNavigate();

    // Example of a current logged-in user for role checking
    const currentUser = 'Chain3008'; // Replace with actual current user identifier

    const eventData = { // each event detail, including participants
        1: {
            eventName: "Seong Hyeonje Birthday Party🎂",
            description: "Greeting Hunters, you are all invited to the Seseong guild leader's birthday party!",
            locationName: "Seseong Guild building, Seoul, South Korea",
            latitude: 37.5665, // Example latitude for Seoul
            longitude: 126.9780, // Example longitude for Seoul
            locationLink: "https://maps.app.goo.gl/tzBuiQTMahC2KynX7",
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
                { id: 5, username: 'Ichigo', profilePic: 'https://i.pinimg.com/564x/db/46/81/db4681a9b78f6305a8befe28ca02e8cb.jpg' }
            ],
            posts: [
                {
                    user: {
                        name: 'Ichigo',
                        username: 'ichigo',
                        profilePic: 'https://i.pinimg.com/564x/db/46/81/db4681a9b78f6305a8befe28ca02e8cb.jpg',
                    },
                    time: '10:00 AM',
                    eventName: 'Sung Hyeonje Birthday Party🎂',
                    content: 'What a wonderful event! Can\'t wait to see everyone there.',
                    image: 'https://i.pinimg.com/474x/22/fd/8c/22fd8c474753173569f5ec106978718a.jpg',
                    likes: 6,
                    comments: [
                        { username: 'BlackFlame', profilePic: 'https://static1.personality-database.com/profile_images/8b28017ec040491cb89ecf24b031e536.png', text: 'Looking forward to it!' },
                        { username: 'Honeypot2512', profilePic: 'https://pbs.twimg.com/profile_images/1535154420043788289/VpKXcleb_400x400.jpg', text: 'Excited!' },
                        { username: 'SnowBunnyBYR', profilePic: 'https://64.media.tumblr.com/d211ccfb8f77569e08d21b8a31b16c80/8d6ab8101b440cec-9d/s250x250_c1/ffb41bca040a68772c4ac69ee2295a376b4b2d48.jpg', text: 'It was amazing!' },
                        { username: 'Ichigo', profilePic: 'https://i.pinimg.com/564x/db/46/81/db4681a9b78f6305a8befe28ca02e8cb.jpg', text: 'Great memories!' },
                    ],
                },
            ],
        },
        // Additional events can be added here if needed
    };

    const event = eventData[id] || {};
    const participants = event.participants || [];
    const eventPosts = event.posts || [];

    const optionsRef = useRef(null); // Reference for the options box
    const buttonRef = useRef(null); // Reference for the options button

    // Determine user role based on whether they are the event creator
    const userRole = currentUser === event.eventCreator ? 'creator' : 'participant';

    const handleProfileLink = (username) => {
        console.log(`Navigate to profile of ${username}`);
    };

    const toggleOptions = () => {
        setShowOptions(!showOptions);
    };

    const handleEditPost = () => {
        console.log("Edit post");
    };

    const handleDeletePost = () => {
        console.log("Delete post");
    };

    const handleCreatePost = () => {
        navigate(`/event/${id}/create-post`); // Navigate to CreatePost page with event ID
    };

    const toggleShowAllComments = () => {
        setShowAllComments((prev) => !prev);
    };

    const handleChatButtonClick = () => {
        navigate(`/event/${id}/chat`, { state: { eventName: event.eventName } });
    };    

       // Close options box when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                optionsRef.current && !optionsRef.current.contains(event.target) &&
                buttonRef.current && !buttonRef.current.contains(event.target)
            ) {
                setShowOptions(false); // Close options if clicking outside
            }
        };
        
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="event-detail-page flex flex-col items-center justify-start min-h-screen bg-gray-100 p-8 overflow-y-hidden">
            {/* Box Container for Top Section */}
            <div className="top-section-container bg-white rounded-t-lg shadow-lg w-full max-w-3xl p-6">
                <div className="header-section flex items-center justify-start mb-8 relative">
                    <BackButton onClick={() => navigate('/')} />
                    <h2 className="text-3xl font-bold ml-4">{event.eventName || "Event Not Found"}</h2>
                    
                    {/* Options Button */}
                    <div className="relative ml-auto">
                        <button ref={buttonRef} onClick={toggleOptions} className="text-gray-600 hover:text-gray-800">
                            <FaEllipsisV className="text-xl" />
                        </button>

                        {/* Options Box */}
                        {showOptions && (
                            <div 
                                ref={optionsRef} // Attach ref to options box
                                className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg border border-gray-200 z-50"
                            >
                                {userRole === 'creator' ? (
                                    <>
                                        <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700">Edit Event</button>
                                        <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700">Delete Event</button>
                                    </>
                                ) : (
                                    <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700">Leave Event</button>
                                )}
                            </div>
                        )}
                    </div>

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
                        <div className="flex items-center text-black-600 mb-4">
                            <strong className="mr-2">Event Creator:</strong>
                            <img 
                                src="https://payhip.com/cdn-cgi/image/format=auto/https://pe56d.s3.amazonaws.com/o_1i5b6afha13qt1ti2hht1dsi1ql515.png" 
                                alt="Profile" 
                                className="w-8 h-8 rounded-full object-cover mr-2"
                            />
                            <span className="cursor-pointer font-semibold text-gray-700 text-base hover:underline">{event.eventCreator}</span>
                        </div>
                    )}

                    {/* Join Event Button for participants only */}
                    {userRole === 'participant' && (
                        <div className="flex justify-end mt-4">
                            <button className="px-6 py-2 bg-[#508C9B] text-white hover:bg-[#134B70] rounded-lg transition">
                                Join Event
                            </button>
                        </div>
                    )}

                </div>
            </div>

            {/* Floating Action Buttons */}
            <button 
                className="fixed bottom-24 right-8 bg-[#508C9B] hover:bg-[#134B70] text-white p-4 rounded-full shadow-lg transition focus:outline-none"
                onClick={handleChatButtonClick}
            >
                <FaCommentDots className="text-xl" />
            </button>
            <button 
                className="fixed bottom-8 right-8 bg-[#508C9B] hover:bg-[#134B70] text-white p-4 rounded-full shadow-lg transition focus:outline-none"
                onClick={handleCreatePost}
            >
                <FaPen className="text-xl" />
            </button>         

            {/* Navbar Section */}
            <div className="navbar-section w-full max-w-3xl mt-0 rounded-lg sticky top-0 z-10">
                <div className="flex justify-around border-b-2 border-gray-300 bg-white">
                    <button
                        onClick={() => setActiveTab('Details')}
                        className={`py-2 px-4 ${activeTab === 'Details' ? 'border-b-4 border-[#508C9B] font-bold' : 'text-gray-600'}`}
                    >
                        Details
                    </button>
                    <button
                        onClick={() => setActiveTab('Posts')}
                        className={`py-2 px-4 ${activeTab === 'Posts' ? 'border-b-4 border-[#508C9B] font-bold' : 'text-gray-600'}`}
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
                                    {event.locationLink ? (
                                        <a href={event.locationLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 ml-2 hover:underline">
                                            View Location on Map
                                        </a>
                                    ) : (
                                        <p className="text-gray-500"></p>
                                    )}
                                </div>

                                {event.locationLink ? (
                                    <div className="map w-1/2">
                                        <MapComponent
                                            latitude={event.latitude}
                                            longitude={event.longitude}
                                            locationName={event.locationName}
                                        />
                                    </div>
                                ) : (
                                    <div className="map w-1/2 flex items-center justify-center">
                                        <p className="text-gray-500 text-center">Map Not Available</p>
                                    </div>

                                )}
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
                                                <span
                                                    className="cursor-pointer font-semibold text-base text-gray-700 hover:underline"
                                                    onClick={() => handleProfileLink(participant.username)}
                                                >
                                                    {participant.username}
                                                </span>
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
                            {eventPosts.length > 0 ? (
                                eventPosts.map((post, index) => (
                                    <Post
                                        key={index}
                                        user={post.user}
                                        time={post.time}
                                        eventName={post.eventName}
                                        content={post.content}
                                        image={post.image}
                                        likes={post.likes}
                                        comments={post.comments}
                                        onProfileClick={(username) => console.log(`Navigate to profile of ${username}`)}
                                        onEdit={handleEditPost}
                                        onDelete={handleDeletePost}
                                    />
                                ))
                            ) : (
                                <div className="bg-white border rounded-lg p-6 max-w-3xl mx-auto text-center mt-6 shadow-md">
                                    <p className="text-gray-500">This event has no posts yet.</p>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EventDetail;
