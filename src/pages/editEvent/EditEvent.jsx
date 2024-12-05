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
tiasss — 今天18:37
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaPhotoVideo, FaEdit, FaCheck } from "react-icons/fa";
import BackButton from "../../components/backbutton/BackButton";
import axios from "axios";
展开
message.txt
11 KB
﻿
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaPhotoVideo, FaEdit, FaCheck } from "react-icons/fa";
import BackButton from "../../components/backbutton/BackButton";
import axios from "axios";

const EditEvent = () => {
    const { eventId } = useParams(); // Get the event ID from the URL
    console.log("Event ID:", eventId);


    const navigate = useNavigate();

    // States to manage event data
    const [inputs, setInputs] = useState({
        eventName: "",
        description: "",
        locationName: "",
        link: "",
        start_date: "",
        end_date: "",
        start_time: "",
        end_time: "",
    });
    const [image, setImage] = useState(null); // New image to upload
    const [existingImage, setExistingImage] = useState(""); // Existing image URL
    const [isEditing, setIsEditing] = useState({}); // Track editable fields
    const [loading, setLoading] = useState(false); // Handle submission state
    const [err, setErr] = useState(null); // Handle errors

    const formatDate = (date) => {
        const options = { year: "numeric", month: "long", day: "numeric" };
        return new Date(date).toLocaleDateString(undefined, options);
    };
    const formatTime = (timeString) => {
        if (!timeString) return ""; // Handle empty/null cases
        const [hours, minutes] = timeString.split(":");
        return `${hours}:${minutes}`; // Return "HH:mm"
    };


    // Fetch event details on component load
    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                const res = await axios.get(`http://localhost:8800/api/event/${eventId}`, {
                    withCredentials: true,
                });
                const event = res.data;
                setInputs({
                    eventName: event.eventName,
                    description: event.description,
                    locationName: event.locationName,
                    link: event.link,
                    start_date: formatDate(event.start_date),
                    end_date: formatDate(event.end_date),
                    start_time: formatTime(event.start_time),
                    end_time: formatTime(event.end_time),
                });

                setExistingImage(event.img); // Load existing image
            } catch (error) {
                console.error("Failed to fetch event details:", error);
                setErr("Failed to load event details. Please try again.");
            }
        };
        fetchEventDetails();
    }, [eventId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log("Field changed:", name, value);
        setInputs((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const removeImage = () => {
        setImage(null);
        setExistingImage("");
    };

    const toggleEdit = (field) => {
        setIsEditing((prevState) => ({
            ...prevState,
            [field]: !prevState[field],
        }));
    };

    const handleSubmit = async () => {
        setLoading(true);
        setErr(null);

        try {
            // Validate required fields before making the API call
            if (!inputs.eventName || !inputs.start_date || !inputs.end_date) {
                setErr("Please fill out all required fields.");
                setLoading(false);
                return;
            }

            // Optional image upload logic
            let uploadedFileUrl = existingImage;
            if (image) {
                const formData = new FormData();
                formData.append("file", image);

                const uploadResponse = await axios.post(
                    "http://localhost:8800/api/uploads/file",
                    formData,
                    {
                        headers: { "Content-Type": "multipart/form-data" },
                        withCredentials: true,
                    }
                );

                uploadedFileUrl = uploadResponse.data.url;
            }

            // Map frontend variables to match database column names
            const editEvent = {
                eventName: inputs.eventName,
                description: inputs.description,
                locationName: inputs.locationName,
                link: inputs.link,
                start_date: inputs.start_date,
                end_date: inputs.end_date,
                start_time: inputs.start_time || null,
                end_time: inputs.end_time || null,
                img: uploadedFileUrl,
            };


            // Make the PUT request to update the event and location
            await axios.put(
                `http://localhost:8800/api/event/${eventId}`,
                editEvent,
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );

            navigate(`/event/${eventId}`); // Redirect to event detail page
        } catch (error) {
            console.error("Failed to update event:", error);
            setErr("Failed to save changes. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (!inputs.eventName) return <p className="text-center text-gray-500">Loading event details...</p>;

    return (
        <div className="edit-event-page flex flex-col items-center justify-center min-h-screen bg-gray-100 p-8 overflow-y-auto">
            <div className="content-container bg-white rounded-lg shadow-lg w-full max-w-3xl p-6">
                <div className="header-section flex items-center justify-start w-full mb-8 relative">
                    <BackButton onClick={() => navigate(`/event/${eventId}`)} />
                    <h2 className="text-3xl font-bold ml-3">Edit Event Details</h2>
                </div>

                {/* Image Section */}
                <div className="image-upload-section flex flex-col items-center mb-8">
                    <div
                        className="image-frame w-full bg-gray-200 rounded-md flex items-center justify-center mb-4 relative"
                        style={{ aspectRatio: "16 / 9" }}
                    >
                        {image ? (
                            <img
                                src={URL.createObjectURL(image)}
                                alt="Uploaded"
                                className="w-full h-full object-cover rounded-md"
                            />
                        ) : existingImage ? (
                            <img
                                src={existingImage}
                                alt="Event"
                                className="w-full h-full object-cover rounded-md"
                            />
                        ) : (
                            <label className="add-image-button flex flex-col items-center text-gray-500 hover:text-gray-700 cursor-pointer">
                                <FaPhotoVideo className="text-3xl mb-2" />
                                <span>Insert Image</span>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="hidden"
                                />
                            </label>
                        )}
                        {(image || existingImage) && (
                            <button
                                onClick={removeImage}
                                className="absolute top-1 right-1 font-bold text-red-500 text-6xl hover:text-red-700 h-12 w-12 rounded-full"
                                aria-label="Remove image"
                            >
                                &times;
                            </button>
                        )}
                    </div>
                </div>

                {/* Form Fields */}
                <div className="form-section space-y-6">
                    {Object.entries(inputs).map(([field, value]) => (
                        <div key={field} className="mb-4">
                            <div className="flex items-center">
                                <label className="block text-lg font-semibold mb-2 capitalize">
                                    {field.replace("_", " ")}
                                </label>
                                <FaEdit
                                    className="ml-2 cursor-pointer text-gray-500 hover:text-[#508C9B]"
                                    onClick={() => toggleEdit(field)}
                                />
                            </div>
                            {isEditing[field] ? (
                                <div className="flex items-center">
                                    <input
                                        type={field.includes("date") ? "date" : field.includes("time") ? "time" : "text"}
                                        name={field}
                                        value={value}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded-md p-3"
                                    />
                                    <FaCheck
                                        className="ml-2 cursor-pointer text-gray-500 hover:text-[#508C9B]"
                                        onClick={() => toggleEdit(field)}
                                    />
                                </div>
                            ) : (
                                <p>{value}</p>
                            )}
                        </div>
                    ))}
                </div>

                {/* Submit Button */}
                <div className="footer-section flex justify-center mt-8">
                    <button
                        onClick={handleSubmit}
                        className={`w-full bg-[#508C9B] text-white py-3 rounded-md text-lg font-semibold hover:bg-[#134B70] ${loading ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                        disabled={loading}
                    >
                        {loading ? "Saving..." : "Save Changes"}
                    </button>
                </div>
                {err && <p className="text-red-500 text-center mt-4">{err}</p>}
            </div>
        </div>
    );
};

export default EditEvent;
message.txt
11 KB