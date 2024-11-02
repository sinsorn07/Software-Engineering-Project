import React, { useState } from 'react';
import { FaPhotoVideo } from 'react-icons/fa';
import "./createPost.scss"; 

const CreatePost = ({ onClose }) => {
    const [description, setDescription] = useState("");

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            {/* Popup Container */}
            <div className="content-container relative w-full max-w-3xl bg-white p-6 rounded-lg shadow-lg overflow-y-auto">
                
                {/* Content Box */}
                <div className="content-box flex flex-col">
                    {/* Title & Post Button Section */}
                    <div className="title-post-section flex justify-between items-center py-2 mb-4">
                        <div className="flex items-center">

                            {/* Back Button to the left of Create Post title */}
                            <button 
                                onClick={onClose} 
                                className="back-button bg-white text-black px-2 py-2 rounded-md hover:bg-gray-200 mr-3 text-3xl">
                                &lt;
                            </button>
                            <h2 className="text-2xl font-bold">Create Post</h2>
                        </div>
                        <button className="post-button bg-pink-300 text-white px-4 py-2 rounded-md hover:bg-pink-500 active:bg-pink-600">
                            Post
                        </button>
                    </div>
                    
                    <hr className="my-2" />

                    {/* User Profile Section */}
                    <div className="user-profile-section flex items-center mb-6">
                        <img src="https://i.pinimg.com/564x/db/46/81/db4681a9b78f6305a8befe28ca02e8cb.jpg" alt="User Avatar" className="w-20 h-20 rounded-full mr-4" />
                        <span className="username font-semibold text-2xl">ichigo</span>
                    </div>

                    {/* Description Section */}
                    <div className="description-section mb-4">
                        <textarea 
                            className="description-input border border-gray-300 rounded-md w-full p-3 text-gray-600"
                            placeholder="What is happening?"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows="4"
                        />
                    </div>

                    {/* Image Upload Section */}
                    <div className="image-upload-section mb-4 grid grid-cols-3 gap-4">
                        {/* First Square: Display Image */}
                        <div className="image-upload-container border border-gray-300 rounded-md w-full h-48 flex items-center justify-center overflow-hidden">
                            <img src="https://i.pinimg.com/474x/22/fd/8c/22fd8c474753173569f5ec106978718a.jpg" 
                                alt="Uploaded" className="w-full h-full object-cover" />
                        </div>
                        
                        {/* Second Square: Plus Sign */}
                        <div className="image-upload-container border border-gray-300 rounded-md w-full h-48 flex items-center justify-center">
                            <label htmlFor="fileInput" className="cursor-pointer text-gray-400 text-3xl">
                                +
                            </label>
                            {/* add image
                            <input 
                                id="fileInput" 
                                type="file" 
                                className="hidden"
                            /> */}
                        </div>
                        
                        {/* Third Square: Empty */}
                        <div className="image-upload-container border border-white rounded-md w-full h-48"></div>
                    </div>

                    {/* Add Image/Video Button */}
                    <button className="add-image-button bg-pink-400 text-white py-2 px-4 rounded-md hover:bg-pink-500 flex items-center">
                        <FaPhotoVideo className="mr-2" />Add Image/Video
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CreatePost;
