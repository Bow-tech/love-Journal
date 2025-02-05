import React, { useState } from 'react';

export default function PostQuoteForm({ onSubmit, onClose, initialText = '', initialName = '' }) {
  const [text, setText] = useState(initialText);
  const [name, setName] = useState(initialName);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(text, name);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className="bg-[#222] p-6 rounded-lg shadow-lg max-w-md w-full border-2 border-[#444]"
        style={{ boxShadow: '0 0 30px #640D5F, 0 0 60px #EE66A6' }}
      >
        <h2 className="text-2xl font-bold text-pink-600 mb-4">Post a Love Quote</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Your love quote"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full p-2 mb-2 rounded border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-500 bg-[#333] text-white"
            required
          />
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 mb-2 rounded border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-500 bg-[#333] text-white"
            required
          />
          <button
            type="submit"
            className="glow-button w-full py-2 text-white rounded-full bg-pink-500 hover:bg-pink-600 transition-all duration-300"
          >
            Submit
          </button>
        </form>
        <button
          onClick={onClose}
          className="mt-4 w-full py-2 text-pink-600 rounded-full border border-pink-600 hover:bg-pink-600 hover:text-white transition-all duration-300"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}