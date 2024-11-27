// import React, { useState, useEffect, useRef } from 'react';
// import { useParams } from 'react-router-dom';
// import { FaArrowLeft, FaEllipsisV, FaPen, FaCommentDots, FaArrowUp } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';
// import useScrollDirection from '../../hooks/useScrollDirection';
// import MapComponent from '../../components/map/MapComponent';
// import BackButton from '../../components/backbutton/BackButton';
// import Post from '../../components/post/Post'; 
// import SHJ from '../../assets/shj.jpg';
// import LeaveEvent from '../../components/leaveEvent/LeaveEvent';
// import DeleteEvent from '../../components/deleteEvent/DeleteEvent';

// const EventDetail = () => {
//     const { id } = useParams();
//     const [activeTab, setActiveTab] = useState('Details');
//     const [showOptions, setShowOptions] = useState(false); // State to control options box visibility
//     const [isLeavePopupOpen, setIsLeavePopupOpen] = useState(false); 
//     const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);

//     const navigate = useNavigate();

//     // Example of a current logged-in user for role checking
//     const currentUser = 'ichigo'; // Replace with actual current user identifier

//     const eventData = { // each event detail, including participants
//         1: {
//             eventName: "Seong Hyeonje Birthday Party🎂",
//             description: "Greeting Hunters, you are all invited to the Seseong guild leader's birthday party!",
//             locationName: "Seseong Guild building, Seoul, South Korea",
//             latitude: 37.5665, // Example latitude for Seoul
//             longitude: 126.9780, // Example longitude for Seoul
//             locationLink: "https://maps.app.goo.gl/tzBuiQTMahC2KynX7",
//             image: SHJ,
//             startDate: "30 August 2024",
//             endDate: "31 August 2024",
//             startTime: "10:00",
//             endTime: "17:00",
//             creatorProfilePic: "https://payhip.com/cdn-cgi/image/format=auto/https://pe56d.s3.amazonaws.com/o_1i5b6afha13qt1ti2hht1dsi1ql515.png",
//             eventCreator: "Chain3008",
//             participants: [
//                 { id: 1, username: 'BlackFlame', profilePic: 'https://static1.personality-database.com/profile_images/8b28017ec040491cb89ecf24b031e536.png' },
//                 { id: 2, username: 'Honeypot2512', profilePic: 'https://pbs.twimg.com/profile_images/1535154420043788289/VpKXcleb_400x400.jpg' },
//                 { id: 3, username: 'SnowBunnyBYR', profilePic: 'https://64.media.tumblr.com/d211ccfb8f77569e08d21b8a31b16c80/8d6ab8101b440cec-9d/s250x250_c1/ffb41bca040a68772c4ac69ee2295a376b4b2d48.jpg' },
//                 { id: 4, username: 'GoldForge', profilePic: 'https://i.pinimg.com/736x/a0/eb/3b/a0eb3b7bd43f1760c7faa41da47eb2af.jpg' },
//                 { id: 5, username: 'ichigo', profilePic: 'https://i.pinimg.com/564x/db/46/81/db4681a9b78f6305a8befe28ca02e8cb.jpg' }
//             ],
//             posts: [
//                 {
//                     user: {
//                         name: 'ichigo',
//                         username: 'ichigo',
//                         profilePic: 'https://i.pinimg.com/564x/db/46/81/db4681a9b78f6305a8befe28ca02e8cb.jpg',
//                     },
//                     time: '10:00 AM',
//                     eventName: 'Sung Hyeonje Birthday Party🎂',
//                     content: 'What a wonderful event! Can\'t wait to see everyone there.',
//                     image: 'https://i.pinimg.com/474x/22/fd/8c/22fd8c474753173569f5ec106978718a.jpg',
//                     likes: 6,
//                     comments: [
//                         { username: 'BlackFlame', profilePic: 'https://static1.personality-database.com/profile_images/8b28017ec040491cb89ecf24b031e536.png', text: 'Looking forward to it!' },
//                         { username: 'Honeypot2512', profilePic: 'https://pbs.twimg.com/profile_images/1535154420043788289/VpKXcleb_400x400.jpg', text: 'Excited!' },
//                         { username: 'SnowBunnyBYR', profilePic: 'https://64.media.tumblr.com/d211ccfb8f77569e08d21b8a31b16c80/8d6ab8101b440cec-9d/s250x250_c1/ffb41bca040a68772c4ac69ee2295a376b4b2d48.jpg', text: 'It was amazing!' },
//                         { username: 'ichigo', profilePic: 'https://i.pinimg.com/564x/db/46/81/db4681a9b78f6305a8befe28ca02e8cb.jpg', text: 'Great memories!' },
//                     ],
//                 },
//             ],
//         },
//         2: {
//             eventName: "2024 Yuji Birthday Celebration Event",
//             description: "Join us at PARCO Sendai to celebrate the 2024 birthday of Yuji Itadori, the beloved protagonist from Jujutsu Kaisen!",
//             locationName: "PARCO Sendai",
//             latitude: 38.2605,
//             longitude: 140.8824,
//             locationLink: "https://maps.app.goo.gl/K5cnmkfopP9LpUK36",
//             image: "https://pbs.twimg.com/media/Ew1rrKcVcAI0XzW.jpg",
//             startDate: "20 March 2024",
//             endDate: "20 March 2024",
//             startTime: "09:00",
//             endTime: "20:00",
//             eventCreator: "ichigo",
//             creatorProfilePic: "https://i.pinimg.com/564x/db/46/81/db4681a9b78f6305a8befe28ca02e8cb.jpg",
//             participants: [],
//             posts: [],
//         },
//         3: {
//             eventName: "WONHUI Wedding",
//             description: "The magical union of Wonwoo and Junhui. Join us for their wedding ceremony at the iconic Myeong-dong Cathedral!",
//             locationName: "Myeong-dong Cathedral",
//             latitude: 37.5630,
//             longitude: 126.9827,
//             locationLink: "https://maps.app.goo.gl/LKooRbcS719gwobu8",
//             image: "https://i.pinimg.com/736x/3f/c3/36/3fc3364d923319dc23cc04b86bae6604.jpg",
//             startDate: "10 June 2024",
//             endDate: "17 July 2024",
//             startTime: "06:40",
//             endTime: "18:40",
//             eventCreator: "ichigo",
//             creatorProfilePic: "https://i.pinimg.com/564x/db/46/81/db4681a9b78f6305a8befe28ca02e8cb.jpg",
//             participants: [],
//             posts: [],
//         },
//         // Additional events can be added here if needed
//     };

//     const event = eventData[id] || {};
//     const participants = event.participants || [];
//     const eventPosts = event.posts || [];

//     const optionsRef = useRef(null); // Reference for the options box
//     const buttonRef = useRef(null); // Reference for the options button

//     // Determine user role based on whether they are the event creator
//     const userRole = currentUser === event.eventCreator ? 'creator' : 'participant';

//     const handleProfileLink = (username) => {
//         console.log(`Navigate to profile of ${username}`);
//     };

//     const toggleOptions = () => {
//         setShowOptions(!showOptions);
//     };

//     const handleEditEvent = () => {
//         navigate(`/edit-event/${id}`);
//     };

//     const handleEditPost = () => {
//         console.log("Edit post");
//     };

//     const handleDeletePost = () => {
//         console.log("Delete post");
//     };

//     const handleCreatePost = () => {
//         navigate(`/event/${id}/create-post`); // Navigate to CreatePost page with event ID
//     };

//     const toggleShowAllComments = () => {
//         setShowAllComments((prev) => !prev);
//     };

//     const handleChatButtonClick = () => {
//         navigate(`/event/${id}/chat`, { state: { eventName: event.eventName } });
//     };    

//     {/*Leave Event Popup Handle Section*/}
//     const handleOpenLeavePopup = () => setIsLeavePopupOpen(true);
//     const handleCloseLeavePopup = () => setIsLeavePopupOpen(false);

//     const handleLeaveEvent = () => {
//         console.log('User has left the event');
//         setIsLeavePopupOpen(false);
//         // Add your logic for leaving the event here
//     };

//     {/*Delete Event Popup Handle Section*/}
//     const handleOpenDeletePopup = () => setIsDeletePopupOpen(true);
//     const handleCloseDeletePopup = () => setIsDeletePopupOpen(false);

//     const handleDeleteEvent = () => {
//         console.log('Event deleted!');
//         setIsDeletePopupOpen(false);
//         navigate('/'); // Navigate back to home or another page after deletion
//     };

//        // Close options box when clicking outside
//     useEffect(() => {
//         const handleClickOutside = (event) => {
//             if (
//                 optionsRef.current && !optionsRef.current.contains(event.target) &&
//                 buttonRef.current && !buttonRef.current.contains(event.target)
//             ) {
//                 setShowOptions(false); // Close options if clicking outside
//             }
//         };
        
//         document.addEventListener('mousedown', handleClickOutside);
//         return () => {
//             document.removeEventListener('mousedown', handleClickOutside);
//         };
//     }, []);

//     return (
//         <div className="event-detail-page flex flex-col items-center justify-start min-h-screen bg-gray-100 p-8 overflow-y-hidden">
//             {/* Box Container for Top Section */}
//             <div className="top-section-container bg-white rounded-t-lg shadow-lg w-full max-w-3xl p-6">
//                 <div className="header-section flex items-center justify-start mb-8 relative">
//                     <BackButton onClick={() => navigate('/')} />
//                     <h2 className="text-3xl font-bold ml-4">{event.eventName || "Event Not Found"}</h2>
                    
//                     {/* Options Button */}
//                     <div className="relative ml-auto">
//                         <button ref={buttonRef} onClick={toggleOptions} className="text-gray-600 hover:text-gray-800">
//                             <FaEllipsisV className="text-xl" />
//                         </button>

//                         {/* Options Box */}
//                         {showOptions && (
//                             <div 
//                                 ref={optionsRef} // Attach ref to options box
//                                 className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg border border-gray-200 z-50"
//                             >
//                                 {userRole === 'creator' ? (
//                                     <>
//                                         <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700" onClick={handleEditEvent}> Edit Event </button>
                                        
//                                         <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700" onClick={handleOpenDeletePopup}>Delete Event</button>
//                                     </>
//                                 ) : (
//                                     <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700" onClick={handleOpenLeavePopup}>Leave Event</button>
//                                 )}
//                             </div>
//                         )}

//                         {/* LeaveEvent Popup */}
//                         <LeaveEvent
//                             isOpen={isLeavePopupOpen}
//                             onClose={handleCloseLeavePopup}
//                             onLeave={handleLeaveEvent}
//                         />

//                         {/* DeleteEvent Popup */}
//                         <DeleteEvent
//                             isOpen={isDeletePopupOpen}
//                             onClose={handleCloseDeletePopup}
//                             onLeave={handleDeleteEvent}
//                         />
//                     </div>

//                 </div>

//                 {/* Image Section */}
//                 <div className="image-section w-full mb-8">
//                     {event.image && (
//                         <div className="image-frame w-full bg-gray-200 rounded-md mb-4 relative" style={{ aspectRatio: '16 / 9' }}>
//                             <img src={event.image} alt="Event" className="w-full h-full object-cover rounded-md" />
//                         </div>
//                     )}
//                 </div>

//                 {/* Event Description */}
//                 <div className="w-full">
//                     <h3 className="text-lg font-semibold mb-2">Description</h3>
//                     <p className="text-gray-700 mb-4">{event.description || "No description available."}</p>

//                     {/* Date & Time */}
//                     <h3 className="text-lg font-semibold mb-2">Date & Time</h3>
//                     <p className="text-gray-600">
//                         {event.startDate ? `${event.startDate} - ${event.endDate || "End date not specified."}` : "Date not specified."}
//                     </p>
//                     <p className="text-gray-600 mb-4">
//                         {event.startTime && event.endTime ? `from ${event.startTime} to ${event.endTime}` : ""}
//                     </p>

//                     {/* Event Creator */}
//                     {event.eventCreator && (
//                     <div className="flex items-center text-black-600 mb-4">
//                         <strong className="mr-2">Event Creator:</strong>
//                         <img 
//                             src={event.creatorProfilePic} 
//                             alt={`${event.eventCreator}'s profile`} 
//                             className="w-8 h-8 rounded-full object-cover mr-2"
//                         />
//                         <span className="cursor-pointer font-semibold text-gray-700 text-base hover:underline">
//                             {event.eventCreator}
//                         </span>
//                     </div>
//                 )}


//                     {/* Join Event Button for participants only */}
//                     {userRole === 'participant' && (
//                         <div className="flex justify-end mt-4">
//                             <button className="px-6 py-2 bg-[#508C9B] text-white hover:bg-[#134B70] rounded-lg transition">
//                                 Join Event
//                             </button>
//                         </div>
//                     )}

//                 </div>
//             </div>

//             {/* Floating Action Buttons */}
//             <button 
//                 className="fixed bottom-24 right-8 bg-[#508C9B] hover:bg-[#134B70] text-white p-4 rounded-full shadow-lg transition focus:outline-none"
//                 onClick={handleChatButtonClick}
//             >
//                 <FaCommentDots className="text-xl" />
//             </button>
//             <button 
//                 className="fixed bottom-8 right-8 bg-[#508C9B] hover:bg-[#134B70] text-white p-4 rounded-full shadow-lg transition focus:outline-none"
//                 onClick={handleCreatePost}
//             >
//                 <FaPen className="text-xl" />
//             </button>         

//             {/* Navbar Section */}
//             <div className="navbar-section w-full max-w-3xl mt-0 rounded-lg sticky top-0 z-10">
//                 <div className="flex justify-around border-b-2 border-gray-300 bg-white">
//                     <button
//                         onClick={() => setActiveTab('Details')}
//                         className={`py-2 px-4 ${activeTab === 'Details' ? 'border-b-4 border-[#508C9B] font-bold' : 'text-gray-600'}`}
//                     >
//                         Details
//                     </button>
//                     <button
//                         onClick={() => setActiveTab('Posts')}
//                         className={`py-2 px-4 ${activeTab === 'Posts' ? 'border-b-4 border-[#508C9B] font-bold' : 'text-gray-600'}`}
//                     >
//                         Posts
//                     </button>
//                 </div>

//                 {/* Content for Each Tab */}
//                 <div className="tab-content mt-6">
//                     {activeTab === 'Details' && (
//                         <div className="details-content text-gray-700">
//                             <div className="location-box bg-white shadow-md rounded-lg flex p-4 mb-6">
//                                 <div className="location-details w-1/2 pr-4 flex flex-col justify-center">
//                                     <h4 className="text-lg font-semibold text-black ml-2 mb-2 mt-2">Location</h4>
//                                     <p className="text-gray-600 ml-2 mb-2">{event.locationName || "Location not specified."}</p>
//                                     {event.locationLink ? (
//                                         <a href={event.locationLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 ml-2 hover:underline">
//                                             View Location on Map
//                                         </a>
//                                     ) : (
//                                         <p className="text-gray-500"></p>
//                                     )}
//                                 </div>

//                                 {event.locationLink ? (
//                                     <div className="map w-1/2">
//                                         <MapComponent
//                                             latitude={event.latitude}
//                                             longitude={event.longitude}
//                                             locationName={event.locationName}
//                                         />
//                                     </div>
//                                 ) : (
//                                     <div className="map w-1/2 flex items-center justify-center">
//                                         <p className="text-gray-500 text-center">Map Not Available</p>
//                                     </div>

//                                 )}
//                             </div>

//                             {/* Participants Section */}
//                             <div className="participants-section bg-white rounded-lg shadow-md p-4">
//                                 <h3 className="text-lg font-semibold text-black ml-2 mb-2 mt-2">Participants</h3>
//                                 {participants.length > 0 ? (
//                                     <div className="participants-list flex flex-col space-y-2">
//                                         {participants.map((participant) => (
//                                             <div key={participant.id} className="flex items-center space-x-3 p-2 rounded-md">
//                                                 <img
//                                                     src={participant.profilePic}
//                                                     alt={`${participant.username}'s profile`}
//                                                     className="w-12 h-12 rounded-full object-cover"
//                                                 />
//                                                 <span
//                                                     className="cursor-pointer font-semibold text-base text-gray-700 hover:underline"
//                                                     onClick={() => handleProfileLink(participant.username)}
//                                                 >
//                                                     {participant.username}
//                                                 </span>
//                                             </div>
//                                         ))}
//                                     </div>
//                                 ) : (
//                                     <p className="text-gray-500 text-center">This event has no participants yet.</p>
//                                 )}
//                             </div>
//                         </div>
//                     )}

//                     {activeTab === 'Posts' && (
//                         <>
//                             {eventPosts.length > 0 ? (
//                                 eventPosts.map((post, index) => (
//                                     <Post
//                                         key={index}
//                                         user={post.user}
//                                         time={post.time}
//                                         eventName={post.eventName}
//                                         content={post.content}
//                                         image={post.image}
//                                         likes={post.likes}
//                                         comments={post.comments}
//                                         onProfileClick={(username) => console.log(`Navigate to profile of ${username}`)}
//                                         onEdit={handleEditPost}
//                                         onDelete={handleDeletePost}
//                                         currentUser={currentUser}
//                                     />
//                                 ))
//                             ) : (
//                                 <div className="bg-white border rounded-lg p-6 max-w-3xl mx-auto text-center mt-6 shadow-md">
//                                     <p className="text-gray-500">This event has no posts yet.</p>
//                                 </div>
//                             )}
//                         </>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default EventDetail;

import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaEllipsisV, FaPen, FaCommentDots } from "react-icons/fa";
import { makeRequest } from "../../axios";
import MapComponent from "../../components/map/MapComponent";
import BackButton from "../../components/backbutton/BackButton";
import LeaveEvent from "../../components/leaveEvent/LeaveEvent";
import DeleteEvent from "../../components/deleteEvent/DeleteEvent";

const EventDetail = () => {
  const { eventId } = useParams(); // Get the event ID from the route
  const [event, setEvent] = useState(null); // State to store event details
  const [currentUser, setCurrentUser] = useState(null); // State to store current user info
  const [showOptions, setShowOptions] = useState(false); // Toggle options dropdown visibility
  const [isLeavePopupOpen, setIsLeavePopupOpen] = useState(false); // Toggle leave event popup
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false); // Toggle delete event popup
  const navigate = useNavigate(); // Navigation handler
  const optionsRef = useRef(null); // Reference for options dropdown
  const buttonRef = useRef(null); // Reference for options button

  // Fetch current user data
  useEffect(() => {
    const fetchCurrentUser = async () => {
        try {
          const response = await makeRequest.get("/auth/current-user");
          setCurrentUser(response.data); // Set current user data
        } catch (err) {
          console.error("Failed to fetch current user:", err);
          navigate("/login"); // Redirect to login if user is not authenticated
        }
      };
      

    fetchCurrentUser();
  }, [navigate]);
  
  

  // Fetch event details based on event ID
  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        console.log("Fetching event details for eventId:", eventId); 
        const response = await makeRequest.get(`/event/${eventId}`);
        console.log("Fetched event data:", response.data); 
        setEvent(response.data); 
      } catch (err) {
        console.error("Failed to fetch event details:", err); 
        navigate("/"); 
      }
    };
  
    fetchEventDetails();
  }, [eventId, navigate]);
  
  

  // Determine if the current user is the creator of the event
  const userRole = event?.eventCreator === currentUser?.username ? "creator" : "participant";

  // Toggle options dropdown visibility
  const toggleOptions = () => setShowOptions(!showOptions);

  // Handle navigation to edit event page
  const handleEditEvent = () => navigate(`/edit-event/${id}`);

  // Handle joining an event
  const handleJoinEvent = async () => {
    try {
      await axios.post("/api/event/join", { eventId: id });
      console.log("Successfully joined the event!");
      // Optionally refetch the event data to update participants
    } catch (err) {
      console.error("Failed to join the event:", err);
    }
  };

  // Handle leaving an event
  const handleLeaveEvent = async () => {
    try {
      await axios.post("/api/event/leave", { eventId: id });
      console.log("Successfully left the event!");
      setIsLeavePopupOpen(false); // Close the leave event popup
    } catch (err) {
      console.error("Failed to leave the event:", err);
    }
  };

  // Handle deleting an event
  const handleDeleteEvent = async () => {
    try {
      await axios.delete(`/api/event/${id}`);
      console.log("Event deleted successfully!");
      setIsDeletePopupOpen(false); // Close the delete event popup
      navigate("/"); // Redirect to home page
    } catch (err) {
      console.error("Failed to delete the event:", err);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        optionsRef.current &&
        !optionsRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setShowOptions(false); // Close dropdown if clicking outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Return loading indicator while fetching data
  if (!event || !currentUser) return <div>Loading...</div>;

  return (
    <div className="event-detail-page flex flex-col items-center justify-start min-h-screen bg-gray-100 p-8">
      {/* Top section */}
      <div className="top-section bg-white rounded-lg shadow-md w-full max-w-3xl p-6">
        <div className="flex items-center justify-between">
          <BackButton onClick={() => navigate("/")} />
          <h1 className="text-2xl font-bold">{event.eventName}</h1>
          <div className="relative">
            <button
              ref={buttonRef}
              onClick={toggleOptions}
              className="text-gray-600 hover:text-gray-800"
            >
              <FaEllipsisV />
            </button>
            {showOptions && (
              <div
                ref={optionsRef}
                className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg border"
              >
                {userRole === "creator" ? (
                  <>
                    <button
                      onClick={handleEditEvent}
                      className="w-full px-4 py-2 text-left hover:bg-gray-100"
                    >
                      Edit Event
                    </button>
                    <button
                      onClick={() => setIsDeletePopupOpen(true)}
                      className="w-full px-4 py-2 text-left hover:bg-gray-100"
                    >
                      Delete Event
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setIsLeavePopupOpen(true)}
                    className="w-full px-4 py-2 text-left hover:bg-gray-100"
                  >
                    Leave Event
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
        <p className="text-gray-600">{event.description}</p>
        <p>
          {event.startDate} - {event.endDate}, {event.startTime} - {event.endTime}
        </p>
      </div>

      {/* Leave event popup */}
      <LeaveEvent
        isOpen={isLeavePopupOpen}
        onClose={() => setIsLeavePopupOpen(false)}
        onLeave={handleLeaveEvent}
      />

      {/* Delete event popup */}
      <DeleteEvent
        isOpen={isDeletePopupOpen}
        onClose={() => setIsDeletePopupOpen(false)}
        onDelete={handleDeleteEvent}
      />
    </div>
  );
};

export default EventDetail;