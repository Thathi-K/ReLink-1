import { MessageSquare, Send } from 'lucide-react';

function MessagesView({
  messages,
  selectedMessage,
  onSelectMessage,
  onSendMessage,
  messageText,
  onMessageTextChange
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 h-[600px] flex">
      {/* Messages List */}
      <div className="w-1/3 border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Messages</h2>
        </div>
        <div className="flex-1 overflow-y-auto">
          {messages.map((msg) => (
            <div
              key={msg.id}
              data-testid={`message-${msg.id}`}
              onClick={() => onSelectMessage(msg)}
              className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                selectedMessage?.id === msg.id ? "bg-emerald-50" : ""
              }`}
            >
              <div className="flex items-start gap-3">
                {msg.avatar ? (
                  <img
                    src={msg.avatar}
                    alt={msg.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold">
                    {msg.initials || msg.name.charAt(0)}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">{msg.name}</h3>
                    <span className="text-xs text-gray-400">{msg.time}</span>
                  </div>
                  <p className="text-sm text-gray-500 truncate mt-1">{msg.lastMessage}</p>
                  {msg.unread > 0 && (
                    <span className="inline-block mt-2 px-2 py-0.5 bg-emerald-500 text-white text-xs font-bold rounded-full">
                      {msg.unread} new
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedMessage ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 flex items-center gap-3">
              {selectedMessage.avatar ? (
                <img
                  src={selectedMessage.avatar}
                  alt={selectedMessage.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold">
                  {selectedMessage.initials || selectedMessage.name.charAt(0)}
                </div>
              )}
              <div>
                <h3 className="font-semibold text-gray-900">{selectedMessage.name}</h3>
                <p className="text-xs text-gray-500">Online</p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4" data-testid="chat-messages">
              {selectedMessage.conversation.map((conv) => (
                <div
                  key={conv.id}
                  className={`flex ${
                    conv.sender === "recruiter" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-lg ${
                      conv.sender === "recruiter"
                        ? "bg-emerald-500 text-white"
                        : "bg-gray-100 text-gray-900"
                    }`}
                  >
                    <p className="text-sm">{conv.message}</p>
                    <p
                      className={`text-xs mt-1 ${
                        conv.sender === "recruiter" ? "text-emerald-100" : "text-gray-500"
                      }`}
                    >
                      {conv.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <form onSubmit={onSendMessage} className="p-4 border-t border-gray-200">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={messageText}
                  onChange={(e) => onMessageTextChange(e.target.value)}
                  placeholder="Type your message..."
                  data-testid="message-input"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <button
                  type="submit"
                  data-testid="send-message-button"
                  className="px-6 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Send
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Select a conversation to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MessagesView;