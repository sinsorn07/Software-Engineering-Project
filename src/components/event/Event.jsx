import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaLocationArrow } from "react-icons/fa";

export default function Event({ event, isMyEventPage }) {
  const [isJoined, setIsJoined] = useState(false); // Track if the user has joined the event

  const handleJoinClick = (e) => {
    e.preventDefault(); // Prevent link navigation
    setIsJoined(true); // Mark as joined
  };

  return (
    <div className="overflow-hidden relative w-full rounded-2xl bg-zinc-50 border border-zinc-300">
      {/* Wrapping the entire card with a Link to navigate when clicked */}
      <Link to={`/event/${event.id}`} className="block">
        <section className="relative h-[300px] overflow-hidden">
          <img
            src={event.image}
            alt={event.eventName}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full object-cover"
          />
        </section>
        <section className="p-6">
          <h1 className="text-base font-bold text-[#201E43]">{event.eventName}</h1>
          <div className="text-sm text-zinc-700 mt-2">{event.description}</div>
          <div className="flex items-center gap-2 text-sm text-zinc-700 mt-4">
            <span>{event.startDate}</span> - <span>{event.endDate}</span>
          </div>
          <span className="flex items-center gap-2 mt-4">
            <FaLocationArrow />
            <a href={event.locationLink} target="_blank" rel="noopener noreferrer">
              {event.locationName}
            </a>
          </span>
        </section>
      </Link>

      {/* Join Button */}
      {!isMyEventPage && (
        <div className="flex items-center justify-center pb-2 mb-4">
          <button
            onClick={handleJoinClick}
            className={`flex w-[90%] items-center justify-center ${
              isJoined ? "bg-gray-400 cursor-not-allowed" : "bg-[#508C9B] hover:bg-[#134B70]"
            } text-white text-sm px-4 py-2 rounded-xl transition-all duration-100`}
            disabled={isJoined} // Disable button if already joined
          >
            {isJoined ? "Joined" : "Join"}
          </button>
        </div>
      )}
    </div>
  );
}