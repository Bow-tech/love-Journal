import { useState } from 'react';
import Image from 'next/image'; // Use next/image
import Clock from '../components/Clock';
import BirthdayButton from '../components/BirthdayButton';
import LoveQuotes from '../components/LoveQuotes';
import CountdownTimer from '../components/CountdownTimer';

export default function Home() {
  const [showBirthdayMessage, setShowBirthdayMessage] = useState(false);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-pink-600">Love Journal</h1>
        <Image
          src="/chatbot.png"
          alt="Chatbot"
          width={96} // Set width and height
          height={96}
          className="chatbot-image mx-auto mt-4 animate-bounce"
        />
        <p className="text-2xl text-pink-600 mt-2">Riley Loves Evisa 💖</p>
      </div>

      {/* Main Layout */}
      <div className="flex flex-col lg:flex-row gap-8 w-full max-w-6xl mt-8">
        {/* Left Section */}
        <div className="flex-1">
          {!showBirthdayMessage && (
            <div className="absolute top-4 left-4">
              <BirthdayButton onClick={() => setShowBirthdayMessage(true)} />
            </div>
          )}
          {showBirthdayMessage && (
            <>
              <div className="bg-gradient-to-br from-pink-500 to-purple-600 p-6 rounded-lg shadow-lg text-white mb-8">
                <p className="text-xl font-bold">Happy Birthday, Evisa!</p>
                <p className="mt-2">You are the love of my life. 💖</p>
              </div>
              <CountdownTimer />
            </>
          )}
        </div>

        {/* Center Section */}
        <div className="flex-1 flex justify-center">
          <Clock />
        </div>

        {/* Right Section */}
        <div className="flex-1">
          <LoveQuotes />
        </div>
      </div>
    </div>
  );
}