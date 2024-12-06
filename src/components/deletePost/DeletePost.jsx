// import React from "react";
// import axios from "axios";

// const DeletePost = ({ isOpen, postId, onClose, onDeleteSuccess }) => {
//   if (!isOpen) return null;

//   const handleDelete = async () => {
//     try {
//       await axios.delete(`http://localhost:8800/api/posts/${postId}`, {
//         withCredentials: true,
//       });
//       onDeleteSuccess(postId); 
//       onClose();
//     } catch (err) {
//       console.error("Failed to delete post:", err);
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-[#201E43] bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-[#EEEEEE] rounded-lg p-6 shadow-lg w-96 text-center">
//         <h2 className="text-xl font-semibold mb-3 text-[#134B70]">
//           Are you sure you want to delete this post?
//         </h2>
//         <div className="flex justify-center space-x-4">
//           <button
//             onClick={onClose}
//             className="px-4 py-2 bg-gray-400 text-[#EEEEEE] rounded-md hover:bg-gray-500 focus:ring-4 focus:ring-[#508C9B]"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={handleDelete}
//             className="px-4 py-2 bg-[#508C9B] text-[#EEEEEE] rounded-md hover:bg-[#134B70] focus:ring-4 focus:ring-[#134B70]"
//           >
//             Delete
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DeletePost;

import React from "react";
import axios from "axios";

/**
 * DeletePost Component
 * This component renders a popup confirmation for deleting a post.
 * 
 * @param {boolean} isOpen - Controls whether the popup is visible.
 * @param {string} postId - The ID of the post to be deleted.
 * @param {function} onClose - Callback to close the popup.
 * @param {function} onDeleteSuccess - Callback to notify parent on successful deletion.
 */
const DeletePost = ({ isOpen, postId, onClose, onDeleteSuccess }) => {
  // If the popup is not open, don't render anything
  if (!isOpen) return null;

  /**
   * Handles the deletion of a post.
   * Sends a DELETE request to the backend and calls the success callback upon success.
   */
  const handleDelete = async () => {
    try {
      // Send DELETE request to the backend API
      await axios.delete(`http://localhost:8800/api/posts/${postId}`, {
        withCredentials: true, // Include cookies for authentication
      });
      // Notify parent component about successful deletion
      onDeleteSuccess(postId);
      // Close the popup
      onClose();
    } catch (err) {
      console.error("Failed to delete post:", err);
    }
  };

  return (
    <div className="fixed inset-0 bg-[#201E43] bg-opacity-50 flex items-center justify-center z-50">
      {/* Popup Container */}
      <div className="bg-[#EEEEEE] rounded-lg p-6 shadow-lg w-96 text-center">
        {/* Confirmation Text */}
        <h2 className="text-xl font-semibold mb-3 text-[#134B70]">
          Are you sure you want to delete this post?
        </h2>
        {/* Buttons */}
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
            onClick={handleDelete}
            className="px-4 py-2 bg-[#508C9B] text-[#EEEEEE] rounded-md hover:bg-[#134B70] focus:ring-4 focus:ring-[#134B70]"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletePost;

