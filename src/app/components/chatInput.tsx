"use client";

import { useState, ChangeEvent, FormEvent } from 'react';

export default function ChatInput() {
  const [prompt, setPrompt] = useState<string>('');
  const [response, setResponse] = useState<string>('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    const res = await fetch('/api/chatgpt', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });
    
    const data = await res.json();
    setResponse(data.message);
  };

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(event.target.value);
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 space-y-4">
        <textarea
          value={prompt}
          onChange={handleChange}
          placeholder="Type your message here..."
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={4}
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Send
        </button>
      </form>
      {response && (
        <div className="mt-4 p-4 bg-gray-100 border border-gray-200 rounded-lg shadow-sm">
          <p className="text-gray-800">{response}</p>
        </div>
      )}
    </div>
  );
}
