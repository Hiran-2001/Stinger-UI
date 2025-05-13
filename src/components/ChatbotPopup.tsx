import { MessageCircle } from 'lucide-react';
import React, { useState, useRef, useEffect } from 'react';

const ChatbotPopup = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([
        { sender: 'bot', text: 'Hello! How can I help you today?' }
    ]);

    const messagesEndRef = useRef(null);

    const toggleChat = () => setIsOpen(!isOpen);

    const sendMessage = () => {
        if (!input.trim()) return;

        const userMessage = { sender: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);

        // Simulate bot response (replace with real backend call)
        setTimeout(() => {
            setMessages(prev => [
                ...prev,
                { sender: 'bot', text: `You said: "${input}"` }
            ]);
        }, 500);

        setInput('');
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') sendMessage();
    };

    // Scroll to bottom on new messages
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div>
            {/* Floating Chat Icon */}
            <div
                onClick={toggleChat}
                className="fixed bottom-6 right-6 bg-blue-600 p-4 rounded-full shadow-lg cursor-pointer text-white text-xl z-50"
            >
                <MessageCircle />
            </div>

            {/* Chat Popup */}
            {isOpen && (
                <div className="fixed bottom-20 right-6 w-80 bg-white shadow-2xl rounded-xl flex flex-col overflow-hidden border border-gray-300 z-50">
                    <div className="bg-blue-600 text-white p-3 font-semibold">Chatbot</div>

                    {/* 🔥 Fixed Height + Scroll */}
                    <div className="p-3 h-64 overflow-y-auto flex flex-col space-y-2">
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`p-2 rounded-lg max-w-[80%] ${msg.sender === 'user'
                                        ? 'bg-blue-100 self-end text-right ml-auto'
                                        : 'bg-gray-100 self-start text-left'
                                    }`}
                            >
                                <div className="text-sm">{msg.text}</div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div className="flex p-2 border-t">
                        <input
                            type="text"
                            className="flex-1 border border-gray-300 rounded-l-lg px-2 py-1 outline-none"
                            placeholder="Type a message..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyPress}
                        />
                        <button
                            onClick={sendMessage}
                            className="bg-blue-600 text-white px-4 py-1 rounded-r-lg"
                        >
                            Send
                        </button>
                    </div>
                </div>
            )}

        </div>
    );
};

export default ChatbotPopup;
