import React from "react";

const DeleteEvent = ({ isOpen, onClose, onLeave }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#201E43] bg-opacity-50 flex items-center justify-center z-50">
      {/* Popup Box */}
      <div className="bg-[#EEEEEE] rounded-lg p-6 shadow-lg w-96 text-center">
        {/* Popup Text */}
        <h2 className="text-xl font-semibold mb-3 text-[#134B70]">
          Are you sure to delete this event?
        </h2>
        <h2 className="text-medium font-normal mb-4 text-red-600">
          This action cannot be undone
        </h2>
        <div className="flex justify-center space-x-4">
          {/* Cancel Button */}
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-400 text-[#EEEEEE] rounded-md hover:bg-gray-500 focus:ring-4 focus:ring-[#508C9B]"
          >
            Cancel
          </button>

          {/* Delete Button */}
          <button
            onClick={onLeave}
            className="px-4 py-2 bg-[#508C9B] text-[#EEEEEE] rounded-md hover:bg-[#134B70] focus:ring-4 focus:ring-[#134B70]"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteEvent;
