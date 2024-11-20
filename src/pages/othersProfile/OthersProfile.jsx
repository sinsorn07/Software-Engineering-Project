import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faCommentAlt } from '@fortawesome/free-solid-svg-icons';

const OtherUserProfile = () => {
    const navigate = useNavigate();

    const handleProfileLink = (username) => {
        navigate(`/profile/${username}`);
    };

    return (
        <div className="flex h-screen bg-gray-200">
            {/* Profile Main Content */}
            <div className="flex-grow p-6 bg-[#134B70] rounded-lg">
                {/* Header Section */}
                <div className="relative mb-10">
                    <img
                        src="https://pbs.twimg.com/media/Ek2SE8NU0AAKZHR.jpg:large"
                        alt="Cover"
                        className="w-full h-[28rem] object-cover rounded-lg"
                    />
                    <div className="absolute top-[19rem] left-1/2 transform -translate-x-1/2 w-56 h-56 border-4 border-[#EEEEEE] rounded-full overflow-hidden z-20">
                        <img
                            src="https://images.squarespace-cdn.com/content/v1/62886298592584625be0e1f6/e98db2ed-1cfa-4329-a851-1efe233d9e14/Enhypen+Inceptio+-+17.JPEG"
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>

                {/* User Info Section */}
                <div className="flex flex-col items-center mt-20">
                    <h2 className="text-3xl font-semibold mb-2 hover:underline text-[#EEEEEE]">
                        Jake
                    </h2>
                    <p className="text-[#EEEEEE] text-lg mb-11">
                        (enhypen)
                    </p>
                </div>

                {/* Posts Section */}
                <div className="space-y-8">
                    {/* First Post */}
                    <div className="bg-white rounded-lg p-6 shadow-md max-w-3xl mx-auto">
                        <div className="flex items-center text-base text-[#201E43] mb-4">
                            <img
                                src="https://images.squarespace-cdn.com/content/v1/62886298592584625be0e1f6/e98db2ed-1cfa-4329-a851-1efe233d9e14/Enhypen+Inceptio+-+17.JPEG"
                                alt="User"
                                className="w-10 h-10 rounded-full mr-2"
                            />
                            <span
                                className="text-[#201E43] font-bold cursor-pointer hover:underline"
                                onClick={() => handleProfileLink('username1')}
                            >
                                Jake
                            </span>
                            <span className="ml-3">08.23 PM > EventName1</span>
                        </div>
                        <p className="text-[#201E43] mb-3 text-lg">
                            Hello Everyone!
                        </p>
                        <div className="flex space-x-3 text-[#201E43] text-sm">
                            <div className="flex items-center space-x-1">
                                <FontAwesomeIcon icon={faHeart} />
                                <span>100</span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <FontAwesomeIcon icon={faCommentAlt} />
                                <span>2</span>
                            </div>
                        </div>
                        <div className="mt-3 text-sm">
                            <div className="flex items-center mb-1">
                                <img
                                    src="https://i.pinimg.com/736x/41/aa/b4/41aab40688396a6958e1ddd774e1d92a.jpg"
                                    alt="Commenter"
                                    className="w-6 h-6 rounded-full mr-2"
                                />
                                <p>
                                    <span
                                        className="text-[#201E43] font-bold cursor-pointer hover:underline"
                                        onClick={() => handleProfileLink('username2')}
                                    >
                                        NongPloy
                                    </span>
                                    : oh hi!
                                </p>
                            </div>
                            <div className="flex items-center">
                                <img
                                    src="https://pbs.twimg.com/media/GabDc43akAAtT_f?format=jpg&name=4096x4096"
                                    alt="Commenter"
                                    className="w-6 h-6 rounded-full mr-2"
                                />
                                <p>
                                    <span
                                        className="text-[#201E43] font-bold cursor-pointer hover:underline"
                                        onClick={() => handleProfileLink('username3')}
                                    >
                                        Jennie
                                    </span>
                                    : uwu
                                </p>
                            </div>
                            <a href="#" className="text-[#134B70] hover:underline">
                                Show more
                            </a>
                        </div>
                    </div>

                    {/* Second Post */}
                    <div className="bg-white rounded-lg p-6 shadow-md max-w-3xl mx-auto">
                        <div className="flex items-center text-base text-[#201E43] mb-4">
                            <img
                                src="https://images.squarespace-cdn.com/content/v1/62886298592584625be0e1f6/e98db2ed-1cfa-4329-a851-1efe233d9e14/Enhypen+Inceptio+-+17.JPEG"
                                alt="User"
                                className="w-10 h-10 rounded-full mr-2"
                            />
                            <span
                                className="text-[#201E43] font-bold cursor-pointer hover:underline"
                                onClick={() => handleProfileLink('username1')}
                            >
                                Jake
                            </span>
                            <span className="ml-3">22 August > EventName1</span>
                        </div>
                        <div className="mb-3">
                            <img
                                src="https://64.media.tumblr.com/4f11733a15e1957398e849afbcd168d5/3c1b85e7744165dc-09/s1280x1920/8163a9370c81478ebf613c87699aa75fe2118fae.jpg"
                                alt="Post"
                                className="w-2/3 mx-auto rounded-lg"
                            />
                        </div>
                        <div className="flex space-x-3 text-[#201E43] text-sm">
                            <div className="flex items-center space-x-1">
                                <FontAwesomeIcon icon={faHeart} />
                                <span>20</span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <FontAwesomeIcon icon={faCommentAlt} />
                                <span>0</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OtherUserProfile;
