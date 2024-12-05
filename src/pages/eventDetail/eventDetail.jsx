import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaEllipsisV } from "react-icons/fa";
import { makeRequest } from "../../axios";
import BackButton from "../../components/backbutton/BackButton";
import LeaveEvent from "../../components/leaveEvent/LeaveEvent";
import DeleteEvent from "../../components/deleteEvent/DeleteEvent";

const EventDetail = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [participant, setParticipant] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab, setActiveTab] = useState("Participants");
  const [showOptions, setShowOptions] = useState(false);
  const [isLeavePopupOpen, setIsLeavePopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const navigate = useNavigate();
  const optionsRef = useRef(null);
  const buttonRef = useRef(null);

  // Navigate to participant profile
  const handleNavigateToProfile = (userId) => {
    navigate(`/profile/${userId}`);
  };

  // Fetch current user information
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await makeRequest.get("/auth/current-user", {
          withCredentials: true,
        });
        setCurrentUser(response.data);
      } catch (err) {
        console.error("Failed to fetch current user:", err);
        navigate("/login");
      }
    };
    fetchCurrentUser();
  }, [navigate]);

  // Fetch event details and participants
  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const eventResponse = await makeRequest.get(`/event/${eventId}`, {
          withCredentials: true,
        });
        setEvent(eventResponse.data);
      } catch (err) {
        console.error("Failed to fetch event details:", err);
        navigate("/");
      }
    };

    const fetchEventParticipants = async () => {
      try {
        const response = await makeRequest.get(`/participant/joined/${eventId}`);
        setParticipant(response.data.participant);
      } catch (err) {
        console.error("Failed to fetch participants for event:", err);
      }
    };

    if (eventId) {
      fetchEventDetails();
      fetchEventParticipants();
    }
  }, [eventId, navigate]);

  // Determine if the current user is the creator or a participant
  const isCreator = event?.creator === currentUser?.id;
  const isParticipant =
    participant?.some((participant) => participant.userId === currentUser?.id) || false;

  // Toggle options dropdown visibility
  const toggleOptions = () => setShowOptions(!showOptions);

  // Handle navigation to edit event page
  const handleEditEvent = () => navigate(`/edit-event/${eventId}`);

  // Handle leaving an event
  const handleLeaveEvent = async () => {
    try {
      await makeRequest.post("/api/event/leave", { eventId });
      console.log("Successfully left the event!");
      setIsLeavePopupOpen(false);
      navigate("/");
    } catch (err) {
      console.error("Failed to leave the event:", err);
    }
  };

  // Handle deleting an event
  const handleDeleteEvent = async () => {
    try {
      await makeRequest.delete(`/api/event/${eventId}`);
      console.log("Event deleted successfully!");
      setIsDeletePopupOpen(false);
      navigate("/");
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
        setShowOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Show loading while fetching data
  if (!event || !currentUser) return <div>Loading...</div>;

  return (
    <div className="event-detail-page flex flex-col items-center justify-start min-h-screen bg-gray-100 p-8">

      {/* Top section */}
      <div className="top-section bg-white rounded-lg shadow-md w-full max-w-3xl p-6">
        <div className="flex items-center justify-between">
        {/* Back button */}
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
                className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg border z-50"
              >
                {isCreator && (
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
                )}
                {isParticipant && !isCreator && (
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

        {/* Event image */}
        {event.img && (
          <div className="image-section w-full mb-8">
            <div
              className="image-frame w-full bg-gray-200 rounded-md mb-4 relative"
              style={{ aspectRatio: "16 / 9" }}
            >
              <img
                src={event.img}
                alt="Event"
                className="w-full h-full object-cover rounded-md"
              />
            </div>
          </div>
        )}

        {/* Event description */}
        <div className="w-full">
          <h3 className="text-lg font-semibold mb-2">Description</h3>
          <p className="text-gray-700 mb-4">{event.description}</p>

          <h3 className="text-lg font-semibold mb-2">Location</h3>
          <div className="flex flex-col space-y-1">
            <p className="text-gray-700 mb-4">{event.locationName || "Location not specified."}</p>
            {event.locationLink && (
              <a
                href={event.locationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline mb-4"
              >
                View Location on Map
              </a>
            )}
          </div>

          {/* Event date and time */}
          <h3 className="text-lg font-semibold mb-2">Date & Time</h3>
          <p className="text-gray-600">
            {new Date(event.start_date).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}{" "}
            -{" "}
            {new Date(event.end_date).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </p>
          <p className="text-gray-600 mb-4">
            {event.start_time && event.end_time
              ? `from ${event.start_time.slice(0, 5)} to ${event.end_time.slice(0, 5)}`
              : ""}
          </p>

          {/* Creator information */}
          {event.creatorName && (
            <div className="flex items-center text-black-600 mb-4" 
            onClick={() => handleNavigateToProfile(event.CreatorId)}>
              <strong className="mr-2">Event Creator:</strong>
              <img
                src={event.creatorProfilePic}
                alt={`${event.creatorName}'s profile`}
                className="w-8 h-8 rounded-full object-cover mr-2"
              />
              <span className="cursor-pointer font-semibold text-gray-700 text-base hover:underline">
                {event.creatorName}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Dynamic Tabs */}
      <div className="navbar-section w-full max-w-3xl mt-0 rounded-lg sticky top-0 z-10">
        <div className="flex justify-around border-b-2 border-gray-300 bg-white">
          <button
            onClick={() => setActiveTab("Participants")}
            className={`py-2 px-4 ${
              activeTab === "Participants" ? "border-b-4 border-[#508C9B] font-bold" : "text-gray-600"
            }`}
          >
            Participants
          </button>
          <button
            onClick={() => setActiveTab("Posts")}
            className={`py-2 px-4 ${
              activeTab === "Posts" ? "border-b-4 border-[#508C9B] font-bold" : "text-gray-600"
            }`}
          >
            Posts
          </button>
        </div>
      </div>

      {/* Tabs Content */}
      {activeTab === "Participants" && (
        <ParticipantsTab
          event={event}
          participant={participant}
          handleNavigateToProfile={handleNavigateToProfile}
        />
      )}
      {activeTab === "Posts" && <PostsTab eventId={eventId} />}

      {/* Leave Event Modal */}
      <LeaveEvent
        isOpen={isLeavePopupOpen}
        onClose={() => setIsLeavePopupOpen(false)}
        onLeave={handleLeaveEvent}
      />
      {/* Delete Event Modal */}
      <DeleteEvent
        isOpen={isDeletePopupOpen}
        onClose={() => setIsDeletePopupOpen(false)}
        onDelete={handleDeleteEvent}
      />
    </div>
  );
};

// DetailsTab Component
const ParticipantsTab = ({ event, participant, handleNavigateToProfile }) => (
  <div className="participants-tab w-full max-w-3xl bg-white rounded-lg shadow-md p-6">
    {participant.length > 0 ? (
      participant.map((participantItem) => (
        <div
          key={participantItem.id}
          className="flex items-center space-x-3 p-2 rounded-md cursor-pointer hover:bg-gray-100"
          onClick={() => handleNavigateToProfile(participantItem.userId)}
        >
          <img
            src={participantItem.participantImg}
            alt={participantItem.participantName}
            className="w-10 h-10 rounded-full object-cover"
          />
          <span className="text-gray-800 hover:underline">
            {participantItem.participantName}
          </span>
        </div>
      ))
    ) : (
      <p className="text-gray-500">No participants yet.</p>
    )}
  </div>
);

// PostsTab Component
const PostsTab = ({ eventId }) => (
  <div className="posts-tab w-full max-w-3xl bg-white rounded-lg shadow-md p-6">
    <h3 className="text-lg font-semibold mb-2">Posts</h3>
    <p>Posts for event {eventId} will appear here.</p>
  </div>
);

export default EventDetail;
