import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaPen } from "react-icons/fa";
import Event from "../../components/event/Event";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import FullCalendar from "@fullcalendar/react"; // FullCalendar React component
import dayGridPlugin from "@fullcalendar/daygrid"; // FullCalendar day grid plugin
import interactionPlugin from "@fullcalendar/interaction"; // To handle user interactions
import { useNavigate } from 'react-router-dom';

export default function MyEvent() {
  const [selectedDate, setSelectedDate] = useState(null); // Selected date
  const [filter, setFilter] = useState("latest"); // Default filter
  const [searchText, setSearchText] = useState(""); // Search input text
  const [events, setEvents] = useState([]); // All events fetched from the backend

  // Fetch events from backend
  const { isLoading, error, data } = useQuery({
    queryKey: ["userEvents"],
    queryFn: () =>
      makeRequest.get("/event/user").then((res) =>
        res.data.map((event) => ({
          title: event.eventName,
          start: event.start_date,
          end: event.end_date,
          participantCount: event.participantCount,
          extendedProps: { ...event },
        }))
      ),
  });

  useEffect(() => {
    if (data) setEvents(data);
  }, [data]);

  // Handle date click
  const handleDateClick = (info) => {
    const clickedDate = new Date(info.dateStr);
    
    if (selectedDate && clickedDate.toISOString().split("T")[0] === selectedDate.toISOString().split("T")[0]) {
      setSelectedDate(null); // Deselect the date on double-click
    } else {
      setSelectedDate(clickedDate); // Select the new date
    }
  };

  // Highlight the selected date
  const dayCellClassNames = (date) => {
    const dateStr = new Date(date.date);
    dateStr.setDate(dateStr.getDate() + 1); // Adjust by subtracting 1 day
    if (selectedDate && dateStr.toISOString().split("T")[0] === selectedDate.toISOString().split("T")[0]) {
      return "bg-[#508C9B] text-white"; // Highlight selected date
    }
    return "";
  };


  // Filter and search functionality
  const filteredEvents = events.filter((event) => {
    if (filter === "latest") return true; // No filter applied for latest, just sorting
    if (filter === "hit") return true; // No filter applied for hit, just sorting
    if (filter === "name") return true; // No filter applied for name, just sorting
    return true;
  }).sort((a, b) => {
    if (filter === "hit") {
      return b.participantCount - a.participantCount; // Sort by participant count descending
    }
    if (filter === "name") {
      return a.title.localeCompare(b.title); // Sort alphabetically by event name
    }
    if (filter === "latest") {
      return new Date(b.start) - new Date(a.start); // Sort by start date descending
    }
    return 0; // No sorting for other filters
  });

  

  const searchedEvents = filteredEvents.filter((event) =>
    event.title.toLowerCase().includes(searchText.toLowerCase())
  );

  const dateFilteredEvents = searchedEvents.filter((event) => {
    if (!selectedDate) return true;
    const eventDates = event.extendedProps.dateRange || [];
    const selectedDateStr = selectedDate.toISOString().split("T")[0];
    return eventDates.includes(selectedDateStr);
  });

  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  const navigate = useNavigate();

  // Navigate to event detail page
  const handleEventDetail = (eventId) => {
  navigate(`/event/${eventId}`);
  };

  return (
    <div className="flex flex-col w-full h-full overflow-y-scroll bg-gray-100">
      {/* Header Section */}
      <header className="py-8 bg-[#508C9B] shadow-lg">
        <div className="w-[80%] mx-auto relative">
          <label className="text-lg font-bold text-[#201E43]" htmlFor="search">
            My Events
          </label>
          <form
            className="mt-3"
            onSubmit={(e) => {
              e.preventDefault();
            }}
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

      {/* Main Content */}
      <div className="relative flex flex-col py-8 w-[80%] mx-auto">
        {/* FullCalendar Section */}
        <div className="mt-6 flex justify-center items-center">
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={events} // Events fetched from the backend
            dateClick={handleDateClick} // Handle date clicks
            dayCellClassNames={dayCellClassNames} // Add class to selected date
            eventClassNames={() => "bg-red-500 text-white rounded"} // Red styling for event markers
            dayMaxEventRows={true}
            height="auto"
            contentHeight="auto"
          />
        </div>

        {/* Filter Section */}
        <div className="flex items-center gap-2 mt-6">
          <label htmlFor="filter" className="text-gray-800">
            Filter
          </label>
          <select
            id="filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border outline-0 px-2.5 py-1 text-sm text-gray-800 bg-white rounded-xl focus:border-indigo-600 transition-all duration-100"
          >
            <option value="hit">Hit</option>
            <option value="latest">Latest</option>
            <option value="name">Name</option>
          </select>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Something went wrong!</p>
          ) : dateFilteredEvents.length === 0 ? (
            <p className="text-gray-600 text-center col-span-2">
              No events available for the selected date.
            </p>
          ) : (
            dateFilteredEvents.map((event, index) => (
              <div onClick={() => handleEventDetail(event.extendedProps.id)} key={index}>
              <Event
                key={index}
                event={{
                  eventName: event.title,
                  description: event.extendedProps.description,
                  locationName: event.extendedProps.locationName,
                  startDate: formatDate(event.start),
                  endDate: formatDate(event.end),
                  image: event.extendedProps.img,
                }}
                isMyEventPage={true} // Hide the join button
              />
              </div>
            ))
          )}
        </div>


      </div>
    </div>
  );
}
