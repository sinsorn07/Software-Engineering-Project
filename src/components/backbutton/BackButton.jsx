import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const BackButton = () => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1); // Go back to the previous page in the history stack
    };

    return (
        <button
            className="bg-gray-100 text-gray-500 p-2 rounded-md hover:bg-[#508C9B] hover:text-white flex items-center"
            onClick={handleBack}
        >
            <FaArrowLeft className="text-2xl" />
        </button>
    );
};

export default BackButton;
