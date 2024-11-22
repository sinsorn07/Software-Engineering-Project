import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV, faHeart, faCommentAlt, faPaperPlane } from "@fortawesome/free-solid-svg-icons";

const Post = ({
    user,
    time,
    eventName,
    content,
    image,
    likes,
    comments,
    onProfileClick,
    onEditPost,
    onDeletePost,
    onAddComment, // Function to handle adding a new comment
}) => {
    const [showOptions, setShowOptions] = useState(false);
    const [showAllComments, setShowAllComments] = useState(false); // State for toggling comments display
    const [showCommentBox, setShowCommentBox] = useState(false); // State to toggle comment input box
    const [newComment, setNewComment] = useState(""); // State to store the new comment text
    const [liked, setLiked] = useState(false); // State to track if the post is liked
    const optionsRef = useRef(null); // Reference for the options box
    const buttonRef = useRef(null); // Reference for the button to calculate position

    const toggleOptions = () => {
        setShowOptions(!showOptions);
    };

    const handleAddComment = () => {
        if (newComment.trim()) {
            onAddComment(newComment);
            setNewComment("");
        }
    };

    const handleLikeToggle = () => {
        setLiked(!liked);
    };

    const handleDoubleClickLike = () => {
        if (!liked) {
            setLiked(true);
        }
    };

    // Handle click outside of options box
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

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="bg-white rounded-lg shadow-md p-6 max-w-3xl mx-auto mb-6 relative">
            {/* Post Header */}
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

                {/* Options Button */}
                <div className="relative ml-auto">
                    <button
                        ref={buttonRef}
                        className="text-gray-600"
                        onClick={toggleOptions}
                    >
                        <FontAwesomeIcon icon={faEllipsisV} />
                    </button>

                    {/* Options Box */}
                    {showOptions && (
                        <div
                            ref={optionsRef} // Attach ref to options box
                            className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg border border-gray-200 z-50"
                            style={{ top: "100%", right: 0 }} // Adjust position relative to the button
                        >
                            <button
                                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
                                onClick={() => {
                                    onEditPost();
                                    setShowOptions(false); // Close options after clicking
                                }}
                            >
                                Edit Post
                            </button>
                            <button
                                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
                                onClick={() => {
                                    onDeletePost();
                                    setShowOptions(false); // Close options after clicking
                                }}
                            >
                                Delete Post
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Post Content */}
            {content && <p className="text-gray-700 mb-3 text-base">{content}</p>}
            {image && (
                <div className="mb-3" onDoubleClick={handleDoubleClickLike}>
                    <img src={image} alt="Post" className="w-2/3 mx-auto" />
                </div>
            )}

            {/* Likes and Comments Count */}
            <div className="flex space-x-3 text-gray-600 text-sm">
                <div
                    className="flex items-center space-x-1 cursor-pointer"
                    onClick={handleLikeToggle}
                    onDoubleClick={handleDoubleClickLike}
                >
                    <FontAwesomeIcon
                        icon={faHeart}
                        className={`text-2xl ${
                            liked ? "text-red-500" : "text-gray-500"
                        }`}
                    />
                    <span>{liked ? likes + 1 : likes}</span>
                </div>
                <div
                    className="flex items-center space-x-1 cursor-pointer"
                    onClick={() => setShowCommentBox(!showCommentBox)}
                >
                    <FontAwesomeIcon
                        icon={faCommentAlt}
                        className="text-2xl text-gray-500"
                    />
                    <span>{comments.length}</span>
                </div>
            </div>

            {/* Comments Section */}
            <div className="mt-3 text-gray-700">
                {(showAllComments ? comments : comments.slice(0, 2)).map(
                    (comment, index) => (
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
                    )
                )}
                {comments.length > 2 && (
                    <button
                        className="text-blue-600 hover:underline text-base"
                        onClick={() => setShowAllComments(!showAllComments)}
                    >
                        {showAllComments ? "Show less" : "Show more"}
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
                        <FontAwesomeIcon icon={faPaperPlane} />
                    </button>
                </div>
            )}
        </div>
    );
};

export default Post;