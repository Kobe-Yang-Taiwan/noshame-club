import React, { useState } from 'react';

function App() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input) return;
    setLoading(true);
    setResponse('思考中...');

    try {
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: '你是資深職場導師，提供實用又幽默的建議。',
            },
            {
              role: 'user',
              content: input,
            },
          ],
        }),
      });

      const data = await res.json();
      const reply = data.choices?.[0]?.message?.content;
      setResponse(reply || '沒有回應，請再試一次。');
    } catch (err) {
      setResponse('發生錯誤：' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 30, fontFamily: 'Arial' }}>
      <h1>社畜預備課 Demo</h1>
      <p>輸入一句你最近的職場煩惱，我們嘴砲導師幫你點醒：</p>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="例如：我要怎麼寫自傳？"
        style={{ width: '60%', padding: '10px' }}
      />
      <button onClick={handleSend} disabled={loading} style={{ marginLeft: '10px' }}>
        {loading ? '嘴砲中...' : '噴我一下'}
      </button>
      <div style={{ marginTop: 20, whiteSpace: 'pre-wrap', color: '#333' }}>
        {response}
      </div>
    </div>
  );
}

export default App;
