
import React, { useState } from "react";

function App() {
  const [input, setInput] = useState("");
  const [reply, setReply] = useState("");

  const handleSubmit = async () => {
    setReply("載入中...");
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: input }]
      })
    });
    const data = await response.json();
    setReply(data.choices?.[0]?.message?.content || "無回應");
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>社畜預備課 Demo</h1>
      <p>輸入一句你最近的職場煩惱，我們嘴砲導師幫你點醒：</p>
      <input
        type="text"
        placeholder="例如：我要怎麼寫自傳？"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{ width: "60%", padding: "0.5rem" }}
      />
      <button onClick={handleSubmit} style={{ marginLeft: "1rem" }}>嘴我一下</button>
      <p style={{ marginTop: "2rem", whiteSpace: "pre-wrap" }}>{reply}</p>
    </div>
  );
}

export default App;
