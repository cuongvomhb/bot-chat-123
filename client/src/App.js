import React, { useState } from "react";
import axios from "axios";

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { text: input, sender: "user" }];
    setMessages(newMessages);
    setInput("");

    try {
      const serverUrl = process.env.SERVER_URL;
      const res = await axios.post(`${serverUrl}/chat`, { message: input });
      setMessages([...newMessages, { text: res.data.response, sender: "bot" }]);
    } catch (error) {
      console.error("Error fetching response");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div style={{ width: "400px", margin: "auto", padding: "20px", border: "1px solid #ddd" }}>
      <div style={{ height: "400px", overflowY: "auto", borderBottom: "1px solid #ddd" }}>
        {messages.map((msg, index) => (
          <div key={index} style={{ textAlign: msg.sender === "user" ? "right" : "left" }}>
            <p style={{ background: msg.sender === "user" ? "#cef" : "#ddd", padding: "8px", borderRadius: "10px" }}>
              {msg.text}
            </p>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type a message..."
        style={{ width: "80%", padding: "10px", marginRight: "5px" }}
      />
      <button onClick={sendMessage} style={{ padding: "10px" }}>Send</button>
    </div>
  );
}

export default App;