import React from 'react';
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {
    const navigate = useNavigate();

    const handleSaveProfile = () => {
        // Logic to save profile (e.g., API call)
        alert("Profile saved!");
        navigate('/profile'); // Redirect to profile page after saving
    };

    return (
        <div className="flex h-screen bg-gray-200">
            <div className="flex-grow p-6 bg-[#134B70] rounded-b-lg">
                {/* Profile Header */}
                <div className="relative mb-10">
                    <img
                        src="https://64.media.tumblr.com/374d80a490de6d36d03e776cd07d2e1a/tumblr_prschzIIWW1wtvrjk_1280.jpg"
                        alt="Cover"
                        className="w-full h-[28rem] object-cover rounded-lg"
                    />
                    <div className="absolute top-[19rem] left-1/2 transform -translate-x-1/2 w-56 h-56 border-4 border-gray-200 rounded-full overflow-hidden z-20">
                        <img
                            src="https://voguehk.s3.ap-southeast-1.amazonaws.com/media/2024/10/24164058/Snapinsta.app_318114573_623183596255627_1221795030514672052_n_1080.jpg"
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <button
                        onClick={() => alert("Change Cover Photo")}
                        className="absolute top-[29rem] right-4 bg-[#D1E7F3] text-[#134B70] px-4 py-2 rounded-md hover:bg-[#B3D4E0]"
                    >
                        Change Cover
                    </button>
                </div>

                {/* Edit Form */}
                <div className="flex flex-col items-center mt-20">
                    <h2 className="text-3xl font-semibold mb-4 text-[#EEEEEE]">Edit Profile</h2>
                    <form className="w-full max-w-md space-y-6 bg-white p-6 rounded-lg shadow-md">
                        <div>
                            <label className="block text-sm font-medium text-[#201E43] mb-2">Username</label>
                            <input
                                type="text"
                                placeholder="Jeongjae Ploy"
                                className="w-full p-2 rounded-md bg-gray-100 border-none focus:outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-[#201E43] mb-2">Bio</label>
                            <textarea
                                placeholder="ploy huajai jaehyun"
                                className="w-full p-2 rounded-md bg-gray-100 border-none focus:outline-none"
                            ></textarea>
                        </div>
                        <button
                            type="button"
                            onClick={handleSaveProfile}
                            className="w-full py-2 bg-[#134B70] text-[#EEEEEE] font-semibold rounded-lg hover:bg-[#0E3A56] focus:outline-none"
                        >
                            Save Profile
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditProfile;