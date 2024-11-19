import React, { useState } from 'react';
import { FaPhotoVideo, FaArrowLeft, FaTimes } from 'react-icons/fa';

const CreatePost = ({ onClose }) => {
    const [description, setDescription] = useState("");
    const [profileImage, setProfileImage] = useState("https://i.pinimg.com/564x/db/46/81/db4681a9b78f6305a8befe28ca02e8cb.jpg");
    const [username, setUsername] = useState("ichigo");
    const [images, setImages] = useState([]);

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImages([...images, URL.createObjectURL(file)]);
        }
    };

    const removeImage = (index) => {
        setImages(images.filter((_, i) => i !== index));
    };

    const adjustTextArea = (e) => {
        e.target.style.height = 'inherit';
        e.target.style.height = `${e.target.scrollHeight}px`; 
    };

    const isFormComplete = description > 0;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            {/* Popup Container */}
            <div className="content-container relative w-full max-w-3xl bg-white p-6 rounded-lg shadow-lg overflow-y-auto">
                
                {/* Content Box */}
                <div className="content-box flex flex-col">
                    {/* Title & Post Button Section */}
                    <div className="title-post-section flex justify-between items-center py-2 mb-4">
                        {/* Back Button to the left of Create Post title */}
                        <div className="flex items-center">
                            <button onClick={onClose} className="back-button bg-gray-100 text-gray-500 p-2 rounded-md hover:bg-pink-500 hover:text-white mr-2">
                                <FaArrowLeft className="text-2xl" />
                            </button>
                            <h2 className="text-2xl font-bold">Create Post</h2>
                        </div>
                        <button 
                            className={`post-button px-4 py-2 rounded-md text-white ${isFormComplete ? 'bg-pink-500 hover:bg-pink-600' : 'bg-pink-200 cursor-not-allowed'}`}
                            disabled={!isFormComplete}
                        >
                            Post
                        </button>
                    </div>
                    
                    <hr className="my-2" />

                    {/* User Profile Section */}
                    <div className="user-profile-section flex items-center mb-6">
                        <img src={profileImage} alt="User Avatar" className="w-20 h-20 rounded-full mr-4" />
                        <span className="username font-semibold text-2xl">{username}</span>
                    </div>

                    {/* Description Section */}
                    <div className="description-section mb-4">
                        <textarea 
                            className="description-input border border-gray-300 rounded-md w-full p-3 text-gray-600"
                            placeholder="What is happening?"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            onInput={adjustTextArea}
                            rows="4"
                            style={{ overflow: 'hidden' }} 
                        />
                    </div>

                    {/* Image Upload Section */}
                    <div className="image-upload-section mb-4 grid grid-cols-3 gap-4">
                        {/* Render images in each slot */}
                        {images.length > 0 && Array.from({ length: 3 }).map((_, index) => (
                            <div key={index} className="image-upload-container border border-gray-300 rounded-md w-full h-48 flex items-center justify-center overflow-hidden relative">
                                {images[index] ? (
                                    <>
                                        <img src={images[index]} alt="Uploaded" className="w-full h-full object-cover" />
                                        <button 
                                            className="absolute top-1 right-1 text-red-500 text-xl"
                                            onClick={() => removeImage(index)}
                                        >
                                            <FaTimes />
                                        </button>
                                    </>
                                ) : index === images.length && images.length < 3 ? (
                                    // Only show the upload label if there are less than 3 images
                                    <label htmlFor="fileInput" className="cursor-pointer text-gray-400 text-3xl flex items-center justify-center w-full h-full">
                                        +
                                    </label>
                                ) : null}
                            </div>
                        ))}
                        {/* Hidden file input for image upload */}
                        <input 
                            id="fileInput" 
                            type="file" 
                            className="hidden"
                            onChange={handleImageChange}
                        />
                    </div>

                                        <label htmlFor="fileInput" className="add-image-button bg-pink-400 text-white py-2 px-4 rounded-md hover:bg-pink-500 flex items-center justify-center w-full h-12">
                                            <FaPhotoVideo className="mr-2" />Add Image/Video
                                        </label>
                                        <input 
                                            id="fileInput" 
                                            type="file" 
                                            className="hidden"
                                            onChange={handleImageChange}
                                        />
                                    </div>
                                </div>
                            </div>
                        );
                    }

export default CreatePost;