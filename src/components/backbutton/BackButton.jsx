import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';

const BackButton = ({ onClick }) => {
    return (
        <button
            className="bg-gray-100 text-gray-500 p-2 rounded-md hover:bg-[#508C9B] hover:text-white flex items-center"
            onClick={onClick}
        >
            <FaArrowLeft className="text-2xl" />
        </button>
    );
};

export default BackButton;
