ichigozzz
ichigozzz
在线
sorry for gossiping

ichigozzz 重命名频道为：sorry for — 2024/9/29 23:39
ichigozzz 重命名频道为：sorry for gossip — 2024/9/29 23:39
ichigozzz发起了一次持续2 小时的语音通话。 — 2024/9/29 23:39
tiasss — 2024/9/30 0:54
hehehehehehehehehheheehehehhe
ichigozzz 重命名频道为：sorry for gossiping — 2024/10/2 15:57
ichigozzz发起了一次持续3 小时的语音通话。 — 2024/10/5 22:45
หวานเจี๊ยบ — 2024/10/5 22:50
start-dfs.sh
start-yarn.sh
ichigozzz — 2024/10/6 0:16
why i cant turn on my microphone
helpppp
i ll change my device
หวานเจี๊ยบ — 2024/10/6 1:22
Login/Register (Done)
Feed page (Done)
Create New Post
Notification (Done)
Message (Done)
Direct Message (Done)
Search page
Comments Page
Profile (Done)
Edit Profile
Follow/Unfollow
Delete Post
Create Events
Event page
ichigozzz — 2024/10/6 1:32
https://images.app.goo.gl/Ef3u5ohgSfVtZ7yS6
www.google.com
Events – List with Search Filter ShortCode - Documentation ...
Found on Google from docs.mage-people.com
Events – List with Search Filter ShortCode - Documentation ...
tiasss发起了一次持续39 分钟的语音通话。 — 2024/10/6 21:41
ichigozzz — 2024/10/6 21:54
Videos to watch when you need to refresh:

https://www.youtube.com/watch?v=AZovvBgRLIY

https://www.youtube.com/watch?v=OoEpfb6yga8
YouTube
Cloudera, Inc.
Apache Hadoop & Big Data 101: The Basics
图片
YouTube
Hortonworks
Basic Introduction to Apache Hadoop
图片
ichigozzz — 2024/10/6 22:06
https://www.youtube.com/watch?v=kEb-LJB23Ns
YouTube
Sriw World of Coding
Ultimate Guide: Setting Up Apache Spark in Anaconda for Jupyter Not...
图片
tiasss — 2024/10/7 1:03
!apt-get update # Update apt-get repository.
!apt-get install openjdk-8-jdk-headless -qq > /dev/null # Install Java.
!wget -q http://archive.apache.org/dist/spark/spark-3.1.1/spark-3.1.1-bin-hadoop3.2.tgz # Download Apache Sparks.
!tar xf spark-3.1.1-bin-hadoop3.2.tgz # Unzip the tgz file.
!pip install -q findspark # Install findspark. Adds PySpark to the System path during runtime.

Set environment variables
import os
os.environ["JAVA_HOME"] = "/usr/lib/jvm/java-8-openjdk-amd64"
os.environ["SPARK_HOME"] = "/content/spark-3.1.1-bin-hadoop3.2"

!ls

Initialize findspark
import findspark
findspark.init()

Create a PySpark session
from pyspark.sql import SparkSession
spark = SparkSession.builder.master("local[*]").getOrCreate()
spark
!apt-get update # Update apt-get repository.
!apt-get install openjdk-8-jdk-headless -qq > /dev/null # Install Java.
!wget -q http://archive.apache.org/dist/spark/spark-3.1.1/spark-3.1.1-bin-hadoop3.2.tgz # Download Apache Sparks.
!tar xf spark-3.1.1-bin-hadoop3.2.tgz # Unzip the tgz file.
!pip install -q findspark # Install findspark. Adds PySpark to the System path during runtime.
展开
message.txt
1 KB
您错过了一次来自หวานเจี๊ยบ的，持续8 分钟的语音通话。 — 2024/10/18 0:23
tiasss — 2024/10/18 0:27
图片
หวานเจี๊ยบ发起了一次持续2 小时的语音通话。 — 2024/11/1 1:06
tiasss — 2024/11/25 18:35
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=dbkakraiyatae31
DB_NAME=meetro
您错过了一次来自หวานเจี๊ยบ的，持续几秒的语音通话。 — 2024/11/25 18:45
ichigozzz — 2024/11/26 1:28
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV, faHeart, faCommentAlt, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
展开
Profile.jsx
6 KB
tiasss发起了一次持续4 分钟的语音通话。 — 2024/11/30 22:19
ichigozzz发起了一次持续1 小时的语音通话。 — 2024/12/2 10:48
tiasss — 昨天20:19
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'dbkakraiyatae31'; 
tiasss — 今天18:28
import React, { useState, useMemo, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaPen } from "react-icons/fa";
import Event from "../../components/event/Event";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
展开
message.txt
8 KB
﻿
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
message.txt
8 KB