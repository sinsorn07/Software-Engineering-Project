import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faHeart, faCommentAlt } from '@fortawesome/free-solid-svg-icons';

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

    return (
        <div className="flex h-screen bg-[#EEEEEE]">
            {/* Profile Main Content */}
            <div className="flex-grow p-6 bg-[#134B70] rounded-lg">
                <div className="relative mb-10">
                    <img src="https://64.media.tumblr.com/374d80a490de6d36d03e776cd07d2e1a/tumblr_prschzIIWW1wtvrjk_1280.jpg" alt="Cover" className="w-full h-[28rem] object-cover rounded-lg" />
                    <div className="absolute top-[19rem] left-1/2 transform -translate-x-1/2 w-56 h-56 border-4 border-[#EEEEEE] rounded-full overflow-hidden z-20">
                        <img src="https://voguehk.s3.ap-southeast-1.amazonaws.com/media/2024/10/24164058/Snapinsta.app_318114573_623183596255627_1221795030514672052_n_1080.jpg" alt="Profile" className="w-full h-full object-cover" />
                    </div>
                    <button onClick={handleEditProfile} className="absolute top-[29rem] right-4 bg-[#D1E7F3] text-[#134B70] px-4 py-2 rounded-md hover:bg-[#B3D4E0]">Edit Profile</button>
                </div>

                <div className="flex flex-col items-center mt-20">
                    <h2 className="text-3xl font-semibold mb-4 hover:underline cursor-pointer text-[#EEEEEE]">Jeongjae Ploy</h2>
                    <p className="text-[#EEEEEE] text-lg mb-11">ploy huajai jaehyun</p>
                </div>

                {/* Posts Section */}
                <div className="space-y-8">
                    {/* First Post */}
                    <div className="bg-[#EEEEEE] rounded-lg p-6 shadow-md max-w-3xl mx-auto">
                        <div className="flex items-center text-base text-[#201E43] mb-4">
                            <img src="https://voguehk.s3.ap-southeast-1.amazonaws.com/media/2024/10/24164058/Snapinsta.app_318114573_623183596255627_1221795030514672052_n_1080.jpg" alt="User" className="w-10 h-10 rounded-full mr-2" />
                            <span className="text-[#201E43] font-bold cursor-pointer hover:underline" onClick={() => handleProfileLink('username1')}>Jeongjae Ploy</span>
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
                        <div className="mt-3 text-sm">
                            <div className="flex items-center mb-1">
                                <img src="https://i.pinimg.com/736x/41/aa/b4/41aab40688396a6958e1ddd774e1d92a.jpg" alt="Commenter" className="w-6 h-6 rounded-full mr-2" />
                                <p><span className="text-[#201E43] font-bold cursor-pointer hover:underline" onClick={() => handleProfileLink('username2')}>washiraya_</span>: tum tua lhor pai wan2</p>
                            </div>
                            <div className="flex items-center">
                                <img src="https://pbs.twimg.com/media/GabDc43akAAtT_f?format=jpg&name=4096x4096" alt="Commenter" className="w-6 h-6 rounded-full mr-2" />
                                <p><span className="text-[#201E43] font-bold cursor-pointer hover:underline" onClick={() => handleProfileLink('username3')}>nattyham</span>: mai ru</p>
                            </div>
                            <a href="#" className="text-[#134B70] hover:underline">Show more</a>
                        </div>
                    </div>

                    {/* Second Post */}
                    <div className="bg-[#EEEEEE] rounded-lg p-6 shadow-md max-w-3xl mx-auto">
                        <div className="flex items-center text-base text-[#201E43] mb-4">
                            <img src="https://voguehk.s3.ap-southeast-1.amazonaws.com/media/2024/10/24164058/Snapinsta.app_318114573_623183596255627_1221795030514672052_n_1080.jpg" alt="User" className="w-10 h-10 rounded-full mr-2" />
                            <span className="text-[#201E43] font-bold cursor-pointer hover:underline" onClick={() => handleProfileLink('username1')}>Jeongjae Ploy</span>
                            <span className="ml-3">6.23 PM > FanMeeting</span>
                            <button className="ml-auto text-[#201E43]" onClick={handleEditPost}>
                                <FontAwesomeIcon icon={faEllipsisV} />
                            </button>
                        </div>
                        <div className="mb-3">
                            <img src="https://i.namu.wiki/i/x43BUlBNcMfvk6LIA2eTmNSbgq3OhW-HOODJ0H_-iKm5Wqg_xUO8EERXBvTDulGJ-cVAnjRxDcK-Ox8Qrn8WdQ.webp" alt="Post" className="w-2/3 mx-auto rounded-lg" />
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
