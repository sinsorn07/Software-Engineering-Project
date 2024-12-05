import React, { useState, useMemo, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaPen } from "react-icons/fa";
import Event from "../../components/event/Event";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { AuthContext } from "../../context/authContext";

export default function Home() {
  // Fetching events from the backend using React Query
  const { isLoading, error, data } = useQuery({
    queryKey: ["event"], // Unique key for caching event data
    queryFn: () => makeRequest.get("/event").then((res) => res.data),
  });

  // Accessing the current user from AuthContext
  const { currentUser } = useContext(AuthContext);

  // React Router's navigation hook
  const navigate = useNavigate();

  // States for search and filter
  const [filter, setFilter] = useState("latest"); // Default filter is "latest"
  const [searchText, setSearchText] = useState(""); // Search text input

  const [joinedEvents, setJoinedEvents] = useState([]); // Track joined events globally

  // Filtering and searching logic memoized for optimization
  const filteredEvents = useMemo(() => {
    if (!data) return [];
    return data
      .filter((event) => {
        if (filter === "latest") return true; // Show all events by default
        if (filter === "hit") return event.isPopular; // Show popular events
        return true; // Default fallback
      })
      .filter((event) =>
        event.eventName.toLowerCase().includes(searchText.toLowerCase())
      ); // Search filtering
  }, [data, filter, searchText]);

  // Helper function for date formatting
  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  // Function to handle joining an event
  const handleJoinEvent = async (eventId) => {
    if (!currentUser) {
      alert("Please log in to join events.");
      return;
    }

    try {
      // Send eventId and userId to the backend
      const response = await makeRequest.post("/event/join", {
        eventId,
        userId: currentUser.id, // Include userId from AuthContext
      });

      if (response.status === 200) {
        alert("You have successfully joined the event!");
        setJoinedEvents((prev) => [...prev, eventId]); // Update joined events
      } else {
        throw new Error("Failed to join the event.");
      }
    } catch (error) {
      console.error("Failed to join the event:", error);
      alert("An error occurred while trying to join the event.");
    }
  };

  const handleJoinClick = (event, eventId) => {
    event.preventDefault(); // Prevent default behavior like page reload
    handleJoinEvent(eventId); // Call the join event logic
  };


  // Function to navigate to the event detail page
  const handleEventDetail = (eventId) => {
    navigate(`/event/${eventId}`); // Redirect to the event detail page
  };


  return (
    <div className="flex flex-col w-full h-full overflow-y-scroll bg-gray-100">
      <header className="py-8 bg-[#508C9B] shadow-lg">
        <div className="w-[80%] mx-auto relative">
          <label className="text-lg font-bold text-[#201E43]" htmlFor="search">
            Explore Events
          </label>
          <form
            className="mt-3"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="search"
              id="search"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full border border-gray-300 outline-0 px-4 py-2 rounded-2xl text-sm text-gray-800 bg-white placeholder-[#201E43] focus:border-indigo-500 transition-all duration-100"
              placeholder="Search events..."
            />
          </form>
        </div>
      </header>

      <hr />

      <div className="relative flex flex-col py-8 w-[80%] mx-auto">
        <div className="flex items-center gap-2">
          <label htmlFor="filter" className="text-gray-800">
            Filter
          </label>
          <select
            id="filter"
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
            className="border outline-0 px-2.5 py-1 text-sm text-gray-800 bg-white rounded-xl focus:border-indigo-600 transition-all duration-100"
          >
            <option value="hit">Hit</option>
            <option value="latest">Latest</option>
            <option value="name">Name</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6">
          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-red-500">Error: {error.message || "Something went wrong!"}</p>
          ) : (
            filteredEvents.map((event) => (
              <Event
                key={event.eventId}
                event={{
                  ...event,
                  isJoined: joinedEvents.includes(event.eventId), // Pass joined state
                  eventId: event.eventId,
                  eventName: event.eventName,
                  description: event.description,
                  locationName: event.locationName,
                  startDate: formatDate(event.start_date),
                  endDate: formatDate(event.end_date),
                  image: event.img,
                }}
                onJoin={() => handleJoinEvent(event.eventId)}
                onDetail={() => handleEventDetail(event.eventId)}
                className="flex flex-col justify-between rounded-lg bg-white shadow-lg p-4"
              >
                <div className="flex flex-col gap-2">
                  <img
                    src={`http://localhost:8800/uploads/${event.img}`}
                    alt={event.eventName}
                    className="h-48 w-full rounded-lg object-cover"
                  />
                  <h3 className="text-xl font-bold text-[#201E43]">
                    {event.eventName}
                  </h3>
                  <p className="text-sm text-gray-600">{event.description}</p>
                  <p className="text-sm text-gray-500">
                    {formatDate(event.start_date)} - {formatDate(event.end_date)}
                  </p>
                  <p className="text-sm text-gray-500">
                    <span className="text-[#508C9B] font-semibold">
                      {event.locationName || "Location not provided"}
                    </span>
                  </p>
                </div>
                <button
                  className="mt-auto rounded-full bg-[#508C9B] px-6 py-2 text-white hover:bg-[#134B70] transition-all duration-200"
                  onClick={(event) => handleJoinClick(event, event.eventId)}
                >
                  Join
                </button>
              </Event>
            ))
          )}
        </div>
        <Link
        to="/create-event"
        className="flex items-center justify-center text-white fixed bottom-8 right-8 rounded-full w-[48px] h-[48px] bg-[#508C9B] hover:bg-[#134B70] transition-all duration-100 shadow-xl"
      >
        <FaPen className="text-md" />
      </Link>
      </div>
    </div>
  );
}
