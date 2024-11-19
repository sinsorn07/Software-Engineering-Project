import React from "react";
import { Link } from "react-router-dom";
import { FaLocationArrow } from "react-icons/fa";

export default function Event({ event }) {
  return (
    <div className="overflow-hidden relative w-full rounded-2xl bg-zinc-50 border border-zinc-300">
      <section className="relative h-[300px] overflow-hidden">
        <img
          src={event.image}
          alt={event.eventName}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        />
      </section>
      <section className="p-6">
        <h1 className="text-base font-medium">{event.eventName}</h1>
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

        <div className="pb-2 mt-4">
          <Link
            to="/"
            className="flex items-center justify-center bg-[#508C9B]  hover:bg-[#134B70] text-white text-sm px-4 py-2 rounded-xl transition-all duration-100"
          >
            Join
          </Link>
        </div>
      </section>
    </div>
  );
}
