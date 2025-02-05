import { useState, useEffect } from 'react';

export default function CountdownTimer() {
  const [countdown, setCountdown] = useState('');

  useEffect(() => {
    const targetDate = new Date('March 25, 2025 00:00:00').getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;
      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        setCountdown(`${days} DAYS TILL WE MEET AGAIN, Love Riley`);
      } else {
        setCountdown('We are together now! 💖');
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-to-br from-pink-500 to-purple-600 p-6 rounded-lg shadow-lg text-white">
      <p className="text-xl font-bold">{countdown}</p>
    </div>
  );
}