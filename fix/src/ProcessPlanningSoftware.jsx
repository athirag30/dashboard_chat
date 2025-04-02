import React, { useContext, useState } from 'react';
import { ThemeContext } from './App';
import { Send } from 'lucide-react';

export default function ProcessPlanningSoftware() {
  const { darkMode } = useContext(ThemeContext);

  const [searchTerm, setSearchTerm] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, sender: 'Alice', message: 'Hey team, the deadline is tomorrow!', time: '10:00 AM', priority: 'urgent' },
    { id: 2, sender: 'Bob', message: 'Meeting scheduled at 3 PM in Room A1.', time: '10:05 AM', priority: 'normal' },
    { id: 3, sender: 'Charlie', message: '@Alice please review the docs.', time: '10:10 AM', priority: 'important' },
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      setMessages([...messages, {
        id: messages.length + 1,
        sender: 'You',
        message: newMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        priority: 'normal',
      }]);
      setNewMessage('');
    }
  };

  const filteredMessages = messages.filter(m =>
    m.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-4">Interactive Chat System</h1>

      <input
        type="text"
        placeholder="Search messages..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full mb-4 px-4 py-2 border rounded focus:outline-none focus:ring"
      />

      <div className="space-y-3 mb-6">
        {filteredMessages.map(msg => (
          <div
            key={msg.id}
            className={`p-4 rounded shadow ${
              msg.priority === 'urgent'
                ? 'border-l-4 border-red-500 bg-red-100 dark:bg-red-900'
                : msg.priority === 'important'
                ? 'border-l-4 border-yellow-500 bg-yellow-100 dark:bg-yellow-900'
                : 'bg-white dark:bg-gray-800'
            }`}
          >
            <div className="flex justify-between">
              <strong>{msg.sender}</strong>
              <span className="text-sm text-gray-500 dark:text-gray-300">{msg.time}</span>
            </div>
            <p className="mt-1">
              {msg.message.includes('@') && (
                <span className="text-blue-500 font-semibold">
                  {msg.message.split(' ')[0]}{' '}
                </span>
              )}
              {msg.message.replace(/@\w+/, '')}
            </p>
          </div>
        ))}
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 px-4 py-2 border rounded focus:outline-none focus:ring"
        />
        <button onClick={handleSendMessage} className="bg-blue-600 text-white px-4 py-2 rounded">
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}
