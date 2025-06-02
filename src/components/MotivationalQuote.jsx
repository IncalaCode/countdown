import React, { useState, useEffect, useRef } from 'react';

// Collection of motivational quotes
const QUOTES = [
  { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
  { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", author: "Winston Churchill" },
  { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
  { text: "Your time is limited, don't waste it living someone else's life.", author: "Steve Jobs" },
  { text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" },
  { text: "Everything you've ever wanted is on the other side of fear.", author: "George Addair" },
  { text: "The only limit to our realization of tomorrow is our doubts of today.", author: "Franklin D. Roosevelt" },
  { text: "Do what you can, with what you have, where you are.", author: "Theodore Roosevelt" }
];

const MotivationalQuote = () => {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);
  const intervalRef = useRef(null);
  
  // Simple function to get the next quote index
  const getNextIndex = (currentIndex) => {
    return (currentIndex + 1) % QUOTES.length;
  };
  
  // Update quote with animation
  const updateQuote = () => {
    // Start fade out
    setFadeIn(false);
    
    // After fade out, change quote and fade in
    setTimeout(() => {
      setQuoteIndex(prevIndex => getNextIndex(prevIndex));
      setFadeIn(true);
    }, 500);
  };
  
  // Set up interval for changing quotes
  useEffect(() => {
    // Initial setup
    intervalRef.current = setInterval(updateQuote, 5000);
    
    // Cleanup
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);
  
  const quote = QUOTES[quoteIndex];
  
  return (
    <div className="text-center min-h-[100px] flex flex-col justify-center bg-blue-900/30 backdrop-blur-sm rounded-lg p-3">
      <div className={`transition-opacity duration-500 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
        <p className="text-sm italic mb-2 text-blue-100 leading-tight">"{quote.text}"</p>
        <p className="text-right text-xs text-blue-200 opacity-75">— {quote.author}</p>
      </div>
    </div>
  );
};

export default MotivationalQuote;