import { useState } from 'react';
import LeftBar from "../../components/leftBar/LeftBar";
import Navbar from "../../components/navbar/Navbar";
import { FaArrowLeft, FaPaperPlane } from 'react-icons/fa'; 
import { Link } from 'react-router-dom';


export default function ChatEvent() {
  const [messages, setMessages] = useState([]); 
  const [newMessage, setNewMessage] = useState('');

  // Commented out useEffect for API fetching
  /*
  useEffect(() => {
    async function fetchMessages() {
      try {
        const response = await axios.get('/api/messages');
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    }

    fetchMessages();
  }, []);
  */

  // Placeholder for the message sending function
  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const messageData = {
      name: 'mysbryce',
      avatar: 'https://example.com/avatar.jpg',
      text: newMessage,
      attach: [],
      date: new Date().toLocaleTimeString(),
      isOwn: true,
    };

    // Mock updating local state without an API call
    setMessages((prev) => [...prev, messageData]);
    setNewMessage('');
  };

  return (
    <>
      <div className="w-screen h-screen flex items-start">
        <Navbar />
        <div className="flex flex-col w-10/12 h-full overflow-y-scroll">
          <header className="py-8 bg-zinc-50">
            <div className="flex items-center gap-2 w-[80%] mx-auto relative">
              <Link to={'/'}>
                <FaArrowLeft className="text-xl" />
              </Link>
              <span>Chat - Event Name</span>
            </div>
          </header>

          <hr />

          <div className="flex flex-col gap-6 py-8 w-[80%] mx-auto relative h-full overflow-y-scroll">
            {messages.length > 0 ? (
              messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-3 w-[550px] ${
                    message.isOwn && 'ml-auto'
                  }`}
                >
                  {!message.isOwn && (
                    <div className="bg-black/30 w-[45px] aspect-square rounded-full relative overflow-hidden border-2 border-zinc-400">
                      <img src={message.avatar} alt="Avatar" />
                    </div>
                  )}
                  <div className="flex flex-col gap-1">
                    {!message.isOwn && (
                      <span className="text-sm text-zinc-800 font-medium">{message.name}</span>
                    )}
                    <div className="bg-zinc-300 px-6 py-4 text-sm rounded-lg w-[450px] relative">
                      {message.text}
                      <span
                        className={`text-[12px] absolute ${
                          message.isOwn ? 'right-[102%]' : 'left-[102%]'
                        } bottom-0`}
                      >
                        {message.date}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">No messages yet.</p> // Fallback content
            )}
          </div>

          <div className="mt-auto border-t border-t-zinc-300 bg-zinc-200 py-6">
            <div className="w-[80%] mx-auto flex items-center gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message"
                className="outline-0 w-full rounded-2xl bg-white border border-zinc-300 focus:border-zinc-400 px-4 py-1.5"
              />

              <button
                onClick={handleSendMessage}
                className="flex items-center justify-center bg-black/20 w-[35px] aspect-square rounded text-zinc-700 transition-all duration-100 hover:bg-black/30 hover:text-zinc-800"
              >
                <FaPaperPlane className="text-lg" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
