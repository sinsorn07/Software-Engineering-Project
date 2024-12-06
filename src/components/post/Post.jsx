import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Post = ({
  postId,
  userId,
  userName = "Unknown User",
  img = "",
  profilePic = "",
  description = "No description provided",
  created_datetime,
  eventName,
  onEditPost,
  onProfileClick,
  onDeleteSuccess,
}) => {
  console.log("Post component received postId:", postId);
  const [showOptions, setShowOptions] = useState(false);

  const optionsRef = useRef(null);
  const buttonRef = useRef(null);
  const navigate = useNavigate();


  // Toggle the options menu
  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const handleEditPost = () => {
    console.log("Navigating with postId:", postId);
    navigate(`/posts/${postId}/edit-post`); // Show the Edit Post popup
  };

  // Delete the post
  const handleDeletePost = () => {
    navigate(`/posts/${postId}/delete-post`); // Show the Delete Post popup
  };
    

  // Close the options menu if clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        optionsRef.current &&
        !optionsRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setShowOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
      <div className="bg-white rounded-lg shadow-md p-6 max-w-3xl mx-auto mb-6 relative">
        {/* Post Header */}
        <div className="flex items-center text-base text-gray-700 mb-4 relative">
          <img
            src={profilePic}
            alt="User"
            className="mr-2 w-10 h-10 rounded-full object-cover"
          />
          <span
            className="text-base font-semibold cursor-pointer hover:underline"
            onClick={() => onProfileClick(userId)}
          >
            {userName}
          </span>
          <span className="ml-3 text-gray-600">
            {new Date(created_datetime).toLocaleString()} &gt; {eventName}
          </span>
    
          {/* Options Button */}
          <div className="absolute right-0 top-0 z-50">
            <button ref={buttonRef} className="text-gray-600" onClick={toggleOptions}>
              <FontAwesomeIcon icon={faEllipsisV} />
            </button>
            {showOptions && (
              <div
                ref={optionsRef}
                className="absolute right-0 top-full mt-2 w-40 bg-white shadow-lg rounded-lg border border-gray-200 z-50"
              >
                {/* Option Buttons */}
                <button
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
                  onClick={handleEditPost}
                >
                  Edit Post
                </button>
                {/* <button
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
                  onClick={handleDeletePost}
                >
                  Delete Post
                </button> */}
              </div>
            )}
          </div>
        </div>
    
        {/* Post Content */}
        {description && <p className="text-gray-700 mb-3 text-base">{description}</p>}
    
        {/* Display image if available */}
        {img && img.length > 0 && (
          <div className="mb-3 grid grid-cols-2 gap-2">
            {img.map((imageUrl, index) => (
              <img
                key={index}
                src={imageUrl}
                alt={`Post Image ${index + 1}`}
                className="w-full aspect-square object-cover rounded"
              />
            ))}
          </div>
        )}
      </div>
    );
};

export default Post;

// // import React, { useState, useEffect, useRef } from "react";
// // import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// // import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
// // import EditPost from "../editPost/EditPost"; // Ensure EditPostPopup is imported correctly
// // import DeletePost from "../deletePost/DeletePost"; // Ensure DeletePostPopup is imported correctly


// // const Post = ({
// //   postId,
// //   userId,
// //   userName = "Unknown User",
// //   img = "",
// //   profilePic = "",
// //   description = "No description provided",
// //   created_datetime,
// //   eventName,
// //   currentUser,
// //   onProfileClick,
// //   onDeleteSuccess,
// // }) => {
  
// //   const [showOptions, setShowOptions] = useState(false);
// //   const [showEditPopup, setShowEditPopup] = useState(false);
// //   const [showDeletePopup, setShowDeletePopup] = useState(false);
// //   const [postContent, setPostContent] = useState(description);
// //   const [postImages, setPostImages] = useState(img);

// //   const optionsRef = useRef(null);
// //   const buttonRef = useRef(null);

// //   // Toggle the options menu
// //   const toggleOptions = () => {
// //     setShowOptions(!showOptions);
// //   };

// //   // Close options menu when clicking outside
// //   useEffect(() => {
// //     const handleClickOutside = (event) => {
// //       if (
// //         optionsRef.current &&
// //         !optionsRef.current.contains(event.target) &&
// //         buttonRef.current &&
// //         !buttonRef.current.contains(event.target)
// //       ) {
// //         setShowOptions(false);
// //       }
// //     };
// //     document.addEventListener("mousedown", handleClickOutside);
// //     return () => document.removeEventListener("mousedown", handleClickOutside);
// //   }, []);

// //   // Handle edit post success
// //   const handleEditSuccess = (updatedContent, updatedImages) => {
// //     setPostContent(updatedContent);
// //     setPostImages(updatedImages);
// //     setShowEditPopup(false);
// //   };

// //   return (
// //     <div className="bg-white rounded-lg shadow-md p-6 max-w-3xl mx-auto mb-6 relative">
// //       {/* Post Header */}
// //       <div className="flex items-center text-base text-gray-700 mb-4 relative">
// //         <img
// //           src={profilePic}
// //           alt="User"
// //           className="mr-2 w-10 h-10 rounded-full object-cover"
// //         />
// //         <span
// //           className="text-base font-semibold cursor-pointer hover:underline"
// //           onClick={() => onProfileClick(userId)}
// //         >
// //           {userName}
// //         </span>
// //         <span className="ml-3 text-gray-600">
// //           {new Date(created_datetime).toLocaleString()} &gt; {eventName}
// //         </span>

// //         {/* Options Button */}
// //         {userId === currentUser && (
// //           <div className="absolute right-0 top-0 z-50">
// //             <button
// //               ref={buttonRef}
// //               className="text-gray-600"
// //               onClick={toggleOptions}
// //             >
// //               <FontAwesomeIcon icon={faEllipsisV} />
// //             </button>
// //             {showOptions && (
// //               <div
// //                 ref={optionsRef}
// //                 className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg border border-gray-200 z-50"
// //               >
// //                 <button
// //                   className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
// //                   onClick={() => setShowEditPopup(true)}
// //                 >
// //                   Edit Post
// //                 </button>
// //                 <button
// //                   className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
// //                   onClick={() => setShowDeletePopup(true)}
// //                 >
// //                   Delete Post
// //                 </button>
// //               </div>
// //             )}
// //           </div>
// //         )}
// //       </div>

// //       {/* Post Content */}
// //       {postContent && <p className="text-gray-700 mb-3 text-base">{postContent}</p>}

// //       {/* Display Images */}
// //       {postImages && postImages.length > 0 && (
// //         <div className="mb-3 grid grid-cols-2 gap-2">
// //           {postImages.map((imageUrl, index) => (
// //             <img
// //               key={index}
// //               src={imageUrl}
// //               alt={`Post Image ${index + 1}`}
// //               className="w-full aspect-square object-cover rounded"
// //             />
// //           ))}
// //         </div>
// //       )}

// //       {/* Edit Post Popup */}
// //       {showEditPopup && (
// //         <EditPost
// //           isOpen={showEditPopup}
// //           postId={postId}
// //           onClose={() => setShowEditPopup(false)}
// //           onSaveSuccess={handleEditSuccess}
// //         />
// //       )}

// //       {/* Delete Post Popup */}
// //       {showDeletePopup && (
// //         <DeletePost
// //           isOpen={showDeletePopup}
// //           onClose={() => setShowDeletePopup(false)}
// //           onDeleteSuccess={onDeleteSuccess}
// //           postId={postId}
// //         />
// //       )}
// //     </div>
// //   );
// // };

// // // export default Post;
// import React, { useState, useEffect, useRef } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
// import EditPost from "../editPost/EditPost";
// import DeletePost from "../deletePost/DeletePost";

// const Post = ({
//   postId,
//   userId,
//   userName = "Unknown User",
//   img = [],
//   profilePic = "",
//   description = "No description provided",
//   created_datetime,
//   eventName,
//   currentUser,
//   onProfileClick,
//   onDeleteSuccess,
//   currentUserId
// }) => {
//   // Extract currentUserId from currentUser
//   const { id: currentUserId } = currentUser || {};

//   // Debugging: log the props
//   console.log("Props in Post component:", { postId, userId, currentUser });
//   console.log("Extracted currentUserId:", currentUserId);

//   const [showOptions, setShowOptions] = useState(false);
//   const [showEditPopup, setShowEditPopup] = useState(false);
//   const [showDeletePopup, setShowDeletePopup] = useState(false);
//   const [postContent, setPostContent] = useState(description);
//   const [postImages, setPostImages] = useState(img);

//   const optionsRef = useRef(null);
//   const buttonRef = useRef(null);

//   // Toggle the options menu
//   const toggleOptions = () => {
//     setShowOptions(!showOptions);
//   };

//   // Close options menu when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (
//         optionsRef.current &&
//         !optionsRef.current.contains(event.target) &&
//         buttonRef.current &&
//         !buttonRef.current.contains(event.target)
//       ) {
//         setShowOptions(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   // Handle edit post success
//   const handleEditSuccess = (updatedContent, updatedImages) => {
//     setPostContent(updatedContent);
//     setPostImages(updatedImages);
//     setShowEditPopup(false);
//   };

//   return (
//     <div className="bg-white rounded-lg shadow-md p-6 max-w-3xl mx-auto mb-6 relative">
//       {/* Post Header */}
//       <div className="flex items-center text-base text-gray-700 mb-4 relative">
//         <img
//           src={profilePic}
//           alt="User"
//           className="mr-2 w-10 h-10 rounded-full object-cover"
//         />
//         <span
//           className="text-base font-semibold cursor-pointer hover:underline"
//           onClick={() => onProfileClick(userId)}
//         >
//           {userName}
//         </span>
//         <span className="ml-3 text-gray-600">
//           {new Date(created_datetime).toLocaleString()} &gt; {eventName}
//         </span>

//         {/* Options Button */}
//         {String(userId) === String(currentUserId) && (
//           <div className="absolute right-0 top-0 z-50">
//             <button
//               ref={buttonRef}
//               className="text-gray-600"
//               onClick={toggleOptions}
//             >
//               <FontAwesomeIcon icon={faEllipsisV} />
//             </button>
//             {showOptions && (
//               <div
//                 ref={optionsRef}
//                 className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg border border-gray-200 z-50"
//               >
//                 <button
//                   className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
//                   onClick={() => setShowEditPopup(true)}
//                 >
//                   Edit Post
//                 </button>
//                 <button
//                   className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
//                   onClick={() => setShowDeletePopup(true)}
//                 >
//                   Delete Post
//                 </button>
//               </div>
//             )}
//           </div>
//         )}
//       </div>

//       {/* Post Content */}
//       {postContent && <p className="text-gray-700 mb-3 text-base">{postContent}</p>}

//       {/* Display Images */}
//       {postImages && postImages.length > 0 && (
//         <div className="mb-3 grid grid-cols-2 gap-2">
//           {postImages.map((imageUrl, index) => (
//             <img
//               key={index}
//               src={imageUrl}
//               alt={`Post Image ${index + 1}`}
//               className="w-full aspect-square object-cover rounded"
//             />
//           ))}
//         </div>
//       )}

//       {/* Edit Post Popup */}
//       {showEditPopup && (
//         <EditPost
//           isOpen={showEditPopup}
//           postId={postId}
//           onClose={() => setShowEditPopup(false)}
//           onSaveSuccess={handleEditSuccess}
//         />
//       )}

//       {/* Delete Post Popup */}
//       {showDeletePopup && (
//         <DeletePost
//           isOpen={showDeletePopup}
//           onClose={() => setShowDeletePopup(false)}
//           onDeleteSuccess={onDeleteSuccess}
//           postId={postId}
//         />
//       )}
//     </div>
//   );
// };

// export default Post;
