'use client';

import React, { useEffect, useState } from 'react';

const BlackFridayBanner: React.FC = () => {
  const [timeRemaining, setTimeRemaining] = useState<string>('');

  useEffect(() => {
    const targetDate = new Date('2023-11-27T00:00:00');

    const interval = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference <= 0) {
        clearInterval(interval);
        setTimeRemaining('The offer has ended.');
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeRemaining(`${days}d ${hours}h ${minutes}m ${seconds}s remaining`);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-screen pt-[48px] bg-black text-white text-center p-4 shadow-md">
      <p className="text-xl my-4">🎉 Black Friday Limited Deal! 🎉 Save <span className="text-red-500">90%</span> on your DrLambda subscription! 💸</p>
      <a href="#pricing" className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-600 transition duration-300 inline-block text-center">
        Get This Deal Now!
      </a>
      <p className="text-xs font-semibold mt-2">⏰ {timeRemaining} ⏰</p>
    </div>
  );
};

export default BlackFridayBanner;
