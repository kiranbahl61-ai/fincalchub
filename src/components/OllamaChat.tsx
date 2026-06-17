import React, { useState } from 'react';

const OllamaChat: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    setLoading(true);
    setResponse('');
    try {
      const res = await fetch('/api/ollama/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });
      const data = await res.json();
      setResponse(data.response || JSON.stringify(data));
    } catch (err) {
      if (err instanceof Error) {
        setResponse('Error: ' + err.message);
      } else {
        setResponse('Error: ' + String(err));
      }
    }
    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto p-4 bg-white dark:bg-gray-800 rounded shadow mt-8">
      <h2 className="text-xl font-bold mb-2">Chat with Phi3 (Ollama)</h2>
      <textarea
        className="w-full p-2 border rounded mb-2 dark:bg-gray-700 dark:text-white"
        rows={3}
        value={prompt}
        onChange={e => setPrompt(e.target.value)}
        placeholder="Type your prompt..."
      />
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
        onClick={handleSend}
        disabled={loading || !prompt.trim()}
      >
        {loading ? 'Sending...' : 'Send'}
      </button>
      {response && (
        <div className="mt-4 p-2 bg-gray-100 dark:bg-gray-900 rounded whitespace-pre-wrap">
          {response}
        </div>
      )}
    </div>
  );
};

export default OllamaChat;
