import React, { useState, useEffect, useRef } from 'react';

// Time unit component for consistent styling
const TimeUnit = ({ value, label, isSeconds = false, isPulsing = false }) => (
  <div className={`flex flex-col ${isPulsing ? 'animate-pulse' : ''}`}>
    <div className="bg-blue-900/40 rounded-lg p-2 backdrop-blur-sm">
      <span className={`text-2xl font-bold ${isSeconds ? 'text-blue-300' : ''}`}>
        {value}
      </span>
    </div>
    <span className="text-[10px] mt-1">{label}</span>
  </div>
);

const CountdownTimer = () => {
  // Set the target date to June 11 at 2:30 AM
  const targetDate = new Date('June 11, 2025 02:30:00');
  
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  
  const [isPulsing, setIsPulsing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const prevSecondsRef = useRef(null);
  const timerRef = useRef(null);

  // Calculate time left - only run once on mount
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetDate - now;

      if (difference <= 0) {
        setIsComplete(true);
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      return { days, hours, minutes, seconds };
    };

    const updateTimer = () => {
      const newTimeLeft = calculateTimeLeft();
      
      // Check if seconds changed to trigger animation
      if (prevSecondsRef.current !== null && prevSecondsRef.current !== newTimeLeft.seconds) {
        setIsPulsing(true);
        
        // Clear any existing timeout to prevent memory leaks
        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }
        
        // Set new timeout and store the reference
        timerRef.current = setTimeout(() => {
          setIsPulsing(false);
          timerRef.current = null;
        }, 600);
      }
      
      // Update ref instead of state to avoid re-renders
      prevSecondsRef.current = newTimeLeft.seconds;
      setTimeLeft(newTimeLeft);
    };

    // Initial calculation
    updateTimer();
    
    // Update every second
    const interval = setInterval(updateTimer, 1000);
    
    // Cleanup function
    return () => {
      clearInterval(interval);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [targetDate]); // Only depend on targetDate

  // Format number with leading zero
  const formatNumber = (num) => {
    return num < 10 ? `0${num}` : num;
  };

  return (
    <div className={`countdown-container transition-all duration-500 ${isComplete ? 'scale-110' : ''}`}>
      <div className="grid grid-cols-4 gap-3 text-center">
        <TimeUnit 
          value={formatNumber(timeLeft.days)} 
          label="Days" 
        />
        <TimeUnit 
          value={formatNumber(timeLeft.hours)} 
          label="Hours" 
        />
        <TimeUnit 
          value={formatNumber(timeLeft.minutes)} 
          label="Mins" 
        />
        <TimeUnit 
          value={formatNumber(timeLeft.seconds)} 
          label="Secs" 
          isSeconds={true} 
          isPulsing={isPulsing}
        />
      </div>
    </div>
  );
};

export default CountdownTimer;