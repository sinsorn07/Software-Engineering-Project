import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faHeart, faCommentAlt, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const Profile = () => {
    const navigate = useNavigate();

    const handleEditProfile = () => {
        navigate('/edit-profile');
    };

    const handleEditPost = () => {
        navigate('/edit-post');
    };

    const handleProfileLink = (username) => {
        navigate(`/profile/${username}`);
    };

    const handleGoBack = () => {
        navigate(-1); // Navigate to the previous page
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            {/* Profile Section (Takes Full Screen Height Initially) */}
            <div className="bg-[#134B70] h-screen relative">
                <button
                    onClick={handleGoBack}
                    className="absolute top-4 left-4 text-white p-2 rounded-full hover:bg-[#1a4d6f]"
                >
                    <FontAwesomeIcon icon={faArrowLeft} />
                </button>

                <img
                    src="https://64.media.tumblr.com/374d80a490de6d36d03e776cd07d2e1a/tumblr_prschzIIWW1wtvrjk_1280.jpg"
                    alt="Cover"
                    className="w-full h-[28rem] object-cover rounded-lg"
                />
                <div className="absolute top-[19rem] left-1/2 transform -translate-x-1/2 w-56 h-56 border-4 border-[#EEEEEE] rounded-full overflow-hidden z-20">
                    <img
                        src="https://voguehk.s3.ap-southeast-1.amazonaws.com/media/2024/10/24164058/Snapinsta.app_318114573_623183596255627_1221795030514672052_n_1080.jpg"
                        alt="Profile"
                        className="w-full h-full object-cover"
                    />
                </div>
                <button
                    onClick={handleEditProfile}
                    className="absolute top-[29rem] right-4 bg-[#D1E7F3] text-[#134B70] px-4 py-2 rounded-md hover:bg-[#B3D4E0]"
                >
                    Edit Profile
                </button>

                {/* Profile Text (on top of blue background) */}
                <div className="flex flex-col items-center mt-20 z-10 relative">
                <div className="h-4"></div>
                    <h2 className="text-3xl font-semibold mb-4 hover:underline cursor-pointer text-[#EEEEEE]">Jeongjae Ploy</h2>
                    <p className="text-[#EEEEEE] text-lg mb-11">ploy huajai jaehyun</p>
                </div>
            </div>

            <div className="flex-grow bg-gray-100 p-6 overflow-y-auto">
                <div className="space-y-8">
                    {/* First Post */}
                    <div className="bg-white rounded-lg p-6 shadow-md max-w-3xl mx-auto">
                        <div className="flex items-center text-base text-[#201E43] mb-4">
                            <img
                                src="https://voguehk.s3.ap-southeast-1.amazonaws.com/media/2024/10/24164058/Snapinsta.app_318114573_623183596255627_1221795030514672052_n_1080.jpg"
                                alt="User"
                                className="w-10 h-10 rounded-full mr-2"
                            />
                            
                            <span className="text-[#201E43] font-bold cursor-pointer hover:underline" onClick={() => handleProfileLink('username1')}>
                                Jeongjae Ploy
                            </span>
                            <span className="ml-3">08.23 PM > FanMeeting</span>
                            <button className="ml-auto text-[#201E43]" onClick={handleEditPost}>
                                <FontAwesomeIcon icon={faEllipsisV} />
                            </button>
                        </div>
                        <p className="text-[#201E43] mb-3 text-lg">Jeahyun tum arai yu</p>
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
                    </div>

                    {/* Second Post */}
                    <div className="bg-white rounded-lg p-6 shadow-md max-w-3xl mx-auto">
                        <div className="flex items-center text-base text-[#201E43] mb-4">
                            <img
                                src="https://voguehk.s3.ap-southeast-1.amazonaws.com/media/2024/10/24164058/Snapinsta.app_318114573_623183596255627_1221795030514672052_n_1080.jpg"
                                alt="User"
                                className="w-10 h-10 rounded-full mr-2"
                            />
                            <span className="text-[#201E43] font-bold cursor-pointer hover:underline" onClick={() => handleProfileLink('username1')}>
                                Jeongjae Ploy
                            </span>
                            <span className="ml-3">6.23 PM > FanMeeting</span>
                            <button className="ml-auto text-[#201E43]" onClick={handleEditPost}>
                                <FontAwesomeIcon icon={faEllipsisV} />
                            </button>
                        </div>
                        <div className="mb-3">
                            <img
                                src="https://i.namu.wiki/i/x43BUlBNcMfvk6LIA2eTmNSbgq3OhW-HOODJ0H_-iKm5Wqg_xUO8EERXBvTDulGJ-cVAnjRxDcK-Ox8Qrn8WdQ.webp"
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

export default Profile;
