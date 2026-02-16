import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send } from "lucide-react";

function MessagesTab({ user, conversations }) {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const messageEndRef = useRef(null);

  useEffect(() => {
    if (conversations.length > 0 && !selectedConversation) {
      setSelectedConversation(conversations[0]);
      setMessages(conversations[0].messages);
    }
  }, [conversations, selectedConversation]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (!messageInput.trim() || !selectedConversation) return;

    const newMessage = {
      id: Date.now(),
      sender: "user",
      content: messageInput,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: true,
      type: "text"
    };

    setMessages([...messages, newMessage]);
    setMessageInput("");

    // Simulate auto-reply
    setTimeout(() => {
      const botReply = {
        id: Date.now() + 1,
        sender: "employer",
        content: "Thank you for your message. We'll get back to you shortly.",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        read: false,
        type: "text"
      };
      setMessages(prev => [...prev, botReply]);
    }, 1500);
  };

  return (
    <div className="messages-tab">
      <div className="messages-header">
        <h3 className="section-title">
          <MessageCircle size={28} />
          <span>Messages</span>
        </h3>
      </div>

      <div className="messages-container">
        <div className="conversations-sidebar">
          <div className="conversations-list">
            {conversations.map(convo => (
              <ConversationItem
                key={convo.id}
                conversation={convo}
                isSelected={selectedConversation?.id === convo.id}
                onClick={() => {
                  setSelectedConversation(convo);
                  setMessages(convo.messages);
                }}
              />
            ))}
          </div>
        </div>

        <div className="chat-area">
          {selectedConversation ? (
            <>
              <div className="chat-header">
                <div className="chat-partner">
                  <div className="partner-avatar">
                    <img src={selectedConversation.logo} alt={selectedConversation.employer} />
                  </div>
                  <div className="partner-info">
                    <h4 className="partner-name">{selectedConversation.employer}</h4>
                  </div>
                </div>
              </div>

              <div className="chat-messages">
                {messages.length > 0 ? (
                  <>
                    {messages.map(message => (
                      <MessageBubble key={message.id} message={message} />
                    ))}
                  </>
                ) : (
                  <div className="no-messages">
                    <p>Start a conversation with {selectedConversation.employer}</p>
                  </div>
                )}
                <div ref={messageEndRef} />
              </div>

              <div className="chat-input-area">
                <div className="message-input-container">
                  <input
                    type="text"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    placeholder="Type your message..."
                    className="message-input"
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <button 
                    className="send-message-btn"
                    onClick={handleSendMessage}
                    disabled={!messageInput.trim()}
                  >
                    <Send size={20} />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <NoConversationSelected />
          )}
        </div>
      </div>
    </div>
  );
}

function ConversationItem({ conversation, isSelected, onClick }) {
  return (
    <div 
      className={`conversation-item ${isSelected ? 'active' : ''}`}
      onClick={onClick}
    >
      <div className="conversation-avatar">
        <img src={conversation.logo} alt={conversation.employer} className="employer-logo" />
      </div>
      <div className="conversation-details">
        <h5 className="employer-name">{conversation.employer}</h5>
        <p className="conversation-preview">{conversation.lastMessage}</p>
      </div>
    </div>
  );
}

function MessageBubble({ message }) {
  return (
    <div className={`message ${message.sender === 'user' ? 'sent' : 'received'}`}>
      <div className="message-content">
        <p>{message.content}</p>
        <span className="message-time">{message.time}</span>
      </div>
    </div>
  );
}

function NoConversationSelected() {
  return (
    <div className="no-conversation-selected">
      <MessageCircle size={48} />
      <h4>Select a conversation</h4>
    </div>
  );
}

export default MessagesTab;