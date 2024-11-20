import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaPen } from "react-icons/fa";
import Event from "../../components/event/Event"; // Assuming Event component is in this path
import SHJ from '../../assets/shj.jpg';
import Calendar from 'react-calendar'; // Import react-calendar
import 'react-calendar/dist/Calendar.css'; // Add this CSS to style the calendar

export default function MyEvent() {
  const [filter, setFilter] = useState("latest");
  const [searchText, setSearchText] = useState("");
  const [events, setEvents] = useState([
    {
      id: 2,
      eventName: "2024 Yuji Birthday Celebration Event",
      description: "Join us at PARCO Sendai to celebrate the 2024 birthday of Yuji Itadori, the beloved protagonist from Jujutsu Kaisen!",
      locationName: "PARCO Sendai",
      locationLink: "https://maps.app.goo.gl/K5cnmkfopP9LpUK36",
      image: "https://pbs.twimg.com/media/Ew1rrKcVcAI0XzW.jpg",
      startDate: "2024-03-20",
      endDate: "2024-03-20",
      startTime: "09:00",
      endTime: "20:00",
    },
    {
      id: 3,
      eventName: "WONHUI Wedding",
      description: "The magical union of Wonwoo and Junhui. Join us for their wedding ceremony at the iconic Myeong-dong Cathedral!",
      locationName: "Myeong-dong Cathedral",
      locationLink: "https://maps.app.goo.gl/LKooRbcS719gwobu8",
      image: "https://i.pinimg.com/736x/3f/c3/36/3fc3364d923319dc23cc04b86bae6604.jpg",
      startDate: "2024-06-10",
      endDate: "2024-07-17",
      startTime: "06:40",
      endTime: "18:40",
    },
    {
      id: 1,
      eventName: "Seong Hyeonje Birthday Party🎂",
      description: "Greeting Hunters, you are all invited to the Seseong guild leader's birthday party!",
      locationName: "Seseong Guild building, Seoul, South Korea",
      locationLink: "https://maps.app.goo.gl/tzBuiQTMahC2KynX7",
      image: SHJ,
      startDate: "2024-08-30",
      endDate: "2024-08-31",
      startTime: "10:00",
      endTime: "17:00",
    },
  ]);

  const actionSearch = () => {
    console.log("Search text:", searchText);
  };

  const getEventDates = () => {
    // Extract dates from events and convert to Date objects for easy comparison with the calendar tile
    return events.map((event) => {
      const startDate = new Date(event.startDate);
      const endDate = new Date(event.endDate);
      const dates = [];

      // Create a list of all dates between the event start and end dates (inclusive)
      for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
        dates.push(new Date(d));
      }
      return dates;
    }).flat(); // Flatten the array to get a single list of all event dates
  };

  const eventDates = getEventDates(); // List of event dates

  useEffect(() => {
    console.log("Filter changed:", filter);
  }, [filter]);

  return (
    <div className="flex flex-col w-full h-full overflow-y-scroll bg-gray-100">
      <header className="py-8 bg-white shadow-lg">
        <div className="w-[80%] mx-auto relative">
          <label className="text-lg font-medium text-gray-800 cursor-pointer" htmlFor="calendar">
            My Event
          </label>

          {/* Center the Calendar and adjust its style */}
          <div className="mt-6 flex justify-center items-center">
            <Calendar
              className="rounded-xl border border-gray-300 shadow-md w-[90%] h-[400px]" // Increase size of calendar
              tileClassName="text-gray-800 p-4" // Add more space within each day
              nextLabel={<span className="text-gray-500">→</span>}
              prevLabel={<span className="text-gray-500">←</span>}
              // Display event indicator on the tiles
              tileContent={({ date, view }) => {
                const isEventDay = eventDates.some(
                  (eventDate) =>
                    eventDate.getFullYear() === date.getFullYear() &&
                    eventDate.getMonth() === date.getMonth() &&
                    eventDate.getDate() === date.getDate()
                );

                return isEventDay ? (
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500 mx-auto" />
                ) : null;
              }}
            />
          </div>
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
            onChange={(e) => setFilter(e.target.value)}
            className="border outline-0 px-2.5 py-1 text-sm text-gray-800 bg-white rounded-xl focus:border-indigo-600 transition-all duration-100"
          >
            <option value="hit">Hit</option>
            <option value="latest">Latest</option>
            <option value="name">Name</option>
          </select>
        </div>

        {/* Search bar */}
        <div className="mt-6">
          <form
            className="mt-3"
            onSubmit={(e) => {
              e.preventDefault();
              actionSearch();
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

        <div className="grid grid-cols-2 gap-4 mt-6">
          {events.map((event, index) => (
            <Event key={index} event={event} isMyEventPage={true} /> // Pass isMyEventPage prop to Event
          ))}
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
