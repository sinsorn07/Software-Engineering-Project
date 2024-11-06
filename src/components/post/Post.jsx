import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faHeart, faCommentAlt } from '@fortawesome/free-solid-svg-icons';

const Post = ({ 
    user, 
    time, 
    eventName, 
    content, 
    image, 
    likes, 
    comments, 
    onProfileClick, 
    onEditPost 
}) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6 max-w-3xl mx-auto mb-6">
            {/* Post Header */}
            <div className="flex items-center text-base text-gray-700 mb-4">
                <img src={user.profilePic} alt="User" className="mr-2 w-10 h-10 rounded-full object-cover" />
                <span 
                    className="text-lg font-semibold cursor-pointer hover:underline"                     
                    onClick={() => onProfileClick(user.username)}
                >
                    {user.name}
                </span>
                <span className="ml-3 text-gray-600">{time} > {eventName}</span>
                <button className="ml-auto text-gray-600" onClick={onEditPost}>
                    <FontAwesomeIcon icon={faEllipsisV} />
                </button>
            </div>

            {/* Post Content */}
            {content && <p className="text-gray-700 mb-3 text-base">{content}</p>}
            {image && (
                <div className="mb-3">
                    <img src={image} alt="Post" className="w-2/3 mx-auto" />
                </div>
            )}

            {/* Likes and Comments Count */}
            <div className="flex space-x-3 text-gray-600 text-sm">
                <div className="flex items-center space-x-1">
                    <FontAwesomeIcon icon={faHeart} className="text-2xl text-gray-500" />
                    <span>{likes}</span>
                </div>
                <div className="flex items-center space-x-1">
                    <FontAwesomeIcon icon={faCommentAlt} className="text-2xl text-gray-500" />
                    <span>{comments.length}</span>
                </div>
            </div>

            {/* Comments Section */}
            <div className="mt-3 text-gray-700">
                {comments.map((comment, index) => (
                    <div key={index} className="flex items-center mb-2">
                        <img src={comment.profilePic} alt="Commenter" className="mr-2 w-10 h-10 rounded-full object-cover" />
                        <p className="text-lg">
                            <span 
                                className="text-gray-700 font-semibold cursor-pointer hover:underline" 
                                onClick={() => onProfileClick(comment.username)}
                            >
                                {comment.username}
                            </span>
                            : {comment.text}
                        </p>
                    </div>
                ))}
                <a href="#" className="text-blue-600 hover:underline text-base">Show more</a>
            </div>
        </div>
    );
};

export default Post;
