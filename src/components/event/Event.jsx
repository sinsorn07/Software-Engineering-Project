import React, { useState, useEffect } from "react";
import { FaLocationArrow } from "react-icons/fa";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext"; // ใช้ AuthContext

export default function Event({ event, isMyEventPage }) {
  const { currentUser } = useContext(AuthContext); // ดึง currentUser จาก AuthContext
  const [isJoined, setIsJoined] = useState(false); // Track if the user has joined the event

  const handleJoinEvent = async (eventId) => {
    try {
      const response = await axios.post("/event/joinEvent", {
        eventId,
        userId: currentUser.id, // ใช้ currentUser.id จาก AuthContext
      });
      if (response.status === 200) {
        setIsJoined(true); // Mark as joined if the request is successful
      }
    } catch (error) {
      console.error("Error joining event:", error);
    }
  };

  const handleJoinClick = (e) => {
    e.preventDefault();
    if (currentUser?.id) {  // ตรวจสอบว่า currentUser มีค่า id หรือไม่
      handleJoinEvent(event.id);
    } else {
      alert("Please log in to join the event.");
    }
  };
    
  return (
    <div className="overflow-hidden relative w-full rounded-2xl bg-zinc-50 border border-zinc-300">
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

      {/* Join Button */}
      {!isMyEventPage && (
        <div className="flex items-center justify-center pb-2 mb-4">
          <button
            onClick={handleJoinClick}
            className={`w-[90%] flex items-center justify-center text-white text-sm px-4 py-2 rounded-xl transition-all duration-100 ${
              isJoined ? "bg-gray-400 cursor-not-allowed" : "bg-[#508C9B] hover:bg-[#134B70]"
            }`}
            disabled={isJoined} // Disable button if already joined
          >
            {isJoined ? "Joined" : "Join"}
          </button>
        </div>
      )}
    </div>
  );
}
