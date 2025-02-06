// Import necessary modules
import { useState, useEffect } from 'react';
import PostQuoteForm from './PostQuoteForm';
import { Edit, Trash, ChevronDown } from 'lucide-react';

// Export default function for LoveQuotes component
export default function LoveQuotes() {
  // Define state variables
  const [quotes, setQuotes] = useState<{ id: string; text: string; name: string; time: string }[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editQuote, setEditQuote] = useState<{ id: string; text: string; name: string } | null>(null);
  const [showDateFilter, setShowDateFilter] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  // Load quotes from localStorage
  useEffect(() => {
    const savedQuotes = JSON.parse(localStorage.getItem('loveQuotes') || '[]');
    setQuotes(savedQuotes);
  }, []);

  // Save quotes to localStorage
  useEffect(() => {
    localStorage.setItem('loveQuotes', JSON.stringify(quotes));
  }, [quotes]);

  // Handle quote submission
  const handleSubmit = (text: string, name: string, id?: string) => {
    if (id) {
      // Edit existing quote
      const updatedQuotes = quotes.map((quote) =>
        quote.id === id ? { ...quote, text, name } : quote
      );
      setQuotes(updatedQuotes);
      setEditQuote(null);
    } else {
      // Add new quote
      const newQuote = {
        id: Math.random().toString(36).substring(7),
        text,
        name,
        time: new Date().toLocaleTimeString(),
      };
      setQuotes([newQuote, ...quotes]);
      setShowForm(false);
    }
  };

  // Handle quote deletion
  const handleDelete = (id: string) => {
    const updatedQuotes = quotes.filter((quote) => quote.id !== id);
    setQuotes(updatedQuotes);
  };

  // Get unique dates from quotes
  const uniqueDates = Array.from(new Set(quotes.map((quote) => quote.time.split(' ')[0])));

  // Filter quotes by selected date
  const filteredQuotes = selectedDate
    ? quotes.filter((quote) => quote.time.split(' ')[0] === selectedDate)
    : quotes;

  return (
    <div className="bg-gradient-to-br from-pink-100 to-purple-100 p-6 rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-pink-600">Special Love Quotes</h2>
        <div className="relative">
          <button
            onClick={() => setShowDateFilter(!showDateFilter)}
            className="text-pink-600 hover:text-pink-800 flex items-center gap-2"
          >
            <ChevronDown size={20} />
            Filter by Date
          </button>
          {showDateFilter && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-pink-200">
              {uniqueDates.map((date) => (
                <button
                  key={date}
                  onClick={() => {
                    setSelectedDate(date);
                    setShowDateFilter(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-pink-600 hover:bg-pink-50"
                >
                  {date}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      {/* Scrollable Container for Quotes */}
      <div className="max-h-96 overflow-y-auto">
        {filteredQuotes.slice(0, 5).map((quote) => (
          <div key={quote.id} className="bg-white p-4 rounded-lg shadow mb-4">
            <div className="flex justify-between items-center">
              <p className="text-pink-800">&quot;{quote.text}&quot;</p>
              <div className="flex gap-2">
                <button
                  onClick={() => setEditQuote({ id: quote.id, text: quote.text, name: quote.name })}
                  className="text-pink-600 hover:text-pink-800"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => handleDelete(quote.id)}
                  className="text-pink-600 hover:text-pink-800"
                >
                  <Trash size={16} />
                </button>
              </div>
            </div>
            <div className="flex justify-between items-center mt-2">
              <p className="text-sm text-purple-600">By {quote.name.charAt(0)}</p>
              <p className="text-sm text-purple-600">{quote.time}</p>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={() => setShowForm(true)}
        className="glow-button w-full py-2 text-white rounded-full bg-pink-500 hover:bg-pink-600 transition-all duration-300 mt-4"
      >
        Post a Quote
      </button>
      {showForm && (
        <PostQuoteForm
          onSubmit={(text: string, name: string) => handleSubmit(text, name, editQuote?.id)} // Use handleSubmit for both new and edited quotes
          onClose={() => {
            setShowForm(false);
            setEditQuote(null); // Reset editQuote when closing the form
          }}
          initialText={editQuote?.text || ''}
          initialName={editQuote?.name || ''}
        />
      )}
    </div>
  );
}
