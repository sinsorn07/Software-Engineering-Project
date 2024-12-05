// import React, { useState, useEffect, useRef } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEllipsisV, faHeart, faCommentAlt, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
// import EditPostPopup from "../editPost/EditPost"; // Ensure EditPostPopup is imported correctly
// import DeletePostPopup from "../deletePost/DeletePost"; // Ensure DeletePostPopup is imported correctly

// const Post = ({
//     user,
//     time,
//     eventName,
//     content,
//     image,
//     likes,
//     comments,
//     currentUser, // Ensure currentUser is passed as prop
//     onProfileClick,
//     onEditPost,
//     onDeletePost,
//     onAddComment, // Function to handle adding a new comment
// }) => {
//     const [showOptions, setShowOptions] = useState(false);
//     const [liked, setLiked] = useState(false);
//     const [showCommentBox, setShowCommentBox] = useState(false);
//     const [showAllComments, setShowAllComments] = useState(false); // For showing all comments
//     const [newComment, setNewComment] = useState(""); // New comment text state
//     const [showEditPostPopup, setShowEditPostPopup] = useState(false); // To show the Edit Post popup
//     const [showDeletePostPopup, setShowDeletePostPopup] = useState(false); // To show the Delete Post popup
//     const [postContent, setPostContent] = useState(content); // Save initial content
//     const [postImage, setPostImage] = useState(image); // Save initial image

//     const optionsRef = useRef(null); 
//     const buttonRef = useRef(null);

//     const toggleOptions = () => {
//         setShowOptions(!showOptions);
//     };

//     const handleEditPost = () => {
//         setShowEditPostPopup(true); // Show the Edit Post popup
//     };

//     const handleDeletePost = () => {
//         setShowDeletePostPopup(true); // Show the Delete Post popup
//     };

//     const handleSavePost = (updatedPost) => {
//         setPostContent(updatedPost.content);
//         setPostImage(updatedPost.image);
//         setShowEditPostPopup(false); // Close the popup
//     };

//     const handleDeleteConfirmation = () => {
//         onDeletePost();
//         setShowDeletePostPopup(false); // Close the popup
//     };

//     const handleLikeToggle = () => {
//         setLiked(!liked);
//     };

//     const handleDoubleClickLike = () => {
//         if (!liked) {
//             setLiked(true);
//         }
//     };

//     const handleAddComment = () => {
//         if (newComment.trim()) {
//             onAddComment(newComment);
//             setNewComment("");
//         }
//     };

//     // Close the options menu if clicking outside of it
//     useEffect(() => {
//         const handleClickOutside = (event) => {
//             if (
//                 optionsRef.current &&
//                 !optionsRef.current.contains(event.target) &&
//                 buttonRef.current &&
//                 !buttonRef.current.contains(event.target)
//             ) {
//                 setShowOptions(false); // Close options if click outside
//             }
//         };

//         document.addEventListener("mousedown", handleClickOutside);
//         return () => {
//             document.removeEventListener("mousedown", handleClickOutside);
//         };
//     }, []);

//     return (
//         <div className="bg-white rounded-lg shadow-md p-6 max-w-3xl mx-auto mb-6 relative">
//             {/* Post Header */}
//             <div className="flex items-center text-base text-gray-700 mb-4">
//                 <img
//                     src={user.profilePic}
//                     alt="User"
//                     className="mr-2 w-10 h-10 rounded-full object-cover"
//                 />
//                 <span
//                     className="text-base font-semibold cursor-pointer hover:underline"
//                     onClick={() => onProfileClick(user.username)}
//                 >
//                     {user.name}
//                 </span>
//                 <span className="ml-3 text-gray-600">
//                     {time} > {eventName}
//                 </span>

//                 {/* Options Button */}
//                 {user.username === currentUser && (
//                     <div className="relative ml-auto">
//                         <button
//                             ref={buttonRef}
//                             className="text-gray-600"
//                             onClick={toggleOptions}
//                         >
//                             <FontAwesomeIcon icon={faEllipsisV} />
//                         </button>
//                         {showOptions && (
//                             <div
//                                 ref={optionsRef}
//                                 className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg border border-gray-200 z-50"
//                             >
//                                 <button
//                                     className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
//                                     onClick={handleEditPost}
//                                 >
//                                     Edit Post
//                                 </button>
//                                 <button
//                                     className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
//                                     onClick={handleDeletePost}
//                                 >
//                                     Delete Post
//                                 </button>
//                             </div>
//                         )}
//                     </div>
//                 )}
//             </div>

//             {/* Post Content */}
//             {content && <p className="text-gray-700 mb-3 text-base">{content}</p>}
//             {image && (
//                 <div className="mb-3" onDoubleClick={handleDoubleClickLike}>
//                     <img src={image} alt="Post" className="w-2/3 mx-auto" />
//                 </div>
//             )}

//             {/* Likes and Comments Count */}
//             <div className="flex space-x-3 text-gray-600 text-sm">
//                 <div
//                     className="flex items-center space-x-1 cursor-pointer"
//                     onClick={handleLikeToggle}
//                     onDoubleClick={handleDoubleClickLike}
//                 >
//                     <FontAwesomeIcon
//                         icon={faHeart}
//                         className={`text-2xl ${
//                             liked ? "text-red-500" : "text-gray-500"
//                         }`}
//                     />
//                     <span>{liked ? likes + 1 : likes}</span>
//                 </div>
//                 <div
//                     className="flex items-center space-x-1 cursor-pointer"
//                     onClick={() => setShowCommentBox(!showCommentBox)}
//                 >
//                     <FontAwesomeIcon
//                         icon={faCommentAlt}
//                         className="text-2xl text-gray-500"
//                     />
//                     <span>{comments.length}</span>
//                 </div>
//             </div>

//             {/* Comments Section */}
//             <div className="mt-3 text-gray-700">
//                 {(showAllComments ? comments : comments.slice(0, 2)).map(
//                     (comment, index) => (
//                         <div key={index} className="flex items-center mb-2">
//                             <img
//                                 src={comment.profilePic}
//                                 alt="Commenter"
//                                 className="mr-2 w-10 h-10 rounded-full object-cover"
//                             />
//                             <p className="text-base">
//                                 <span
//                                     className="text-gray-700 font-semibold cursor-pointer hover:underline mr-2"
//                                     onClick={() => onProfileClick(comment.username)}
//                                 >
//                                     {comment.username}
//                                 </span>
//                                 {comment.text}
//                             </p>
//                         </div>
//                     )
//                 )}
//                 {comments.length > 2 && (
//                     <button
//                         className="text-blue-600 hover:underline text-base"
//                         onClick={() => setShowAllComments(!showAllComments)}
//                     >
//                         {showAllComments ? "Show less" : "Show more"}
//                     </button>
//                 )}
//             </div>

//             {/* Comment Input Box */}
//             {showCommentBox && (
//                 <div className="mt-4 flex items-center">
//                     <textarea
//                         value={newComment}
//                         onChange={(e) => setNewComment(e.target.value)}
//                         placeholder="Write a comment..."
//                         className="flex-grow border rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#508C9B]"
//                     />
//                     <button
//                         onClick={handleAddComment}
//                         className="ml-2 bg-[#508C9B] text-white p-2 rounded-full hover:bg-[#134B70] focus:outline-none"
//                     >
//                         <FontAwesomeIcon icon={faPaperPlane} />
//                     </button>
//                 </div>
//             )}

//             {/* Edit Post Popup */}
//             {showEditPostPopup && (
//                 <EditPostPopup
//                     isOpen={showEditPostPopup}
//                     onClose={() => setShowEditPostPopup(false)}
//                     postContent={postContent}
//                     postImage={postImage}
//                     onSave={handleSavePost}
//                 />
//             )}

//             {/* Delete Post Popup */}
//             {showDeletePostPopup && (
//                 <DeletePostPopup
//                     isOpen={showDeletePostPopup}
//                     onClose={() => setShowDeletePostPopup(false)} // Close without deleting
//                     onDelete={handleDeleteConfirmation} // Confirm deletion
//                 />
//             )}
//         </div>
//     );
// };

// export default Post;

import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
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
  currentUser,
  onProfileClick,
  onDeleteSuccess,
}) => {
  const [showOptions, setShowOptions] = useState(false);

  const optionsRef = useRef(null);
  const buttonRef = useRef(null);

  // Toggle the options menu
  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  // Delete the post
  const handleDeletePost = async () => {
    try {
      await axios.delete(`/posts/${postId}`, { withCredentials: true });
      onDeleteSuccess(postId); // Notify parent about deletion
    } catch (err) {
      console.error("Failed to delete post:", err);
    }
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
      <div className="flex items-center text-base text-gray-700 mb-4">
        <img
          src={profilePic} // Profile picture from backend (replaces img)
          alt="User"
          
          className="mr-2 w-10 h-10 rounded-full object-cover"
        />
        <span
          className="text-base font-semibold cursor-pointer hover:underline"
          onClick={() => onProfileClick(userId)} // Navigate to user's profile page
        >
          {userName} {/* Display the user's name from backend */}
        </span>
        <span className="ml-3 text-gray-600">
          {new Date(created_datetime).toLocaleString()} {/* Display post time */}
          &gt; {eventName} {/* Event name */}
        </span>
      </div>

      {/* Post Content */}
      {description && <p className="text-gray-700 mb-3 text-base">{description}</p>}

      {/* Display image if available */}
      {img && img !== 'image_url_or_null' && (
        <div className="mb-3">
          <img src={img} alt="Post" className="w-2/3 mx-auto" />
        </div>
      )}

      {/* Options Button */}
      {currentUser === userId && (
        <div className="relative ml-auto">
          <button
            ref={buttonRef}
            className="text-gray-600"
            onClick={toggleOptions}
          >
            <FontAwesomeIcon icon={faEllipsisV} />
          </button>
          {showOptions && (
            <div
              ref={optionsRef}
              className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg border border-gray-200 z-50"
            >
              <button
                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
                onClick={handleDeletePost}
              >
                Delete Post
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Post;
