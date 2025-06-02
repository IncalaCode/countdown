import { useState, useEffect } from 'react';
import CountdownTimer from './CountdownTimer';
import WaveAnimation from './WaveAnimation';
import MotivationalQuote from './MotivationalQuote';

const HeroSection = () => {
  const [seconds, setSeconds] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // Update seconds for the wave animation
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Update current time
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Check if countdown is complete
  useEffect(() => {
    const targetDate = new Date('June 11, 2025 02:30:00');
    const checkCompletion = () => {
      const now = new Date();
      if (now >= targetDate) {
        setIsComplete(true);
      }
    };
    
    checkCompletion();
    const interval = setInterval(checkCompletion, 1000);
    
    return () => clearInterval(interval);
  }, []);

  // Add window refresh functionality
  useEffect(() => {
    // Set up auto-refresh every 5 minutes (300000 ms)
    const refreshInterval = setInterval(() => {
      window.location.reload();
    }, 300000); // 5 minutes
    
    return () => clearInterval(refreshInterval);
  }, []);
  
  // Format time for display
  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  // Format date for display
  const formatDate = (date) => {
    const options = { weekday: 'long', month: 'short', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-between bg-blue-900/20 text-white p-4 relative overflow-hidden">
      {/* Background Wave Animation */}
      <WaveAnimation isComplete={isComplete} seconds={seconds} />
      
      {/* Status Bar */}
      <div className="w-full flex justify-between items-center text-xs text-blue-100/80 mb-2 z-10">
        <div>{formatDate(currentTime)}</div>
        <div>{formatTime(currentTime)}</div>
      </div>
      
      {/* Main Content - Restructured for better centering */}
      <div className="flex-1 flex flex-col w-full z-10">
        {/* Top Section */}
        <div className="text-center mb-4">
          <h1 className="text-xl font-bold">
            Exit Exam Countdown
          </h1>
        </div>
        
        {/* Middle Section - Centered Counter */}
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-xs">
            <CountdownTimer />
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="mt-4 w-full">
          <MotivationalQuote />
        </div>
      </div>
      
      {/* Bottom Bar - Optional */}
      <div className="w-full text-center text-xs text-blue-100/60 mt-2 z-10">
        <p>See you there 😁 😁 😁 </p>
      </div>
    </div>
  );
};

export default HeroSection;