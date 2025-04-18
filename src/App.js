
import React, { useState } from "react";

function App() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");

  const handleClick = () => {
    setReply(
      `你說「${message}」？\n這問題比你履歷還空洞。\n\n建議：開頭先講你做過什麼，不然主管會懷疑你是 GPT 生出來的。`
    );
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>社畜預備課 Demo</h1>
      <p>輸入一句你最近的職場煩惱，我們嘴砲導師幫你點醒：</p>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="例如：我要怎麼寫自傳？"
        style={{ padding: "0.5rem", width: "300px" }}
      />
      <button onClick={handleClick} style={{ marginLeft: "1rem" }}>
        嘴我一下
      </button>
      <div style={{ marginTop: "1rem", whiteSpace: "pre-wrap" }}>
        {reply && <p>👾 嘴砲導師：{reply}</p>}
      </div>
    </div>
  );
}

export default App;
