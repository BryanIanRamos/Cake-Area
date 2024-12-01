import React, { useState, useEffect } from "react";
import BakerLayout from "../../components/baker/BakerLayout";
import { Icon } from "@iconify/react";

const Messages = () => {
  // States for messages and conversations
  const [conversations, setConversations] = useState([
    {
      id: 1,
      name: "John Customer",
      lastMessage: "Thank you for accepting my order!",
      timestamp: "2024-03-15 10:30",
      unread: 2,
      avatar: "https://ui-avatars.com/api/?name=John+Customer",
    },
    {
      id: 2,
      name: "Sarah Smith",
      lastMessage: "Is my cake ready for pickup?",
      timestamp: "2024-03-15 09:45",
      unread: 0,
      avatar: "https://ui-avatars.com/api/?name=Sarah+Smith",
    },
    {
      id: 3,
      name: "Mike Johnson",
      lastMessage: "Can I modify my order?",
      timestamp: "2024-03-14 15:20",
      unread: 1,
      avatar: "https://ui-avatars.com/api/?name=Mike+Johnson",
    },
  ]);

  const [selectedConversation, setSelectedConversation] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState({});

  // Simulate loading messages for a conversation
  useEffect(() => {
    if (selectedConversation) {
      if (!messages[selectedConversation.id]) {
        // Generate some dummy messages
        const dummyMessages = [
          {
            id: 1,
            sender: "customer",
            text: "Hi, I'd like to inquire about my cake order",
            timestamp: "2024-03-15 09:30",
          },
          {
            id: 2,
            sender: "baker",
            text: "Hello! Sure, I'd be happy to help. What's your order number?",
            timestamp: "2024-03-15 09:32",
          },
          {
            id: 3,
            sender: "customer",
            text: "It's ORDER123",
            timestamp: "2024-03-15 09:33",
          },
        ];
        setMessages(prev => ({
          ...prev,
          [selectedConversation.id]: dummyMessages,
        }));
      }
    }
  }, [selectedConversation]);

  // Simulate receiving new messages
  useEffect(() => {
    const messageInterval = setInterval(() => {
      if (Math.random() > 0.7) { // 30% chance of new message
        const randomConversation = conversations[Math.floor(Math.random() * conversations.length)];
        if (randomConversation) {
          const newMessage = {
            id: Date.now(),
            sender: "customer",
            text: [
              "Hello, just checking on my order",
              "When will it be ready?",
              "Thanks for the update!",
              "Can I add something to my order?",
            ][Math.floor(Math.random() * 4)],
            timestamp: new Date().toLocaleString(),
          };

          setMessages(prev => ({
            ...prev,
            [randomConversation.id]: [
              ...(prev[randomConversation.id] || []),
              newMessage,
            ],
          }));

          if (selectedConversation?.id !== randomConversation.id) {
            setConversations(prev =>
              prev.map(conv =>
                conv.id === randomConversation.id
                  ? { ...conv, unread: (conv.unread || 0) + 1 }
                  : conv
              )
            );
          }
        }
      }
    }, 10000);

    return () => clearInterval(messageInterval);
  }, [conversations, selectedConversation]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedConversation) return;

    const message = {
      id: Date.now(),
      sender: "baker",
      text: newMessage,
      timestamp: new Date().toLocaleString(),
    };

    setMessages(prev => ({
      ...prev,
      [selectedConversation.id]: [
        ...(prev[selectedConversation.id] || []),
        message,
      ],
    }));

    setNewMessage("");
  };

  return (
    <BakerLayout>
      <div className="flex h-[calc(100vh-64px)]">
        {/* Conversations List */}
        <div className="w-1/3 border-r border-gray-200 bg-white">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold">Messages</h2>
          </div>
          <div className="overflow-y-auto h-[calc(100%-60px)]">
            {conversations.map((conversation) => (
              <div
                key={conversation.id}
                onClick={() => {
                  setSelectedConversation(conversation);
                  setConversations(prev =>
                    prev.map(conv =>
                      conv.id === conversation.id ? { ...conv, unread: 0 } : conv
                    )
                  );
                }}
                className={`p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 ${
                  selectedConversation?.id === conversation.id ? "bg-gray-100" : ""
                }`}
              >
                <div className="flex items-center space-x-3">
                  <img
                    src={conversation.avatar}
                    alt={conversation.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium">{conversation.name}</h3>
                      <span className="text-xs text-gray-500">
                        {conversation.timestamp}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 truncate">
                      {conversation.lastMessage}
                    </p>
                  </div>
                  {conversation.unread > 0 && (
                    <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                      {conversation.unread}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Message Content */}
        <div className="flex-1 flex flex-col bg-gray-50">
          {selectedConversation ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-200 bg-white">
                <div className="flex items-center space-x-3">
                  <img
                    src={selectedConversation.avatar}
                    alt={selectedConversation.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <h3 className="font-medium">{selectedConversation.name}</h3>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages[selectedConversation.id]?.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.sender === "baker" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[70%] rounded-lg p-3 ${
                        message.sender === "baker"
                          ? "bg-orange-500 text-white"
                          : "bg-white"
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <span className="text-xs opacity-75 mt-1 block">
                        {message.timestamp}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <form onSubmit={handleSendMessage} className="p-4 bg-white">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-orange-500"
                  />
                  <button
                    type="submit"
                    className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
                  >
                    <Icon icon="material-symbols:send" className="text-xl" />
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              Select a conversation to start messaging
            </div>
          )}
        </div>
      </div>
    </BakerLayout>
  );
};

export default Messages; 