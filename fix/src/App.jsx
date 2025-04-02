import React, { useState, createContext, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import {
  BarChart, Bar, PieChart, Pie, Cell,
  LineChart, Line, XAxis, YAxis, Tooltip, Legend,
  ResponsiveContainer
} from 'recharts';
import { ResponsiveHeatMap } from '@nivo/heatmap';
import { Send, Sun, Moon } from 'lucide-react';

export const ThemeContext = createContext();
const useTheme = () => useContext(ThemeContext);

const Card = ({ children }) => {
  const { darkMode } = useTheme();
  return <div className={`rounded shadow p-4 mb-4 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>{children}</div>;
};

const CardContent = ({ children }) => <div>{children}</div>;
const Dashboard = () => {
  const { darkMode } = useTheme();
  const pieColors = ['#A50CF8', '#EF029C', '#37C2F4', '#5E0CF8'];

  const pendingTasks = [
    { name: 'High', value: 8 },
    { name: 'Medium', value: 14 },
    { name: 'Low', value: 6 }
  ];
  const notifications = [
    { name: 'Mentions', value: 10 },
    { name: 'Meeting Reminders', value: 5 },
    { name: 'Deadlines', value: 8 },
    { name: 'Project Updates', value: 6 }
  ];
  const performanceData = [
    { month: 'Jan', rate: 80 },
    { month: 'Feb', rate: 85 },
    { month: 'Mar', rate: 78 },
    { month: 'Apr', rate: 90 }
  ];
  const completedWork = [
    { name: 'Bugs Fixed', dev: 10, docs: 4 },
    { name: 'Features Developed', dev: 15, docs: 3 },
    { name: 'Documents Completed', dev: 5, docs: 10 }
  ];
  const projectAnalytics = [
    { name: 'Project A', Success: 10, Failure: 2 },
    { name: 'Project B', Success: 6, Failure: 4 },
    { name: 'Project C', Success: 8, Failure: 1 }
  ];
  const heatmapData = [
    { id: 'Team A', data: [{ x: 'Mon', y: 3 }, { x: 'Tue', y: 6 }, { x: 'Wed', y: 5 }, { x: 'Thu', y: 4 }, { x: 'Fri', y: 7 }] },
    { id: 'Team B', data: [{ x: 'Mon', y: 4 }, { x: 'Tue', y: 5 }, { x: 'Wed', y: 2 }, { x: 'Thu', y: 6 }, { x: 'Fri', y: 3 }] },
    { id: 'Team C', data: [{ x: 'Mon', y: 5 }, { x: 'Tue', y: 3 }, { x: 'Wed', y: 6 }, { x: 'Thu', y: 4 }, { x: 'Fri', y: 5 }] }
  ];
  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white min-h-screen">

      {/* Pending Work Tracker */}
      <Card>
        <CardContent>
          <h2 className="text-xl font-bold mb-2">Pending Work Tracker</h2>
          <div className="flex items-center">
            <PieChart width={300} height={200}>
              <Pie
                data={pendingTasks}
                dataKey="value"
                nameKey="name"
                outerRadius={80}
                labelLine={false}
              >
                {pendingTasks.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
            <div className="ml-6 space-y-2">
              {pendingTasks.map((entry, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-4 h-4" style={{ backgroundColor: pieColors[index % pieColors.length] }}></div>
                  <span>{entry.name}: {((entry.value / pendingTasks.reduce((a, b) => a + b.value, 0)) * 100).toFixed(0)}%</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
      {/* Notifications Dashboard */}
      <Card>
        <CardContent>
          <h2 className="text-xl font-bold mb-2">Notifications Dashboard</h2>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={notifications}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                dataKey="value"
                labelLine={false}
                label={({ name, percent, cx, cy, midAngle, outerRadius, index }) => {
                  const RADIAN = Math.PI / 180;
                  const radius = outerRadius + 10;
                  const x = cx + radius * Math.cos(-midAngle * RADIAN);
                  const y = cy + radius * Math.sin(-midAngle * RADIAN);
                  return (
                    <text
                      x={x}
                      y={y}
                      fill={pieColors[index % pieColors.length]}
                      textAnchor={x > cx ? 'start' : 'end'}
                      dominantBaseline="central"
                      style={{ fontSize: '12px' }}
                    >
                      {`${name}: ${(percent * 100).toFixed(0)}%`}
                    </text>
                  );
                }}
              >
                {notifications.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Performance Improvement Analysis */}
      <Card>
        <CardContent>
          <h2 className="text-xl font-bold mb-2">Performance Improvement Analysis</h2>
          <LineChart width={300} height={200} data={performanceData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="rate" stroke="#8884d8" />
          </LineChart>
        </CardContent>
      </Card>

      {/* Completed Work Overview */}
      <Card>
        <CardContent>
          <h2 className="text-xl font-bold mb-2">Completed Work Overview</h2>
          <BarChart width={300} height={200} data={completedWork}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="dev" stackId="a" fill="#82ca9d" />
            <Bar dataKey="docs" stackId="a" fill="#8884d8" />
          </BarChart>
        </CardContent>
      </Card>
      {/* Workload Distribution Analysis */}
      <Card>
        <CardContent>
          <h2 className="text-xl font-bold mb-2">Workload Distribution Analysis</h2>
          <div style={{ height: 250 }}>
            <ResponsiveHeatMap
              data={heatmapData}
              keys={["Mon", "Tue", "Wed", "Thu", "Fri"]}
              indexBy="id"
              margin={{ top: 10, right: 10, bottom: 30, left: 60 }}
              axisTop={null}
              axisRight={null}
              axisBottom={{
                orient: 'bottom',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0
              }}
              axisLeft={{
                orient: 'left',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0
              }}
              colors={{ type: 'sequential', scheme: 'blues' }}
              emptyColor={darkMode ? '#1f2937' : '#eeeeee'}
              cellOpacity={1}
              cellBorderColor={{ from: 'color', modifiers: [['darker', 0.4]] }}
              labelTextColor={
                darkMode
                  ? { from: 'color', modifiers: [['brighter', 4]] }
                  : { from: 'color', modifiers: [['darker', 1.8]] }
              }
              theme={{
                axis: {
                  ticks: {
                    text: {
                      fill: darkMode ? '#ffffff' : '#333333',
                      fontSize: 12,
                    },
                  },
                },
                tooltip: {
                  container: {
                    background: darkMode ? '#1f2937' : '#ffffff',
                    color: darkMode ? '#ffffff' : '#000000',
                    fontSize: 14,
                  },
                },
              }}
              legends={[]}
            />
          </div>
        </CardContent>
      </Card>

      {/* Project Success and Failure Analytics */}
      <Card>
        <CardContent>
          <h2 className="text-xl font-bold mb-2">Project Success and Failure Analytics</h2>
          <BarChart width={300} height={200} data={projectAnalytics}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Success" fill="#82ca9d" />
            <Bar dataKey="Failure" fill="#ff6666" />
          </BarChart>
        </CardContent>
      </Card>
    </div>
  );
};
const Chat = () => {
  const { darkMode } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchSender, setSearchSender] = useState('');
  const [searchPriority, setSearchPriority] = useState('');
  const [currentRecipient, setCurrentRecipient] = useState('Project Team');
  const [messageType, setMessageType] = useState('group');
  const [priority, setPriority] = useState('normal');
  const [mentionAlert, setMentionAlert] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'Alice',
      message: 'Hey team, the deadline is tomorrow!',
      time: '10:00 AM',
      priority: 'urgent',
      type: 'group',
      recipient: 'Project Team'
    },
    {
      id: 2,
      sender: 'Bob',
      message: 'Hey Alice, check your inbox.',
      time: '10:05 AM',
      priority: 'normal',
      type: 'private',
      recipient: 'Alice'
    },
    {
      id: 3,
      sender: 'Charlie',
      message: '@Alice please review the docs.',
      time: '10:10 AM',
      priority: 'important',
      type: 'group',
      recipient: 'Project Team'
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [meetingTitle, setMeetingTitle] = useState('');
  const [meetingTime, setMeetingTime] = useState('');
  const [meetingRoom, setMeetingRoom] = useState('');
  const [meetings, setMeetings] = useState([]);

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      const newMsg = {
        id: messages.length + 1,
        sender: 'You',
        message: newMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        priority,
        type: messageType,
        recipient: currentRecipient
      };

      // Trigger mention alert
      if (newMsg.message.includes('@You')) {
        setMentionAlert('You were mentioned in a message!');
        setTimeout(() => setMentionAlert(''), 3000);
      }

      setMessages([...messages, newMsg]);
      setNewMessage('');
    }
  };

  const handleScheduleMeeting = () => {
    if (meetingTitle && meetingTime && meetingRoom) {
      setMeetings([...meetings, {
        title: meetingTitle,
        time: meetingTime,
        room: meetingRoom,
        participants: currentRecipient,
      }]);
      setMeetingTitle('');
      setMeetingTime('');
      setMeetingRoom('');
    }
  };

  const filteredMessages = messages.filter((m) =>
    m.recipient === currentRecipient &&
    m.message.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (searchSender ? m.sender.toLowerCase().includes(searchSender.toLowerCase()) : true) &&
    (searchPriority ? m.priority === searchPriority : true)
  );
  return (
    <div className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} min-h-screen p-6`}>
      <h1 className="text-2xl font-bold mb-4">Interactive Chat System</h1>
      <style>
      {`
        input[type="datetime-local"]::-webkit-calendar-picker-indicator {
          filter: invert(1);
          opacity: 1;
        }
      `}
    </style>
      {/* 🔍 Smart Search & Filters */}
      <div className="flex flex-wrap gap-2 mb-4">
        <input
          type="text"
          placeholder="Search messages..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-3 py-2 border rounded"
        />
        <input
          type="text"
          placeholder="Filter by sender"
          value={searchSender}
          onChange={(e) => setSearchSender(e.target.value)}
          className="px-3 py-2 border rounded"
        />
        <select
          value={searchPriority}
          onChange={(e) => setSearchPriority(e.target.value)}
          className="px-2 py-2 border rounded"
        >
          <option value="">All Priorities</option>
          <option value="normal">⚪ Normal</option>
          <option value="important">🟡 Important</option>
          <option value="urgent">🔴 Urgent</option>
        </select>
      </div>

      {/* 🟡 Mention Alert */}
      {mentionAlert && (
        <div className="mb-4 px-4 py-2 rounded bg-yellow-100 text-yellow-900 dark:bg-yellow-800 dark:text-yellow-200">
          🔔 {mentionAlert}
        </div>
      )}

      {/* 💬 Message List */}
      <div className="space-y-3 mb-6">
        {filteredMessages.map((msg) => (
          <div
            key={msg.id}
            className={`p-4 rounded shadow ${
              msg.priority === 'urgent'
                ? (darkMode ? 'bg-red-900 border-l-4 border-red-500' : 'bg-red-200 border-l-4 border-red-600')
                : msg.priority === 'important'
                ? (darkMode ? 'bg-yellow-900 border-l-4 border-yellow-500' : 'bg-yellow-100 border-l-4 border-yellow-500')
                : darkMode ? 'bg-gray-800' : 'bg-white border border-gray-200'
            }`}
          >
            <div className="flex justify-between">
              <strong>{msg.sender}</strong>
              <span className="text-sm text-gray-400">{msg.time}</span>
            </div>
            <p className="mt-1">
              {msg.message.split(/(\s+)/).map((word, idx) =>
                word.startsWith('@') ? (
                  <span key={idx} className="text-blue-500 font-semibold">{word}</span>
                ) : searchTerm && word.toLowerCase().includes(searchTerm.toLowerCase()) ? (
                  <span key={idx} className="bg-yellow-200 dark:bg-yellow-600 px-1 rounded">{word}</span>
                ) : (
                  <span key={idx}>{word}</span>
                )
              )}
            </p>
          </div>
        ))}
      </div>
            {/* ➕ Message Input & Options */}
            <div className="flex flex-col md:flex-row gap-2 mb-4">
        <select
          value={messageType}
          onChange={(e) => setMessageType(e.target.value)}
          className="px-2 py-2 border rounded 
                     placeholder-gray-500 dark:placeholder-gray-300 
                     text-gray-900 dark:text-white 
                     bg-white dark:bg-gray-800"
        >
          <option value="group">Group</option>
          <option value="private">Private</option>
        </select>

        <input
          type="text"
          placeholder="To: recipient or group"
          value={currentRecipient}
          onChange={(e) => setCurrentRecipient(e.target.value)}
          className="px-3 py-2 border rounded 
                     placeholder-gray-500 dark:placeholder-gray-300 
                     text-gray-900 dark:text-white 
                     bg-white dark:bg-gray-800"
        />

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="px-2 py-2 border rounded 
                     placeholder-gray-500 dark:placeholder-gray-300 
                     text-gray-900 dark:text-white 
                     bg-white dark:bg-gray-800"
        >
          <option value="normal">⚪ Normal</option>
          <option value="important">🟡 Important</option>
          <option value="urgent">🔴 Urgent</option>
        </select>
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 px-4 py-2 border rounded 
                     placeholder-gray-500 dark:placeholder-gray-300 
                     text-gray-900 dark:text-white 
                     bg-white dark:bg-gray-800"
        />
        <button onClick={handleSendMessage} className="bg-blue-600 text-white px-4 py-2 rounded">
          <Send size={18} />
        </button>
      </div>

      {/* 🗓 Meeting Scheduler */}
      <div className="mt-6 border-t pt-4">
        <h2 className="font-bold text-lg mb-2">📅 Schedule Meeting</h2>
        <div className="flex flex-col md:flex-row gap-2 mb-3">
          <input
            type="text"
            placeholder="Meeting Title"
            value={meetingTitle}
            onChange={(e) => setMeetingTitle(e.target.value)}
            className="flex-1 px-3 py-2 border rounded 
                       placeholder-gray-500 dark:placeholder-gray-300 
                       text-gray-900 dark:text-white 
                       bg-white dark:bg-gray-800"
          />
          <input
      
            type="datetime-local"
            value={meetingTime}
            onChange={(e) => setMeetingTime(e.target.value)}
            className="px-3 py-2 border rounded 
                       text-gray-900 dark:text-white 
                       bg-white dark:bg-gray-800"
          />
          <input
            type="text"
            placeholder="Room (e.g., A1, Zoom)"
            value={meetingRoom}
            onChange={(e) => setMeetingRoom(e.target.value)}
            className="px-3 py-2 border rounded 
                       placeholder-gray-500 dark:placeholder-gray-300 
                       text-gray-900 dark:text-white 
                       bg-white dark:bg-gray-800"
          />
          <button
            onClick={handleScheduleMeeting}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Add
          </button>
        </div>

        {meetings.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-md font-semibold">Upcoming Meetings:</h3>
            {meetings.map((m, idx) => (
              <div key={idx} className="bg-blue-100 dark:bg-blue-800 p-2 rounded">
                <strong>{m.title}</strong> – {m.time} in <em>{m.room}</em> with{' '}
                <span className="text-blue-500">{m.participants}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const App = () => {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('darkMode') === 'true');

  const toggleTheme = () => {
    setDarkMode(prev => {
      const next = !prev;
      localStorage.setItem('darkMode', next);
      return next;
    });
  };

  return (
    <ThemeContext.Provider value={{ darkMode }}>
      <div className={darkMode ? 'dark' : ''}>
        <Router>
          <nav className="bg-gray-800 text-white p-4 flex justify-between">
            <h1 className="text-xl font-bold">Process Planning</h1>
            <div className="space-x-4 flex items-center">
              <Link to="/dashboard" className="hover:underline">Dashboard</Link>
              <Link to="/chat" className="hover:underline">Chat</Link>
              <button
                onClick={toggleTheme}
                className="bg-blue-600 p-2 rounded hover:bg-blue-700 transition"
              >
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            </div>
          </nav>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/chat" element={<Chat />} />
          </Routes>
        </Router>
      </div>
    </ThemeContext.Provider>
  );
};

export default App;
