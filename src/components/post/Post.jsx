import React, { useState, useEffect, useRef } from "react";
import { FaEllipsisV, FaHeart, FaCommentAlt, FaPaperPlane } from "react-icons/fa";
import EditPostPopup from "../editPost/EditPost"; // Assuming this is where the popup component is

const Post = ({
    user,
    time,
    eventName,
    content,
    image,
    likes,
    comments,
    currentUser,
    onProfileClick,
    onEditPost,
    onDeletePost,
    onAddComment,
}) => {
    const [showOptions, setShowOptions] = useState(false);
    const [liked, setLiked] = useState(false);
    const [showCommentBox, setShowCommentBox] = useState(false);
    const [newComment, setNewComment] = useState("");
    const [showEditPostPopup, setShowEditPostPopup] = useState(false); // To show the EditPostPopup
    const [postContent, setPostContent] = useState(content); // Save initial content
    const [postImage, setPostImage] = useState(image); // Save initial image

    const optionsRef = useRef(null); // Reference for the options menu
    const buttonRef = useRef(null); // Reference for the options button

    const toggleOptions = () => setShowOptions(!showOptions);

    const handleEditPost = () => {
        setShowEditPostPopup(true); // Show the popup
    };

    const handleSavePost = (updatedPost) => {
        // Update the post content and image
        setPostContent(updatedPost.content);
        setPostImage(updatedPost.image);
        setShowEditPostPopup(false); // Close the popup
    };

    const handleLikeToggle = () => {
        setLiked(!liked);
    };

    const handleAddComment = () => {
        if (newComment.trim()) {
            onAddComment(newComment);
            setNewComment("");
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
                setShowOptions(false); // Close options if click outside
            }
        };

        // Listen for click outside the options button
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside); // Cleanup
        };
    }, []);

    return (
        <div className="bg-white rounded-lg shadow-md p-6 max-w-3xl mx-auto mb-6 relative">
            <div className="flex items-center text-base text-gray-700 mb-4">
                <img
                    src={user.profilePic}
                    alt="User"
                    className="mr-2 w-10 h-10 rounded-full object-cover"
                />
                <span
                    className="text-base font-semibold cursor-pointer hover:underline"
                    onClick={() => onProfileClick(user.username)}
                >
                    {user.name}
                </span>
                <span className="ml-3 text-gray-600">
                    {time} > {eventName}
                </span>

                {/* Options Button (Only for the current user) */}
                {user.username === currentUser && (
                    <div className="relative ml-auto">
                        <button
                            ref={buttonRef} // Attach ref to button
                            className="text-gray-600"
                            onClick={toggleOptions}
                        >
                            <FaEllipsisV />
                        </button>
                        {showOptions && (
                            <div
                                ref={optionsRef} // Attach ref to options menu
                                className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg border border-gray-200 z-50"
                            >
                                <button
                                    className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
                                    onClick={handleEditPost}
                                >
                                    Edit Post
                                </button>
                                <button
                                    className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
                                    onClick={() => {
                                        onDeletePost();
                                        setShowOptions(false);
                                    }}
                                >
                                    Delete Post
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Post Content */}
            {postContent && <p className="text-gray-700 mb-3 text-base">{postContent}</p>}
            {postImage && (
                <div className="mb-3">
                    <img src={postImage} alt="Post" className="w-2/3 mx-auto" />
                </div>
            )}

            {/* Likes and Comments Count */}
            <div className="flex space-x-3 text-gray-600 text-sm">
                <div
                    className="flex items-center space-x-1 cursor-pointer"
                    onClick={handleLikeToggle}
                >
                    <FaHeart
                        className={`text-2xl ${liked ? "text-red-500" : "text-gray-500"}`}
                    />
                    <span>{liked ? likes + 1 : likes}</span>
                </div>
                <div
                    className="flex items-center space-x-1 cursor-pointer"
                    onClick={() => setShowCommentBox(!showCommentBox)}
                >
                    <FaCommentAlt className="text-2xl text-gray-500" />
                    <span>{comments.length}</span>
                </div>
            </div>

            {/* Comments Section */}
            <div className="mt-3 text-gray-700">
                {comments.slice(0, 2).map((comment, index) => (
                    <div key={index} className="flex items-center mb-2">
                        <img
                            src={comment.profilePic}
                            alt="Commenter"
                            className="mr-2 w-10 h-10 rounded-full object-cover"
                        />
                        <p className="text-base">
                            <span
                                className="text-gray-700 font-semibold cursor-pointer hover:underline mr-2"
                                onClick={() => onProfileClick(comment.username)}
                            >
                                {comment.username}
                            </span>
                            {comment.text}
                        </p>
                    </div>
                ))}
                {comments.length > 2 && (
                    <button
                        className="text-blue-600 hover:underline text-base"
                        onClick={() => setShowCommentBox(!showCommentBox)}
                    >
                        {showCommentBox ? "Show less" : "Show more"}
                    </button>
                )}
            </div>

            {/* Comment Input Box */}
            {showCommentBox && (
                <div className="mt-4 flex items-center">
                    <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Write a comment..."
                        className="flex-grow border rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#508C9B]"
                    />
                    <button
                        onClick={handleAddComment}
                        className="ml-2 bg-[#508C9B] text-white p-2 rounded-full hover:bg-[#134B70] focus:outline-none"
                    >
                        <FaPaperPlane />
                    </button>
                </div>
            )}

            {/* Edit Post Popup */}
            {showEditPostPopup && (
                <EditPostPopup
                    isOpen={showEditPostPopup}
                    onClose={() => setShowEditPostPopup(false)}
                    postContent={postContent}
                    postImage={postImage}
                    onSave={handleSavePost}
                />
            )}
        </div>
    );
};

export default Post;
