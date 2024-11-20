import React, { useState } from "react";

const EditPostPopup = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      {/* Popup Container */}
      <div className="bg-[#EEEEEE] rounded-lg p-6 shadow-lg w-3/4 md:w-1/2">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h2 className="text-xl font-semibold text-[#134B70]">Edit Post</h2>
          <button
            onClick={onClose}
            className="text-[#134B70] hover:text-[#508C9B]"
          >
            Done
          </button>
        </div>

        {/* User Info */}
        <div className="flex items-center mb-4">
          <img
            src="https://voguehk.s3.ap-southeast-1.amazonaws.com/media/2024/10/24164058/Snapinsta.app_318114573_623183596255627_1221795030514672052_n_1080.jpg"
            alt="User"
            className="w-12 h-12 rounded-full mr-4"
          />
          <span className="text-[#201E43] font-bold">username1</span>
        </div>

        {/* Text Area */}
        <textarea
          placeholder="What is happening?"
          className="w-full p-3 border border-[#508C9B] rounded-md text-[#201E43] focus:outline-none focus:ring-2 focus:ring-[#134B70] mb-4"
          rows={3}
        ></textarea>

        {/* Media Section */}
        <div className="flex space-x-4 mb-4">
          {/* Image Placeholder */}
          <div className="w-20 h-20 border-2 border-dashed border-[#508C9B] flex items-center justify-center rounded-md">
            <span className="text-[#508C9B] text-2xl">+</span>
          </div>
          {/* Existing Images */}
          <img
            src="https://via.placeholder.com/150"
            alt="Existing"
            className="w-20 h-20 object-cover rounded-md"
          />
          <img
            src="https://via.placeholder.com/150"
            alt="Existing"
            className="w-20 h-20 object-cover rounded-md"
          />
        </div>

        {/* Upload Button */}
        <button className="flex items-center justify-center w-full p-2 bg-[#134B70] text-[#EEEEEE] rounded-md hover:bg-[#508C9B]">
          <span>Upload Image/Video</span>
        </button>
      </div>
    </div>
  );
};

export default EditPostPopup;
