import React, { useState } from 'react';
import './App.css';

function App() {
  const [messages, setMessages] = useState([
    { text: 'Hi there how can I help you..', sender: 'ai' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [reportGenerated, setReportGenerated] = useState(false);

  const handleInputChange = (event) => {
    setInputMessage(event.target.value);
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return; // Do not send empty messages

    const newMessages = [...messages, { text: inputMessage, sender: 'user' }];
    setMessages(newMessages);

    // AI response logic
    let aiResponse = '';
    if (inputMessage.toLowerCase().includes('generate a report for sales vs profit')) {
      setTimeout(() => {
        aiResponse = 'Report Generated successfully. Type yes to Download';
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: aiResponse, sender: 'ai' }
        ]);
      }, 1000);
    } else if (inputMessage.toLowerCase().includes('yes')) {
      setReportGenerated(true);
    } else if (inputMessage.toLowerCase().includes('hello')) {
      aiResponse = 'Hello! How can I assist you today?';
    } else if (inputMessage.toLowerCase().includes('help')) {
      aiResponse = 'Sure, I am here to help you. Please let me know your query.';
    } else if (inputMessage.toLowerCase().includes('thank you')) {
      aiResponse = 'You\'re welcome! If you have any more questions, feel free to ask.';
    } else {
      aiResponse = 'I\'m sorry, I didn\'t understand that. Can you please clarify?';
    }

    if (aiResponse && !aiResponse.includes('Report Generated successfully. Type yes to Download')) {
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: aiResponse, sender: 'ai' }
        ]);
      }, 1000);
    }

    setInputMessage('');
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevents the default behavior of the Enter key
      handleSendMessage();
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-box">
        {/* Profile Header Inside the Chat Box */}
        <div className="chat-profile-header">
          <span className="chat-profile-pic">P</span>
          <span className="chat-username">Prasath JR</span>
        </div>
        
        {/* Chat Messages */}
        <div className="chat-messages">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message ${message.sender === 'user' ? 'user-message' : 'ai-message'}`}
            >
              <div className="message-container">
                <img
                  src={message.sender === 'user' ? '/user1.png' : '/AI.png'}
                  alt={message.sender}
                  className="message-icon"
                />
                <div className="message-text">{message.text}</div>
              </div>
            </div>
          ))}
          {reportGenerated && (
            <div className="report-links">
              <div className="report-link">
                <img src="/pdf-icon.png" alt="PDF" />
                <span>PDF</span>
              </div>
              <div className="report-link">
                <img src="/doc-icon.png" alt="DOC" />
                <span>DOC</span>
              </div>
            </div>
          )}
        </div>
        
        {/* Chat Input Area */}
        <div className='chat'>
          <input
            type="text"
            value={inputMessage}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown} // Add the keydown event handler
            placeholder="Type a message here..."
            className="chat-input"
          />
          <button onClick={handleSendMessage} className="send-button">
            <span>➣</span>	
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
