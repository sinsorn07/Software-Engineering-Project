import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FaArrowLeft, FaPaperPlane } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Chat = () => {
    const location = useLocation();
    const { eventName } = location.state || {}; // Retrieve eventName from state
    const navigate = useNavigate();

    const [messages, setMessages] = useState([
        { id: 1, sender: 'Honeypot2512', text: 'Am I the only one who didnt recieve the invitation? That Seong Hyunje😠', time: new Date().toLocaleTimeString() },
        { id: 2, sender: 'SnowBunnyBYR', text: 'Seseong ahjussi must be surprised!', time: new Date().toLocaleTimeString() },
    ]); // Sample messages

    const [newMessage, setNewMessage] = useState('');

    const handleSendMessage = () => {
        if (newMessage.trim() === '') return;
        const messageData = {
            id: messages.length + 1,
            sender: 'You',
            text: newMessage,
            time: new Date().toLocaleTimeString(), // Get current time when message is sent
        };
        setMessages((prevMessages) => [...prevMessages, messageData]);
        setNewMessage('');
    };

    return (
        <div className="chat-page flex flex-col min-h-screen bg-gray-100">
            {/* Chat Header */}
            <header className="chat-header bg-[#508C9B] text-white py-4 px-6 flex items-center sticky top-0 shadow-lg">
                <button
                    className="text-white hover:text-gray-300 mr-4"
                    onClick={() => navigate(-1)} // Navigate back
                >
                    <FaArrowLeft />
                </button>
                <h1 className="text-xl font-bold">{eventName || 'Chat'}</h1>
            </header>

            {/* Chat Body */}
            <div className="chat-body flex-1 overflow-y-auto px-4 py-6">
                {messages.length > 0 ? (
                    <div className="message-list space-y-4">
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={`message-item flex items-start space-x-3 ${
                                    message.sender === 'You' ? 'justify-end' : 'justify-start'
                                }`}
                            >
                                {/* Avatar or Placeholder */}
                                {message.sender !== 'You' && (
                                    <div className="avatar w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                                        <span className="text-sm text-white">{message.sender[0]}</span>
                                    </div>
                                )}

                                <div className="message-box relative flex flex-col items-start">
                                    {/* Username */}
                                    <span
                                        className={`text-sm font-medium ${
                                            message.sender === 'You' ? 'text-blue-600 ml-auto' : 'text-gray-700 mb-1'
                                        }`}
                                    >
                                        {message.sender}
                                    </span>

                                    {/* Message box */}
                                    <div
                                        className={`message p-4 rounded-lg shadow ${
                                            message.sender === 'You' ? 'bg-blue-100' : 'bg-white'
                                        }`}
                                        style={{
                                            maxWidth: '70%', // Apply consistent max width for all messages
                                            width: 'auto', // Dynamic width based on content
                                            wordWrap: 'break-word', // Ensure text wraps within the box
                                            whiteSpace: 'pre-wrap', // Allow wrapping within the box
                                            wordBreak: 'break-word', // Break long words if necessary
                                            marginLeft: message.sender === 'You' ? 'auto' : '0', // Align 'You' messages to the right
                                            marginRight: message.sender !== 'You' ? 'auto' : '0', // Align others' messages to the left
                                        }}
                                    >
                                        <p className="text-sm text-gray-600">{message.text}</p>
                                    </div>


                                    {/* Timestamp */}
                                    <span
                                        className={`text-xs text-gray-500 mt-1 ${
                                            message.sender === 'You' ? 'ml-auto text-right' : 'text-left'
                                        }`}
                                    >
                                        {message.time}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500 text-center">No messages yet. Start the conversation!</p>
                )}
            </div>

            {/* Chat Input */}
            <div className="chat-input bg-white p-4 shadow-md">
                <div className="flex items-center space-x-4">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#508C9B]"
                    />
                    <button
                        onClick={handleSendMessage}
                        className="bg-[#508C9B] text-white px-4 py-2 rounded-full flex items-center justify-center hover:bg-[#134B70] transition"
                        aria-label="Send"
                    >
                        <FaPaperPlane className="text-xl" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Chat;
